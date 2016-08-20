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
            classMethods: {},
            instanceMethods: {
                create: function () {
                    return GlassesPassApi.create(this);
                },
                update: function () {
                    return GlassesPassApi.update(this);
                }
            }
        });

        function getAttributes() {
            return {
                ndl: {
                    label: true
                },
                rightF: {
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
                leftF: {
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
                version: {
                    label: true
                },
                pd: {
                    label: true
                },
                date: {
                    label: true
                },
                order: {
                    label: true
                }
            };
        }
    }

})();