(function(){

  'use strict';

  angular.module('app.tools.collections')
    .directive('starcCollections', CollectionsDirective);

  function CollectionsDirective(){
    var directive = {
      restrict: 'E',
      templateUrl: 'scripts/tools/collections/templates/collections.tpl.html',
      controller: CollectionsController,
      controllerAs: 'vm'

    };



    CollectionsController.$inject = ['$scope',  '$timeout', 'requestNotificationChannel', 'DataModel', 'CommonServices', 'collectionsService'];

    return directive;

    function CollectionsController($scope, $timeout, requestNotificationChannel, DataModel, CommonServices, collectionsService){

      var vm = this;

      vm.collectionTitle = '';
      vm.collectionText = '';
      vm.clearCollection = clearCollection;
      vm.dialogActive = false;
      vm.dialogType = '';
      vm.dialogText = '';
      vm.items = [];
      vm.removeItem = removeItem;
      vm.showDetails = showDetails;
      vm.saveCollection = saveCollection;
      vm.saveDialog = false;
      vm.itemActive = itemActive;



      activate();


      function activate() {
        requestNotificationChannel.onItemAddedToCollection($scope, function(id){
          /* ok now i need to get the item based on id*/
          var item = DataModel.getItemById(id);

          if(!collectionsService.itemExist(vm.items, id)){
            vm.items.push(item);
          }

        });

      }


      function itemActive(index) {
        for (var i = 0; i < vm.items.length; i++) {
          vm.items[i].active = false;
        }
        vm.items[index].active = true;
      }

      function showDetails(id) {
        requestNotificationChannel.itemSelect(id);
      }

      function removeItem(id) {
        collectionsService.clearItems(vm.items);
        CommonServices.removeObjectFromCollection(vm.items, 'docID', id);
      }




      function clearCollection(option) {
        if(option){
          closeDialog();
          if(option === 'ok'){
            vm.items = [];
          }
        }else{
          if(vm.items.length){
            setDialog('Are you sure you want to empty the collection?', 'question');
          }
        }

      }

      var closeDialog = function(){
        vm.dialogActive = false;
        vm.dialogType = 'none';
        vm.dialogText="";
      };

      var setDialog = function(text, type){
        vm.dialogText = text;
        vm.dialogType = type;
        vm.dialogActive = true;
        if(type === 'notification'){
          $timeout(function(){
            closeDialog();
          }, 5000);
        }
      };


      function saveCollection(option) {
        closeDialog();
        vm.saveDialog = true;
        if(option){
          if(!vm.collectionTitle){
            setDialog('Collection title cannot be empty. Please try again', 'notification')
          }else if(!vm.items.length){
            setDialog('No items selected. Please add objects to collection', 'notification');
          }
          else{
            collectionsService.saveCollection(vm.collectionTitle, vm.collectionText, vm.items).then(function(res){
              if(res.data.result === 'success'){
                setDialog('Collection saved.', 'notification');
              }else{
                setDialog('There was problem saving the collection. Please try again.', 'notification');
              }
            });
          }
        }
      }
    }

  }

})();




