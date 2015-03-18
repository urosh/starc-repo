(function(){

  'use strict';

  angular.module('app.tools.statistics')
    .directive('starcStats', StatisticsDirective);

  function StatisticsDirective(){
    var directive = {
      restrict : 'E',
      scope : {},
      controller : StatisticsController,
      controllerAs : 'vm',
      templateUrl : 'scripts/tools/statistics/templates/statistics.tpl.html',

    };
    StatisticsController.$inject = ['searchService', 'DataModel', 'requestNotificationChannel'];


    function StatisticsController(searchService, DataModel, requestNotificationChannel){
      var vm = this;

      vm.numberOfObject = 0;
      vm.collections = [];
      vm.active = true;
      vm.stats = [];
      vm.types = [];

      vm.barchartActive = false;
      vm.statActive = true;
      vm.graphActive = false;

      vm.setContent = setContent;
      vm.search = search;

      activate();

      function activate() {
        searchService.getStats().then(function(res){

          vm.active = false;
          vm.stats = res.data;

        });
      }

      function setContent(type) {
        vm.barchartActive = false;
        vm.statActive = false;
        vm.graphActive = false;
        var helper = type + 'Active';
        vm[helper] = true;
      }

      function search(type, value) {
        DataModel.setQueryData({
          'search' : '',
          'collections': (type === 'collections' ? [value] : []),
          'types': (type === 'types' ? [value]: [])
        });
        requestNotificationChannel.searchStarted();
        searchService.runSearch();
      }
    }

    return directive;

  }


})();

