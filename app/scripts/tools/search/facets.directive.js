(function(){

  'use strict';

  angular.module('app.tools.search')
    .directive('starcFacets', FacetDirective);

  function FacetDirective() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'scripts/tools/search/templates/facets.tpl.html',
      controller: FacetController,
      controllerAs: 'vm'
    };

    function FacetController($scope, requestNotificationChannel,   facetService) {
      var vm = this;

      vm.active = false;
      vm.types = [];
      vm.collections = [];
      vm.selectedTypes = [];
      vm.selectedCollections = [];
      vm.filterFacet = filterFacet;

      activate();

      function activate() {
        requestNotificationChannel.onSearchResultsReady($scope, resultsReady);
      }

      function resultsReady() {
        vm.active = true;
        vm.types = [];
        vm.collections = [];
        vm.types = facetService.setFacetTypes();
        vm.collections = facetService.setFacetCollections();
        vm.selectedTypes = [];
        vm.selectedCollections = [];
      }

      function filterFacet(type, index) {

        var collectionName = '';
        if(type === 'collections'){
          collectionName = 'selectedCollections';
        }else{
          collectionName = 'selectedTypes';
        }

        var currentStatus = vm[type][index].selected;
        vm[type][index].selected = !vm[type][index].selected;
        vm[collectionName] = facetService.filterFacet(currentStatus, vm[collectionName], vm[type][index]);

        facetService.updateDisplay(vm.selectedTypes, vm.selectedCollections);
      }
    }

    FacetController.$inject = ['$scope', 'requestNotificationChannel',  'facetService'];

    return directive;

  }
})();




