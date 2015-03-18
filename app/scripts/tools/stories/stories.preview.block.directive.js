/**
 * Created by urosdamnjanovic on 11/6/14.
 */
(function(){
  'use strict';

  angular.module('app.tools.stories')
    .directive('starcStoryPreviewBlock', StoryPreviewBlock);

  function StoryPreviewBlock() {
    var directive = {
      restrict : 'E',
      scope : {
        data : '='
      },
      templateUrl : 'scripts/tools/stories/templates/story.preview.block.tpl.html'
    };

    return directive;

  }
})();/**
 * Created by urosdamnjanovic on 11/6/14.
 */
