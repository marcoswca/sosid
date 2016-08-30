(function(){
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.glassesPass'
    ];

    angular
        .module('model.glassesPass', dependencies)
        .factory('GlassesPass', GlassesPassModel);

    /** @ngInject */
    function GlassesPassModel(BaseModel, $q, GlassesPassApi) {
        return BaseModel.make({
            api: GlassesPassApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getAttributes() {
            return {
                optiker: {
                    label: true
                },
                rightFernbrille: {
                    label: true
                },
                rightSph: {
                    label: true
                },
                rightCyl: {
                    label: true
                },
                rightA: {
                    label: true
                },
                rightAdd: {
                    label: true
                },
                leftFernbrille: {
                    label: true
                },
                leftSph: {
                    label: true
                },
                leftCyl: {
                    label: true
                },
                leftA: {
                    label: true
                },
                leftAdd: {
                    label: true
                },
                glass: {
                    label: true
                },
                fassung: {
                    label: true
                },
                pd: {
                    label: true
                },
                date: {
                    isDate: true,
                    label: true
                },
                order: {
                    label: true
                }
            };
        }
    }

})();