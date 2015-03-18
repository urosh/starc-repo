/**
 * Created by urosdamnjanovic on 11/5/14.
 */
(function(){

  'use strict';
  angular.module('app.tools.stories')
    .directive('starcStories', StoriesDirective);

  StoriesDirective.$inject = ['storiesDataModel'];

  function StoriesDirective(storiesDataModel) {
    var directive = {
      restrict : 'E',
      controller : StoriesController,
      controllerAs : 'vm',
      scope : {},
      templateUrl : 'scripts/tools/stories/templates/story.tpl.html'
    };

    StoriesController.$inject = ['storiesService'];

    function StoriesController(storiesService) {
      var vm = this;

      vm.createMode = true;
      vm.changeMode = changeMode;
      vm.stories = [];
      vm.blocks = [];

      activate();

      function activate() {
        vm.stories = storiesDataModel.getStories();
        vm.blocks = storiesDataModel.getBlocks();
      }




      function changeMode(mode) {
        vm.createMode = mode;
      }


      return vm;
    }
    return directive;
  }
})();