(function(){
 'use strict';
  angular.module('app.tools.annotations')
    .directive('starcAnnotations', AnnotationsDirective);


  function AnnotationsDirective(){

    var directive = {
      restrict: 'E',
      scope: {},
      controller: AnnotationsController,
      controllerAs: 'vm',
      templateUrl: 'scripts/tools/annotations/templates/annotations.tpl.html'

    };

    

    AnnotationsController.$inject = ['$scope', 'requestNotificationChannel', 'CommonServices', 'annotationsService', '$timeout'];

    function AnnotationsController ($scope, requestNotificationChannel, CommonServices, annotationsService, $timeout) {
      var vm = this;

      vm.annotation = {};
      vm.annotateMode = true;
      vm.annotation.title = '';
      vm.annotation.text = '';
      vm.annotationsList = [];
      vm.dialogActive = false;
      vm.dialogType = '';
      vm.dialogText="";
      vm.imageSource = '';
      vm.imageh = '';
      vm.objectLoaded = false;
      vm.saveAnnotation = saveAnnotation;
      vm.changeMode = changeMode;

      var annotationData = {
        top: '',
        left: '',
        w: '',
        h: '',
        title: '',
        description: '',
        docID: ''
      };

      activate();

      function activate() {
        requestNotificationChannel.onItemAnnotate($scope, function(id){
          getAnnotations(id);
        });

      }

      function saveAnnotation() {
        if(!vm.annotation.title){
          setDialog('Please add annotation title and try again.', 'notification');
        }else{
          annotationData.title = vm.annotation.title;
          if(vm.annotation.text){
            annotationData.description = vm.annotation.text;
          }
          annotationsService.saveAnnotation(annotationData).then(function(res){
            if(res.data.result === 'success'){
              setDialog('Annotation saved.', 'notification');
              vm.annotation.title = '';
              vm.annotation.text = '';
            }else{
              setDialog('There was problem while saving the annotation. Please try again.', 'notification');
            }

          });
        }

      }

      this.setArea = function(top, left, w, h){
        annotationData.top = top;
        annotationData.left = left;
        annotationData.w = w;
        annotationData.h = h;

      };

      function getAnnotations(id) {
        return CommonServices.getItem(id).then(function(res){
          annotationData.docID = id;

          vm.imageSource = res.data.imageLocation;
          vm.imageh = parseInt ( 350  * parseInt(res.data.imageHeight) / parseInt(res.data.imageWidth) );
          vm.objectLoaded = true;
          vm.annotationsList = annotationsService.prepareAnnotationList(res.data.annotations);
          return vm.annotationsList;

        });
      }

      function closeDialog() {
        vm.dialogActive = false;
        vm.dialogType = 'none';
        vm.dialogText="";
      }

      function setDialog(text, type) {
        vm.dialogText = text;
        vm.dialogType = type;
        vm.dialogActive = true;
        if (vm.dialogType === 'notification') {
          $timeout(function () {
            closeDialog();
          }, 5000);
        }

      }

      function changeMode(val) {
        vm.annotateMode = val;
        var id = annotationData.docID;
        CommonServices.getItem(id).then(function(res){
          vm.annotationsList = annotationsService.prepareAnnotationList(res.data.annotations);
          return vm.annotationsList;

        });
      }
    }

    return directive;
  }

})();




