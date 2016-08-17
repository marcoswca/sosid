(function () {
    'use strict';

    var dependencies = [];

    angular
        .module('app.shared.components.disableAll', dependencies)
        .directive('skipDisable', skipDisableDirective)
        .directive('nxDisableAll', disableAllDirective);

    /** @ngInject */
    function skipDisableDirective() {
        return {
            restrict: 'A'
        };
    }

    /** @ngInject */
    function disableAllDirective() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var disabledElement = (attrs.disableElementId) ? document.getElementById(attrs.disableElementId) : element[0];

                scope.$watch(attrs.nxDisableAll, function (isDisabled) {
                    if (isDisabled) {
                        disableAll(disabledElement);
                    }
                    else {
                        enableAll(disabledElement);
                    }
                });

                scope.$on('$destroy', function () {
                    enableAll(disabledElement);
                });
            }
        };
    }

    /**
     * Disables everything in the given element.
     *
     * @param {HTMLElement} element
     */
    var disableAll = function (element) {
        angular.element(element).addClass('disable-all');
        element.style.color = 'gray';
        disableElements(element.getElementsByTagName('input'));
        disableElements(element.getElementsByTagName('button'));
        disableElements(element.getElementsByTagName('textarea'));
        disableElements(element.getElementsByTagName('select'));
        disableElements(element.getElementsByTagName('md-select'));
        element.addEventListener('click', preventDefault, true);
    };

    /**
     * Enables everything in the given element.
     *
     * @param {HTMLElement} element
     */
    var enableAll = function (element) {
        angular.element(element).removeClass('disable-all');
        element.style.color = 'inherit';
        enableElements(element.getElementsByTagName('input'));
        enableElements(element.getElementsByTagName('button'));
        enableElements(element.getElementsByTagName('textarea'));
        enableElements(element.getElementsByTagName('select'));
        enableElements(element.getElementsByTagName('md-select'));
        element.removeEventListener('click', preventDefault, true);
    };

    /**
     * Callback used to prevent user clicks.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    var preventDefault = function (event) {
        for (var i = 0; i < event.target.attributes.length; i++) {
            var atts = event.target.attributes[i];
            if (atts.name === "skip-disable") {
                return true;
            }
        }
        event.stopPropagation();
        event.preventDefault();
        return false;
    };

    /**
     * Disables given elements.
     *
     * @param {Array.<HTMLElement>|NodeList} elements List of dom elements that must be disabled
     */
    var disableElements = function (elements) {
        var len = elements.length;
        for (var i = 0; i < len; i++) {
            var shouldDisable = true;
            for (var j = 0; j < elements[i].attributes.length; j++) {
                var atts = elements[i].attributes[j];
                if (atts.name === "skip-disable") {
                    shouldDisable = false;
                    continue;
                }
            }
            if (shouldDisable) {
                angular.element(elements[i]).attr('disabled', true);
                elements[i].disabled = true;
                elements[i].disabledIf = true;
            }
        }
    };

    /**
     * Enables given elements.
     *
     * @param {Array.<HTMLElement>|NodeList} elements List of dom elements that must be enabled
     */
    var enableElements = function (elements) {
        var len = elements.length;
        for (var i = 0; i < len; i++) {
            if (elements[i].disabled === true && elements[i].disabledIf === true) {
                angular.element(elements[i]).attr('disabled', false);
                elements[i].disabled = false;
                elements[i].disabledIf = null;
            }
        }
    };

})();