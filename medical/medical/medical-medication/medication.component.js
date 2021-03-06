

angular.module('medical.medication')
    .component( "medication",
        {
            templateUrl: "medical-medication/medication.view.html",

            controller: ['$scope', '$http', '$rootScope',
                function SubstanceAbuseController($scope, $http, $rootScope) {

                    this.templateRecord = {
                        "MedID":"",
                        "fkClassDetailID":"",
                        "fkMedType":"",
                        "MedName":"",
                        "Dose":"",
                        "Frequency":"",
                        "TakenWhen":"",
                        "MedStartDate":"",
                        "MedEndDate":"",
                        "MedNote":""};

                    this.ID_Field = "MedID";
                    this.phpURL_get="./php/medical_getMeds.php";
                    this.phpURL_create="./php/medical_createMeds.php";
                    this.phpURL_delete="./php/medical_deleteMeds.php";
                    this.phpURL_update="./php/medical_updateMeds.php";


                    //TODO replace the lookup tabels
                    this.medFrequencyLkp = [{"AutoID":"1","MedFrequency":"Twice Daily"},
                        {"AutoID":"2","MedFrequency":"3 times Daily"},
                        {"AutoID":"3","MedFrequency":"4 times Daily"},
                        {"AutoID":"4","MedFrequency":"Daily"},
                        {"AutoID":"5","MedFrequency":"Weekly"},
                        {"AutoID":"6","MedFrequency":"Monthly"},
                        {"AutoID":"7","MedFrequency":"Bedtime"},
                        {"AutoID":"8","MedFrequency":"Nightly"}
                    ];
                    this.medTypeLkp =[
                        {"AutoID":"1","MedType":"Inhaler","MedName":""},
                        {"AutoID":"2","MedType":"OTC","MedName":""},
                        {"AutoID":"3","MedType":"Prescription","MedName":""}];

            this.ClassDetailID = window.localStorage.getItem("ClassDetailID");

            var self = this;


            //received reloadClassDetailIDEvent issued by find-cadet-panel component
            $scope.$on("reloadClassDetailIDEvent", function(evt, id){
                self.ClassDetailID =  id;
                self.init();
            });
            this.dataList=[];
            this.deleteList=[];
            this.editMode = false;
            this.findID = function findID(id, array) {
                        var i = 0;
                        var found = -1;
                        for (i = 0; i < array.length; i++) {

                            //if (array[i].MedImmunizationID === id) {
                            if (array[i][this.ID_Field] === id) {
                                found = i;
                            }
                        }
                        return found;
                    };
            this.getData = function getData() {
                        this.fkClassDetailID = window.localStorage.getItem("ClassDetailID");

                        var post ={};
                        post.fkClassDetailID = this.fkClassDetailID;

                        this.templateRecord.fkClassDetailID = post.fkClassDetailID;

                        var request = {
                            method: "POST",
                            url: this.phpURL_get,
                            data: Object.toparams(post),                                  //urlencode parameters
                            headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                        };
                        var self = this;  //needed for callback
                        $http(request)
                            .then(function (result){
                                    self.dataList= result.data;
                                    self.deleteList=[];

                                    //convert all dates from sql format to html date format
                                    convertDatesInArrayToHtml(self.dataList);
                                },
                                function () {
                                    self.dataList=[];
                                    alert("Error Loading Data");
                                })
                    };
            this.saveEdits = function saveEdits() {
                this.editMode = false;

                //used ][this.ID_Field]  insetad of .MedImmunizationID
                //confirm deletions
                var deletions = [];
                var i = 0;
                var loc;
                for (i=0; i< this.deleteList.length; i++){
                    if(this.deleteList[i][this.ID_Field]!==""){
                        post ={};
                        post[this.ID_Field] = this.deleteList[i][this.ID_Field];
                        var request = {
                            method: "POST",
                            url: this.phpURL_delete,
                            data: Object.toparams(post),                                  //urlencode parameters
                            headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                        };
                        var self = this;  //needed for callback
                        $http(request)
                            .then(function (result) {
                                    //alert("deleted " + JSON.stringify(result));
                                },
                                function () {
                                    alert("Error deleted");
                                })
                    }
                }

                //issue each update
                var updates = [];
                i = 0;
                loc = -1;
                var hasChanges = false;
                for (i = 0; i < this.backupList.length; i++) {
                    loc = this.findID(this.backupList[i][this.ID_Field], this.dataList);
                    if (loc !== -1) {
                        hasChanges = !angular.equals(this.backupList[i], this.dataList[loc]);
                        if (hasChanges) {
                            var post = angular.copy(this.dataList[loc]);
                            convertDatesInObjectToSql(post);
                            var request = {
                                method: "POST",
                                url: this.phpURL_update,
                                data: Object.toparams(post),                                  //urlencode parameters
                                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                            };
                            var self = this;  //needed for callback
                            $http(request)
                                .then(function (result) {
                                      // alert("updated " + result);
                                    },
                                    function () {
                                        alert("Error updating");
                                    })
                        }
                    }
                }

                var additions = [];
                i = 0;
                for (i = 0; i < this.dataList.length; i++) {
                    if (this.dataList[i][this.ID_Field]==="") {
                        additions.push(i);
                        var post = angular.copy(this.dataList[i]);

                        delete post[this.ID_Field];
                        convertDatesInObjectToSql(post);
                        var request = {
                            method: "POST",
                            url: this.phpURL_create,
                            data: Object.toparams(post),                                  //urlencode parameters
                            headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                        };
                        var self = this;  //needed for callback
                        $http(request)
                            .then(function (result) {
                                    //alert("added record: ");
                                },
                                function () {
                                    alert("Error adding record");
                                })
                    }
                }
                if (additions.length > 0) {
                    alert("adding" + additions.length + "records.");
                }
                this.deleteList=[];
            };
            this.enableEdits = function enableEdits() {
                        this.editMode = true;

                        //create backup
                        this.backupList = angular.copy(this.dataList);
                    };
            this.cancelEdits = function cancelEdits() {
                this.editMode = false;
                //restore to backup versions
                this.dataList = this.backupList;
            };
            this.deleteRecord = function deleteRecord(index) {
                this.deleteList.push(this.dataList[index]);
                this.dataList.splice(index, 1);
            };
            this.createRecord = function createRecord() {
                this.dataList.push(angular.copy(this.templateRecord));
            };
            this.getCardStyle = function getCardStyle(editMode) {
                if (editMode) {
                    return "alert-warning";
                }
                return "";
            };
            this.init = function init() {
                this.fkClassDetailID = window.localStorage.getItem("ClassDetailID");
                this.getData();
            };
            this.init();
        }
        ]}
        );
