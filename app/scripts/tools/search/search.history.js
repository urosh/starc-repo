/**
 * Created by urosdamnjanovic on 10/17/14.
 */
(function(){
  'use strict';
  angular.module('app.tools.search')
    .directive('starcSearchHistory', StarcSearchDirective);

  function StarcSearchDirective() {
    var directive = {
      restrict: 'E',
      controller: SearchHistoryController,
      controllerAs : 'vm',
      scope: {},
      template: '<div ng-show="vm.history.length" class="search-history">' +
        '<span class="label">Search history</span>' +
        '<div class="indicators-container">' +
        '<span ng-repeat="item in vm.history" ng-click="vm.historySelected($index)" ng-class="(item.active) ? \' indicator active\' : \' indicator\'"></span>' +
        '</div></div>'
    };
    function SearchHistoryController($scope, requestNotificationChannel,  searchHistoryService) {
      var vm = this;

      vm.history = [];
      vm.historySelected = historySelected;
      var historyActive = false;

      activate();

      function activate() {
        requestNotificationChannel.onSearchResultsReady($scope, function(){
          if(!historyActive) {
            setActiveElement();
            vm.history = searchHistoryService.setHistory(historyActive);
          }
          historyActive = false;
        });
      }


      function setActiveElement(i) {
        _.each(vm.history, function(item){
          item.active = false;
        });

        if(i || i === 0){ vm.history[i].active = true;}

      }

      function historySelected(i) {
        historyActive = true;
        setActiveElement(i);
        return searchHistoryService.showResults(i);
      }
    }

    SearchHistoryController.$inject = ['$scope','requestNotificationChannel', 'searchHistoryService'];

    return directive;
  }

})();



