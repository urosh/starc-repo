/**
 * Created by urosdamnjanovic on 11/5/14.
 */
(function(){

  'use strict';
  angular.module('app.tools.stories')
    .directive('starcStoriesBlock', StoriesBlockDirective);

  StoriesBlockDirective.$inject = ['storiesService', 'requestNotificationChannel', 'DataModel', '$timeout'];

  function StoriesBlockDirective(storiesService, requestNotificationChannel, DataModel, $timeout) {
    var directive = {
      restrict : 'E',
      controller : StoriesBlockController,
      controllerAs : 'vm',
      require: '^starcStories',
      scope : {
        type : '=',
        index : '=',
        drop : '='

      },
      templateUrl : 'scripts/tools/stories/templates/story.block.template.html',
      link: linkFunc
    };

    function linkFunc(scope, element, attrs, starcStoriesCtrl) {
      scope.manageBlock = manageBlock;
      scope.contentChanged = contentChanged;
      scope.removeItemFromObjects = removeItemFromObjects;

     // var label = element.getChildElement(0);

      //var label =  angular.element(element[0].querySelectorAll('.label')[0]);
      //label.css('height', '50px');
      function manageBlock(mode) {
        storiesService.manageBlocks(scope.index, mode);
      }

      requestNotificationChannel.onItemAddedToStory(scope, function(item){
        if(scope.type === 'object' && scope.vm.selectedObjects.length < 4 && scope.drop) {
          contentChanged('object', DataModel.getItemById(item));


        }
      });
      function removeItemFromObjects(index) {
        storiesService.removeObjectFromBlock(index, scope.vm.selectedObjects);
        scope.vm.dropEnabled = true;
        //storiesService.updateStory('object',  scope.index, index);


      }

      function contentChanged(type, $data) {
        console.log('something changed');
        if(type === 'title') {
          storiesService.updateStory(type,  scope.index, scope.vm.title);

        }else if(type === 'text') {
          storiesService.updateStory(type,  scope.index, scope.vm.text);
        }else if(type === 'object') {
          storiesService.addObjectToBlock($data,  scope.vm.selectedObjects);

          storiesService.updateStory(type,  scope.index,scope.vm.selectedObjects);
          $timeout(function(){
            var index = scope.vm.selectedObjects.length;
            var label = angular.element(element[0].querySelectorAll('.label')[index-1]);
            var w = parseInt($data.width * 60 / $data.originalHeight);

            label.css('width', w + 'px');

          }, 50);
          if(scope.vm.selectedObjects.length === 3) { scope.vm.dropEnabled = false; }
        }

      }


    }
    StoriesBlockController.$inject = ['$scope'];

    function StoriesBlockController($scope) {
      var vm = this;
      vm.setBlockType = setBlockType;

      vm.blockTitle = '';
      vm.title = '';
      vm.text = '';
      vm.dropEnabled = true;
      vm.selectedObjects = [];

      if($scope.type === 'title') { vm.blockTitle = "Title"; }

      function setBlockType(type) {
        storiesService.blockTypeChanged($scope.index, type);
        vm.blockTitle = type.charAt(0).toUpperCase() + type.slice(1) + ' block';
        vm.blockTitle = "";

      }

    }
    return directive;
  }
})();
