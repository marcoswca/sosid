'use strict';

module.exports = function(grunt) {

    var _appsPath = __dirname + '/apps/',
        _uid = parseInt(process.env.SUDO_UID);

    if (_uid) {
        grunt.log.error('====================================');
        grunt.log.error('Não é permitido rodar grunt com SUDO');
        grunt.log.error('====================================');
        return;
    }


    grunt.loadNpmTasks('grunt-hub');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-bower-task');

    /**
     * Localiza e carrega as build.config das aplicações na lista apps
     */

    var
        path = require('path'),
        fs = require('fs');

    clearTempConfigs();

    var appsConfigs = getAppsConfigs();

    grunt.initConfig({

        bower: {
            install: {
                options: {
                    copy: false,
                    verbose: true
                }
            }
        },
        hub: {

            production: {
                src: appsConfigs,
                tasks: ['build:production']
            },

            development: {
                src: appsConfigs
            },

            watch: {
                src: appsConfigs,
                tasks: ['watch']
            },

            build_test: {
                src: appsConfigs,
                tasks: ['build:test']
            }
        },

        notify: {
            hub: {
                options: {
                    message: 'Build do sistema pronta para utilização.'
                }
            }
        }

    });

    grunt.registerTask('default', ['bower:install', 'hub:development', 'notify:hub']);

    grunt.registerTask('production', ['bower:install', 'hub:production', 'notify:hub']);

    grunt.registerTask('watch', ['bower:install', 'hub:watch', 'notify:hub']);

    /**
     * varre a pasta de apps buscando por pastas que tem build.config.json e
     *  cria um arquivo de configuracao de grunt dinamicamente a partir do 'build.config.tempalte' injetando as configuracoes do json encontrado
     *
     * @returns {Array} lista de arquivos de configuracoes
     */

    function getAppsConfigs() {

        var apps = [];

        fs
            .readdirSync(_appsPath)
            .filter(function(dirName) {

                // se dirName for arquivo (contém .), pula para o proximo.
                if (dirName.indexOf('.') >= 0) {
                    return true;
                }

                var appDirPath = path.join(_appsPath, dirName);
                var appFileConfigPath = path.join(appDirPath, '/build.config.json');

                var hasConfigFile = false;

                // Verifica se a pasta tem arquivo de configuração (build.config.json)
                fs
                    .readdirSync(appDirPath)
                    .filter(function(file) {
                        if (file.indexOf('build.config.js') === 0) {
                            hasConfigFile = true;
                        }
                    });

                if (hasConfigFile) {

                    // recuperar o arquivo de template
                    var template = fs.readFileSync('./grunt/build.config.template', {
                        encoding: 'utf8'
                    });

                    // configura o que vai ser alterado no template
                    var replaces = {
                        CONFIG_PATH: appFileConfigPath,
                        APP_DIR: appDirPath
                    };

                    // aplicando %variaveis% do template utilizando o hash replaces.
                    for (var attr in replaces) {
                        var regex = new RegExp('%' + attr + '%', 'gi');
                        template = template.replace(regex, replaces[attr]);
                    }

                    var tmpConfigFile = './grunt/temp-' + dirName + '.build.config.js';

                    // caso o arquivo temporario de configuração ja existe, deleta.
                    //if (fs.exists(tmpConfigFile)) {
                       // fs.unlinkSync(tmpConfigFile);
                    //}

                    // cria um arquivo de configuracao para o app na pasta grunt
                    //fs.writeFileSync(tmpConfigFile, template);

                    // adiciona o arquivo de configuracao do app na lista de arquivos que o grunt-hub vai executar
                    apps.push(tmpConfigFile);

                }
            });
        return apps;
    }

    //apaga arquivos temporarios de configuracao que ficam na pasta grunt
    function clearTempConfigs() {
        fs
            .readdirSync(__dirname)
            .filter(function(file) {
                if (file.indexOf('temp-') > -1) {
                    fs.unlinkSync(file);
                }
            });
    }

};
