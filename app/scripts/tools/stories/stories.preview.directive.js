/**
 * Created by urosdamnjanovic on 11/6/14.
 */
(function(){
  'use strict';

  angular.module('app.tools.stories')
    .directive('starcStoryPreview', StoryPreview);

  function StoryPreview() {
    var directive = {
      restrict : 'E',
      scope : {
        data : '='
      },
      controller : PreviewController,
      controllerAs : 'vm',
      templateUrl : 'scripts/tools/stories/templates/story.preview.tpl.html'
    };

    PreviewController.$inject = ['$scope'];

    function PreviewController($scope) {
      var vm = this;
      vm.storyBlocks = $scope.data;

    }
    return directive;

  }
})();