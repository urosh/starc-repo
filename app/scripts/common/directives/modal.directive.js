(function(){
  'use strict';

  angular.module('app.commons')
    .directive('starcModal', ModalDirective);

  ModalDirective.$inject = [];
  function ModalDirective(){

    var directive = {
      restrict: 'A',
      template: "<div ng-class=\"(vm.loading) ? '' : 'ng-hide'\"><div  ng-class=\"(vm.active) ? 'md-modal md-show' : 'md-modal'\" ng-include='vm.modal' ng-cloak></div><div class='md-overlay' ng-click='vm.removeModal()'></div></div>",
      controller: ModalController,
      controllerAs: 'vm'

    };


    

    function ModalController($scope, CommonServices, requestNotificationChannel, $timeout){

      var vm = this;
      vm.active = false;
      vm.imageLocation = '';
      vm.loading = false;
      vm.modal = '';
      vm.metadata = [];
      vm.title = '';
      vm.removeModal = removeModal;
      vm.objectType = '';
      vm.x3dType = false;
      vm.preloaderActive = false;
      
      function removeModal() {
        vm.active = false;
        vm.title = '';
        vm.imageLocation = '#';
        vm.metadata = [];
        requestNotificationChannel.removeModal();
      }

      requestNotificationChannel.onX3DOMLoaded($scope, function(){
        vm.preloaderActive = false;
      });


      function showDetails(docID) {
        vm.docID = docID;
        vm.modal = 'scripts/common/templates/modal.tpl.html';

        var result = CommonServices.getItem(docID);
        
        result.then(function(res){
          vm.metadata = [];
          vm.title = res.data.title;
          vm.imageLocation = res.data.imageLocation;
          vm.objectType = res.data.objectType;
          
          if(vm.objectType === 'x3d'){
            vm.x3dType = true;
            vm.preloaderActive = true;
            requestNotificationChannel.loadX3DOM(res.data);
          }else{
            vm.x3dType = false;
          }
          

          for (var i in res.data.metadataList ){
            for( var property in res.data.metadataList[i]){
              vm.metadata.push([property, res.data.metadataList[i][property]]);
            }
          }
          vm.loading = true;
          vm.active = true;
          $scope.dim = [res.data.imageHeight, res.data.imageWidth];
          
        });

      }
      requestNotificationChannel.onItemSelected($scope, showDetails);


    }

    
    ModalController.$inject = ['$scope', 'CommonServices', 'requestNotificationChannel', '$timeout'];
    return directive;

  }




 })();

