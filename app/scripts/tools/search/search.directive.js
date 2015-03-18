(function(){
  'use strict';

  angular.module('app.tools.search')
    .directive('starcSearch', SearchDirective);

  function SearchDirective() {
    var directive = {
      restrict : 'E',
      templateUrl : 'scripts/tools/search/templates/search.tpl.html',
      scope : {},
      controller : SearchController,
      controllerAs : 'vm'

    };

    function SearchController($scope, searchService, CommonServices, DataModel, requestNotificationChannel) {
      var vm = this;

      vm.selectedTypes = [];
      vm.selectedCollections = [];
      vm.types = [];
      vm.collections = [];
      vm.displayItems = [];
      vm.advanced = false;
      vm.collectionSelected = collectionSelected;
      vm.typeSelected = typeSelected;
      vm.search = search;
      vm.change = change;


      activate();
      function activate() {
        var searchInit = searchService.initializeSearch();
        searchInit.then(function(res){
          vm.collections = res.data.collections;
          vm.types = res.data.types;
        });

        requestNotificationChannel.onHistorySet($scope, function(query){
          vm.query.input = '';
          if(query.search) { vm.query.input = query.search; }

        });

      }


      function collectionSelected(e) {
        CommonServices.addItemToArray(vm.selectedCollections, e);
      }

      function typeSelected(e, i) {
        CommonServices.addItemToArray(vm.selectedTypes, e);
      }

      function search(option) {
        // search initialized
        requestNotificationChannel.searchStarted();
        var queryData = {
          'types' : vm.selectedTypes,
          'collections' : vm.selectedCollections
        };
        if(option === 'browse'){
          queryData.search = '';
        }else{
          if(vm.query){
            queryData.search = vm.query.input;
            
          }else{
            queryData.search = '';
          }
        }

        DataModel.setQueryData(queryData);
        return searchService.runSearch();

      }

      function change(query) {
        requestNotificationChannel.queryChange(query.input);
      }
    }
    SearchController.$inject = ['$scope', 'searchService', 'CommonServices', 'DataModel', 'requestNotificationChannel'];

    return directive;
  }

})();


