(function() {
    'use strict';

    //*** STATE_MACHINE ***/

    /**
     * Máquina de estados capaz de reconhecer cadeias com tolerância a erros.
     * @constructor
     */
    var StateMachine = function() {
        this.initialState = new State();
        this.currentSituation = new MachineSituation();
        this.currentSituation.registerSituation(this.initialState, 0);
        this.tokenDictionary = {};
    };

    StateMachine._maximumErrorTolerance = 3; //teto de caracteres errados em uma cadeia;
    StateMachine._unknownChar = '¢'; //Marcador de caractere desconhecido
    StateMachine.consts = {};

    StateMachine.consts.VALID_CHARS = [
        StateMachine._unknownChar,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', ':', '-', '/',
        '0'
    ]; // ' ' espaço não é char válido! ele separa tokens assim como quebras de linha e tabs.

    StateMachine.consts.CHAR_REPLACEMENTS = {
        'a': ['á', 'à', 'â', 'ã', 'ä'],
        'e': ['é', 'è', 'ê', 'ẽ', 'ë'],
        'i': ['í', 'ì', 'î', 'ĩ', 'ï'],
        'o': ['ó', 'ò', 'ô', 'õ', 'ö'],
        'u': ['ú', 'ù', 'û', 'ũ', 'ü'],
        'c': ['ç'],
        ' ': ['\n', '\t', '\r'],
        '0': ['1', '2', '3', '4', '5', '6', '7', '8', '9'] //Não é interessante diferenciar números aqui.
    };

    /**
     * Reseta a máquina para nova execução. Não precisa ser invocado.
     */
    StateMachine.prototype.reset = function() {
        this.currentSituation = new MachineSituation();
        this.currentSituation.registerSituation(this.initialState, 0);
    };

    /**
     * Busca um texto por palavras conhecidas.
     * @param fulltext
     */
    StateMachine.prototype.parse = function(fulltext) {
        fulltext = Utils.normalizeWhitespaces(fulltext);
        var words = fulltext.split(' ');
        var _self = this;

        var tokensSequence = [];
        words.forEach(function(word) {
            var foundToken = _self.findTokens(word);
            var newResult = {
                raw: word,
                token: foundToken
            };
            tokensSequence.push(newResult);
        });
        return tokensSequence;
    };

    /**
     * Retorna o token que melhor se encaixa na palavra passada.
     * @param {string} wordStr
     * @param {Object} options
     * @param {String} options.outputMode - 'SINGLE_TOKEN' ou 'MULTI_TOKEN'
     * @param {number} options.autocompleteChars - Número de caracteres que devem ser autocompletados ao fim de cada string para serem aceitos.
     * @returns {Array}
     */
    StateMachine.prototype.findTokens = function(wordStr, options) {

        options = options || {};
        options.outputMode = options.outputMode || 'SINGLE_TOKEN';
        options.autocompleteChars = options.autocompleteChars || 0;

        var wordLen = wordStr.length;

        this.reset();
        var _self = this;
        var inputChar;

        //TODO: Cada estado conhecer seu numero máximo de erros.
        //TODO: utilizar duas máquinas: uma para tokens exatos e outra para tokens fuzzy

        //Enviando cada caractere de fita para a máquina de estados.
        for (var i = 0; i < wordLen; i++) {
            inputChar = wordStr.charAt(i);
            inputChar = StateMachine.sanitizeChar(inputChar);

            var nextSituation = new MachineSituation();
            //Partindo de cada situação corrente e aplicando o fuzzystep para descobrir as próximas situações.
            //Todo: quando os estados estiverem vazios, matar a execucao.
            for (var j = 0; j < this.currentSituation.statesList.length; j++) {
                var stateToAnalyze = this.currentSituation.statesList[j];
                this.fuzzyStep(stateToAnalyze, inputChar, nextSituation);
            }
            this.currentSituation = nextSituation;
        }

        //Autocompletando caracteres
        for (var k = 0; k < options.autocompleteChars; k++) {
            var nextSuggestedSituation = new MachineSituation();
            for (var l = 0; l < this.currentSituation.statesList.length; l++) {
                var stateToAnalyzeSuggestion = this.currentSituation.statesList[l];
                //Só entra no autocomplete se tem NO MÁXIMO 1 erro.
                var suggestionMisspellingCount = this.currentSituation.getSituation(stateToAnalyzeSuggestion);
                if (suggestionMisspellingCount <= 2) {
                    this.emptyStep(stateToAnalyzeSuggestion, nextSuggestedSituation);
                }

                nextSuggestedSituation.registerSituation(stateToAnalyzeSuggestion, suggestionMisspellingCount);
            }
            this.currentSituation = nextSuggestedSituation;
        }

        if (options.outputMode == 'SINGLE_TOKEN') {
            //Se for um estado que reconhece algum token, retornando-o
            var bestToken = null;
            var bestTokenScore = -1;
            this.currentSituation.statesList.forEach(function(state) {
                var foundTokens = state.acceptedTokens;
                foundTokens.forEach(function(foundToken) {
                    if (_self.currentSituation.getSituation(state) <= foundToken.errorTolerance) {
                        var tokenScore = StateMachine._maximumErrorTolerance - _self.currentSituation.getSituation(state) + 1;
                        if ((!bestToken) || (tokenScore > bestTokenScore)) {
                            bestToken = foundToken;
                            bestTokenScore = tokenScore;
                        }

                    }
                });
            });
            return bestToken;
        } else { //'MULTI_TOKEN'
            var tokensArray = [];
            this.currentSituation.statesList.forEach(function(state) {
                var foundTokens = state.acceptedTokens;
                foundTokens.forEach(function(foundToken) {
                    var misspellingCount = _self.currentSituation.getSituation(state);

                    //misspellingCount DEVE ser menor que o numero de caracteres digitados para contar.
                    if (misspellingCount >= wordLen) {
                        return;
                    }

                    if (misspellingCount <= foundToken.errorTolerance) {
                        var tokenScore = StateMachine._maximumErrorTolerance - _self.currentSituation.getSituation(state) + 1;
                        tokensArray.push({
                            token: foundToken,
                            score: tokenScore
                        });
                    }
                });
            });
            return tokensArray;
        }
    };

    /**
     * Parte de um State e atualiza uma situation de acordo com
     * o inputChar. Assim, passa a todos os estados seguintes,
     * tolerando erros até o limite LexicStateMachine._maximumErrorTolerance
     *
     * @param {State} state
     * @param inputChar
     * @param {MachineSituation} situationToUpdate
     */
    StateMachine.prototype.fuzzyStep = function(state, inputChar, situationToUpdate) {

        if (!StateMachine.isValidChar(inputChar)) { //ignorando caracteres inválidos
            return;
        }

        var currentMisspellingCount = this.currentSituation.getSituation(state);

        // Step normal sem erros:
        var straightState = this.singleStep(state, inputChar);
        if (straightState) {
            situationToUpdate.registerSituation(straightState, currentMisspellingCount);
        }

        // Steps com erros de ortografia
        currentMisspellingCount += 1;

        // Step com um misstype (letra trocada)
        if (currentMisspellingCount <= StateMachine._maximumErrorTolerance) {
            for (var tChar in state.transitions) {
                if (state.transitions.hasOwnProperty(tChar)) {
                    var nextState = state.transitions[tChar];
                    if (tChar !== inputChar) {
                        situationToUpdate.registerSituation(nextState, currentMisspellingCount);
                    }
                }
            }
        }

        // Step de uma letra digitada a mais (Se mantêm no mesmo estado):
        if (currentMisspellingCount <= StateMachine._maximumErrorTolerance) {
            situationToUpdate.registerSituation(state, currentMisspellingCount);
        }

        // Step de um ou mais caracteres omitidos (Avança quantos caracteres for possível respeitando a tolerância)
        // Estratégia: enquanto houver tolerância, dá todos os passos possíveis de cada vizinho
        var statesAhead = [state];
        var continueExploring = (currentMisspellingCount < StateMachine._maximumErrorTolerance);
        while (continueExploring) {
            continueExploring = false;
            var nextStatesToVisit = [];

            checkStatesAhead(statesAhead, continueExploring, situationToUpdate, nextStatesToVisit);

            statesAhead = nextStatesToVisit;
        }

    };

    function checkStatesAhead(statesAhead, continueExploring, situationToUpdate, nextStatesToVisit) {
        statesAhead.forEach(function(visitingState) {
            var visitingStateMistypingCount = situationToUpdate.getSituation(visitingState);

            if (visitingStateMistypingCount < StateMachine._maximumErrorTolerance) {
                continueExploring = true;
                Array.prototype.push.apply(nextStatesToVisit, visitingState.followingStates);
                visitingState.followingStates.forEach(function(futureState) {
                    situationToUpdate.registerSituation(futureState, visitingStateMistypingCount + 1);
                });
            }
        });
    }



    /**
     * Parte de um State e salta para os próximos sem precisar ler nenhum inputChar
     * nem reduzir pontuações de estados na situação.
     * Utilizado para suggestions
     *
     * @param {State} state
     * @param {MachineSituation} situationToUpdate
     */
    StateMachine.prototype.emptyStep = function(state, situationToUpdate) {
        var currentMisspellingCount = this.currentSituation.getSituation(state);

        state.followingStates.forEach(function(nextState) {
            situationToUpdate.registerSituation(nextState, currentMisspellingCount);
        });
    };


    /**
     * Parte de um State e retorna o State seguinte  de acordo com o inputChar
     * @param {State} state
     * @param {string} inputChar
     */
    StateMachine.prototype.singleStep = function(state, inputChar) {

        //Todo: Steps precisam realmente diferenciar números?! acho que não.... pode ser uma simplificação.
        if (StateMachine.isValidChar(inputChar)) {
            return state.transitions[inputChar];
        }
        return null;
    };

    /**
     * Cria e adiciona imediatamente um token à máquina
     * @param tokenStr
     * @param errorTolerance
     * @param userData
     */
    StateMachine.prototype.addTokenString = function(tokenStr, errorTolerance, userData) {
        var token = new LexicalToken(tokenStr, errorTolerance);
        this.addToken(token);
    };

    /**
     * Adapta a máquina de estados para reconhecer um novo token.
     * @param {LexicalToken} token
     */
    StateMachine.prototype.addToken = function(token) {


        var tokenStr = token.name = Utils.normalizeWhitespaces(token.name);

        //Validando se não existe token igual.
        //Validacao removida
        //if (this.tokenDictionary[tokenStr]) {
        //    throw new Error('Token ' + tokenStr + 'já existente.');
        //}

        //Adaptando a stateMachine para reconhecer a cadeia do token.
        var state = this.initialState;
        var nextState;
        var inputChar;
        for (var i = 0; i < tokenStr.length; i++) {

            inputChar = tokenStr.charAt(i);
            inputChar = StateMachine.sanitizeChar(inputChar);
            nextState = this.singleStep(state, inputChar);
            if (!nextState) {
                nextState = new State();
                state.addTransition(inputChar, nextState);
            }
            state = nextState;
        }

        //aqui, state é o ultimo estado da cadeia, logo, o estado que reconhece o token.
        state.acceptedTokens.push(token);
        this.tokenDictionary[tokenStr] = token;
    };

    /**
     * Checa se um Caractere é válido
     * @param {string} char
     */
    StateMachine.isValidChar = function(char) {
        return (Utils.contains(StateMachine.consts.VALID_CHARS, char));
    };

    /**
     * Converte caracteres sujos (maiusculos, acentos, \n, \t, \r ...
     * para caracteres aceitos na maquina ou null;
     * @param {string} char
     */
    StateMachine.sanitizeChar = function(char) {
        char = char.toLowerCase();
        var replacementArray;

        for (var clearChar in StateMachine.consts.CHAR_REPLACEMENTS) {
            if (StateMachine.consts.CHAR_REPLACEMENTS.hasOwnProperty(clearChar)) {
                replacementArray = StateMachine.consts.CHAR_REPLACEMENTS[clearChar];
                if (Utils.contains(replacementArray, char)) {
                    return clearChar;
                }
            }
        }

        if (Utils.contains(StateMachine.consts.VALID_CHARS, char)) {
            return char;
        }

        return StateMachine._unknownChar;
    };

    //*** STATE ***********/
    /**
     * Estado da máquina de estados.
     * @constructor
     */
    var State = function() {
        this.transitions = {};
        this.acceptedTokens = [];
        this.label = '';
        this.followingStates = [];
        this.originChar = ''; //Caractere que, sem tolerância de erros, aciona a transição que leva ao estado.
    };

    /**
     * Adiciona uma transiçao a um estado. Executa validaçoes sobre o input.
     * @param {string} inputChar
     * @param {State} nextState
     */
    State.prototype.addTransition = function(inputChar, nextState) {

        //Evitando mais de uma transição para o mesmo input
        if (this.transitions[inputChar]) {
            throw new Error('Erro tentando inserir transição duplicada ' + inputChar);
        }
        if (!StateMachine.isValidChar(inputChar)) {
            throw new Error('Erro tentando inserir transição de caractere invalido ' + inputChar);
        }

        nextState.label = this.label + inputChar;
        nextState.originChar = inputChar;
        this.transitions[inputChar] = nextState;
        this.followingStates.push(nextState);
    };

    //*** SITUATION *******/
    /**
     * Descreve a situação da máquina em uma determinada rodada.
     * é, na verdade, uma coleção de estados com suas contagens de erros acumulados.
     *
     * @constructor
     */
    var MachineSituation = function() {
        this.misspellingCountPerState = {};
        this.statesList = [];
    };

    /**
     * Registra a situação de um state.
     * Contagens de erros de ortografia podem apenas diminuir aqui, nunca aumentar.
     * @param state
     * @param misspellingErrorCount
     */
    MachineSituation.prototype.registerSituation = function(state, misspellingErrorCount) {

        if (misspellingErrorCount > StateMachine._maximumErrorTolerance) {
            throw new Error('Tentando superar a tolerância configurada para a máquina. valor desejado: ' + misspellingErrorCount + ' state: ' + state.label);
        }

        if (!Utils.contains(this.statesList, state)) {
            this.statesList.push(state);
            this.misspellingCountPerState[state.label] = misspellingErrorCount;
        } else {
            var currentMisspellingCount = this.getSituation(state);
            if (misspellingErrorCount < currentMisspellingCount) {
                this.misspellingCountPerState[state.label] = misspellingErrorCount;
            }
        }
    };

    /**
     *
     * @param {MachineSituation} otherSituation
     */
    MachineSituation.prototype.merge = function(otherSituation) {
        var _self = this;

        otherSituation.statesList.forEach(function(state) {
            _self.registerSituation(state, otherSituation.getSituation(state));
        });
    };

    MachineSituation.prototype.toString = function() {
        return JSON.stringify(this.misspellingCountPerState);
    };


    /**
     * Recupera a contagens de erros de ortografia de um state específico.
     * @param state
     */
    MachineSituation.prototype.getSituation = function(state) {
        var currentSituation = this.misspellingCountPerState[state.label];
        if ((typeof(currentSituation) == 'undefined')) {
            currentSituation = 9999;
        }
        return currentSituation;
    };

    //*** LEXICAL TOKEN *******/
    /**
     * Cria um token com um id atribuído automáticamente.
     * @param {string} tokenStr string que define o token.
     * @param {number} errorTolerance nível de tolerancia de erros para reconhecimento do token. Quantidade absoluta de caracteres errados tolerados.
     * @param {object} [userData] dados a serem vinculados ao token.
     * @constructor
     */
    var LexicalToken = function(tokenStr, errorTolerance, userData) {
        this.id = LexicalToken.nextId();
        this.name = tokenStr;
        this.errorTolerance = errorTolerance || 0;
        this.userData = userData;
    };

    LexicalToken._currentId = 0;

    LexicalToken.nextId = function() {
        LexicalToken._currentId += 1;
        return LexicalToken._currentId;
    };

    //*** UTILS **********/

    var Utils = {};
    /**
     * Checa se um elemento consta em um array. Muito mais rápido que o <code>indexOf<code> nativo
     * pois evita diversos tratamentos complementares.
     * @param array
     * @param element
     * @returns {boolean}
     */
    Utils.contains = function(array, element) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === element) {
                return true;
            }
        }
        return false;
    };

    Utils.isString = function(obj) {
        if (typeof obj == 'string' || obj instanceof String) {
            return true;
        }
        return false;
    };

    /**
     * Converte \t, \n, \r... em espaços em branco;
     * Remove espaços em branco ao início e ao fim da string;
     * Evita espaços duplicados.
     * @param {string} str
     * @returns {string}
     */
    Utils.normalizeWhitespaces = function(str) {
        str = str.replace(/\s+/g, ' '); //removendo espaços duplicados
        str = str.replace(/((^\s)|(\s$))/g, ''); //aplicanto trim
        return str;
    };

    /**** AUTOCOMPLETE_DICTIONARY ******/

    var DEFAULT_AUTOCOMPLETED_CHARS = 7;
    var MIN_WORD_SIZE = 3;

    //TODO: Melhorar desempenho em plurais e gêneros

    var AutoCompleteDictionary = function() {
        this.lexicalAnalyzer = new StateMachine();

        this.__SERIAL_DATA_ID = 0;

        this.allData = {};

        var self = this;

        this.addItem = function(key, value) {

            this.__SERIAL_DATA_ID += 1;

            if (!value.__dictionaryDataId) {
                value.__dictionaryDataId = this.__SERIAL_DATA_ID;
                this.allData[value.__dictionaryDataId] = value;
            }

            var _self = this;
            var allWords = key.split(' ');
            allWords.forEach(function(word) {
                //registrando apenas palavras com mais de 2 letras no autocomplete.
                if (word.length < 3) {
                    return;
                }
                var lToken = new LexicalToken(word, _suggestedTolerance(word), value);
                _self.lexicalAnalyzer.addToken(lToken);
            });
        };

        this.bulkAddItems = function(itemsArray, keyName) {
            itemsArray.forEach(function(item) {
                self.addItem(item[keyName], item);
            });
        };

        this.findWord = function(inputString) {
            return this.lexicalAnalyzer.findTokens(inputString);
        };

        this.suggestItems = function(inputString, options) {

            options = options || {};
            var minWordSize = options.minWordSize || MIN_WORD_SIZE;

            var findOptions = {};
            findOptions.outputMode = 'MULTI_TOKEN';
            findOptions.autocompleteChars = DEFAULT_AUTOCOMPLETED_CHARS;

            var allWords = inputString.split(' ');

            //só consideramos palavras com mais de 2 letras no autocomplete.
            var validWords = [];
            for (var i = 0; i < allWords.length; i++) {
                if (allWords[i].length >= minWordSize) {
                    validWords.push(allWords[i]);
                }
            }
            allWords = validWords;

            if (allWords.length === 0) {
                return [];
            }


            var currentWord = allWords[0];

            //Buscando resultados pela primeira palavra
            var resultCandidates = this.lexicalAnalyzer.findTokens(currentWord, findOptions);
            var scoreMap = _generateScoreMap(resultCandidates);
            resultCandidates = resultCandidates.map(function(resultItem) {
                return resultItem.token.userData;
            });


            //Remove resultados duplicados e ordena.
            resultCandidates = _sanitizeResultCandidate(resultCandidates);

            //Filtrando resultados para cada nova palavra
            for (var j = 1; j < allWords.length; j++) {
                currentWord = allWords[j];
                //Buscando palavras e mapeando scores
                var newResults = this.lexicalAnalyzer.findTokens(currentWord, findOptions);
                var oldScoreMap = scoreMap;
                var newScoreMap = _generateScoreMap(newResults);
                var newCandidates = newResults.map(function(resultItem) {
                    return resultItem.token.userData;
                });
                newCandidates = _sanitizeResultCandidate(newCandidates);

                //Filtrando resultados comuns a todas as palavras
                resultCandidates = _intersectionInSanitizedCandidates(resultCandidates, newCandidates);

                //Atualizando scoreMap
                scoreMap = _updateScoreMap(resultCandidates, oldScoreMap, newScoreMap);
            }

            //Ordenando resultado por score
            return _sortByScoremap(resultCandidates, scoreMap);
        };

        this.suggestSortItemsBySuggestion = function(inputString, options) {

            var matchingItems = this.suggestItems(inputString, options);

            _includeMissingValues(matchingItems, this.allData);

            return matchingItems;
        };
    };

    function _suggestedTolerance(acceptedString) {
        var strLen = acceptedString.length;
        if (strLen < 3) {
            return 0;
        }
        if (strLen < 6) {
            return 1;
        }
        if (strLen < 9) {
            return 2;
        }
        return 3;
    }

    function _compareUserDataObjectsForSort(userData1, userData2) {
        return userData1.__dictionaryDataId - userData2.__dictionaryDataId;
    }

    function _sanitizeResultCandidate(candidatesArray) {
        //Ordenando
        candidatesArray = candidatesArray.sort(_compareUserDataObjectsForSort);
        var resultWithoutDuplicates = [];

        //Removendo valores duplicados
        var arrayLen = candidatesArray.length;
        var currentId = -1;
        for (var i = 0; i < arrayLen; i++) {
            var userData = candidatesArray[i];
            if (userData.__dictionaryDataId != currentId) {
                resultWithoutDuplicates.push(userData);
                currentId = userData.__dictionaryDataId;
            }
        }

        return resultWithoutDuplicates;
    }

    function _intersectionInSanitizedCandidates(candidateArray1, candidateArray2) {
        var allCandidates = candidateArray1.concat(candidateArray2);
        allCandidates = allCandidates.sort(_compareUserDataObjectsForSort);

        var intersection = [];

        var arrayLen = allCandidates.length;
        var currentId = -1;
        for (var i = 0; i < arrayLen; i++) {

            var userData = allCandidates[i];
            if (userData.__dictionaryDataId == currentId) {
                intersection.push(userData);
            }
            currentId = userData.__dictionaryDataId;
        }

        return intersection;
    }

    function _generateScoreMap(resultArray) {
        var scoreMap = {};

        var arrayLen = resultArray.length;
        for (var i = 0; i < arrayLen; i++) {
            var result = resultArray[i];

            var dataId = result.token.userData.__dictionaryDataId;

            var currentScore = scoreMap[dataId];
            if (!currentScore) {
                scoreMap[dataId] = result.score;
            } else {
                if (currentScore > result.score) {
                    scoreMap[dataId] = result.score;
                }
            }
        }

        return scoreMap;
    }

    function _updateScoreMap(resultArray, oldScoreMap, newScoreMap) {
        var scoreMap = {};

        var arrayLen = resultArray.length;
        for (var i = 0; i < arrayLen; i++) {
            var resultId = resultArray[i].__dictionaryDataId;
            scoreMap[resultId] = oldScoreMap[resultId] + newScoreMap[resultId];
        }
        return scoreMap;
    }

    function _sortByScoremap(resultArray, scoreMap) {

        var arrayLen = resultArray.length;
        for (var i = 0; i < arrayLen; i++) {
            var result = resultArray[i];
            var resultId = result.__dictionaryDataId;

            result.__dictionaryTempScore = scoreMap[resultId];
        }

        return resultArray.sort(function sortByScoreDesc(result1, result2) {
            if (result2.__dictionaryTempScore == result1.__dictionaryTempScore) {
                return result1.__dictionaryDataId - result2.__dictionaryDataId;
            }
            return result2.__dictionaryTempScore - result1.__dictionaryTempScore;

        });

    }

    function _includeMissingValues(resultList, allData) {

        //Usar o indexOf seria o(n2). Vamos usar um hash para acelerar!
        var missingItems = {};

        //Calculando todos os itens que não fazem parte do resultList
        for (var itemId in allData) {
            missingItems[itemId] = allData[itemId];
        }

        var resultsLen = resultList.length;
        for (var j = 0; j < resultsLen; j++) {
            var resultItem = resultList[j];
            missingItems[resultItem.__dictionaryDataId] = null;
            delete missingItems[resultItem.__dictionaryDataId];
        }

        //Adicionando os itens faltantes ao resultList com score 0
        for (var missingItemId in missingItems) {
            var missingItem = missingItems[missingItemId];
            missingItem.__dictionaryTempScore = 0;
            resultList.push(missingItem);
        }

    }

    /***** EXPORTANDO BIBLIOTECA *****/
    var root = typeof self === 'object' && self.self === self && self ||
        typeof global === 'object' && global.global === global && global ||
        this;
    root.HmAutoCompleteDictionary_ = AutoCompleteDictionary;

})();
