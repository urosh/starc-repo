/**
 * Created by urosdamnjanovic on 11/5/14.
 */
(function(){
  'use strict'

  angular.module('app.tools.stories')
    .directive('starcTabs', TabsDirective);

  function TabsDirective() {
    var directive = {
      restrict : 'E',
      scope : {},
      controller : TabsController,
      controllerAs : 'vm',
      require: '^starcStories',
      template : '<div class="tab-container"><div ng-click="setView(\'create\')" ng-class="vm.create ? \'tab active\' : \'tab\'">Create</div><div ng-click="setView(\'preview\')" ng-class="!vm.create ? \'tab active\' : \'tab\'">Preview</div></div>',
      link : linkFunc
    };

    function linkFunc(scope, element, attrs, starcStoriesCtrl) {
      scope.setView = setView;

      function setView(source) {
        if (source === 'create') {
          scope.vm.create = true;
          starcStoriesCtrl.changeMode(true);
        } else{
          scope.vm.create = false;
          starcStoriesCtrl.changeMode(false);
        }
      }

    }
    function TabsController() {
      var vm = this;
      vm.create = true;


    }
    return directive;
  }
})();