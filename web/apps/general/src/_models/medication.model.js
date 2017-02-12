(function() {
    'use strict';

    var dependencies = [
        'Nxt.baseModel',
        'api.medication'
    ];

    angular
        .module('model.medication', dependencies)
        .factory('Medication', MedicationModel);

    /** @ngInject */
    function MedicationModel(BaseModel, $q, MedicationApi) {
        return BaseModel.make({
            api: MedicationApi,
            attributes: getAttributes(),
            classMethods: {}
        });

        function getAttributes() {
            return {
                name: {
                    label: true,
                    validate: {
                        required: {
                            message: true
                        }
                    }
                },
                dosage: {
                    label: true
                },
                unitOfMeasurement: {
                    label: true
                },
                frequency: {
                    label: true
                },
                reasonForTaking: {
                    label: true
                },
                notes: {
                    label: true
                },
                file: {
                    label: true
                },
                units: [
                    "%",
                    "AU",
                    "AU/mL",
                    "bar",
                    "BAU",
                    "BAU/mL",
                    "bead",
                    "BU",
                    "capsule",
                    "CCID_50",
                    "cellular sheet",
                    "Ci",
                    "cloth",
                    "cm^2",
                    "D'ag'U",
                    "disc",
                    "dL",
                    "douche",
                    "drop",
                    "FFU",
                    "g",
                    "globule",
                    "granule",
                    "gum",
                    "hp_C",
                    "hp_M",
                    "hp_Q",
                    "hp_X",
                    "IU",
                    "IU/L",
                    "IU/mL",
                    "kp_C",
                    "L",
                    "Lf",
                    "LfU/mL",
                    "lozenge",
                    "mCi",
                    "mCi/mL",
                    "mEq",
                    "mg",
                    "mg/actuat",
                    "mg/hr",
                    "mg/mg",
                    "mg/mL",
                    "mL",
                    "mmol",
                    "mol",
                    "mU",
                    "ng",
                    "nmol",
                    "organisms",
                    "pastille",
                    "patch",
                    "pellet",
                    "PFU",
                    "pill",
                    "PNU",
                    "PNU/mL",
                    "pouch",
                    "puff",
                    "ring",
                    "salve",
                    "stick",
                    "strip",
                    "suppository",
                    "swab",
                    "tablet",
                    "tampon",
                    "tape",
                    "tbsp",
                    "TCID_50",
                    "tsp",
                    "U",
                    "uCi",
                    "ug",
                    "ug/mL",
                    "uL",
                    "umol",
                    "unt",
                    "unt/mL",
                    "USP'U",
                    "vial",
                    "wafer",
                    "X"
                ]
            };
        }
    }

})();
