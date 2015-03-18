/**
 * Created by urosdamnjanovic on 11/4/14.
 */
(function(){
  'use strict';

  angular.module('app.tools.visualizations')
    .controller('VisController', VisualizationController);

  VisualizationController.$inject = ['$scope', 'visService'];

  function VisualizationController($scope, visService) {
      var vm = this;

      vm.resultsActive = false;

      vm.visList = visService.getVisList();

      vm.selectTool = function(index){
        visService.visSelected(index);
        vm.visList = visService.getVisList();

      };

  }


})();