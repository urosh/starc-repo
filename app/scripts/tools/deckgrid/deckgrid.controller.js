'use strict';

function DeckgridController($scope, $filter, requestNotificationChannel, DataModel, display){
	$scope.itemAddedToCollection = function(item){
    requestNotificationChannel.itemAddedToCollection(item);
  };

  $scope.annotateItem = function(item){
    requestNotificationChannel.itemAnnotate(item);
  };
  
  $scope.itemClicked = function(e){
    requestNotificationChannel.itemSelect(e);
  };

  $scope.addItemToStory = function(e) {
    requestNotificationChannel.itemAddToStory(e);
  };



  $scope.active = false;
  $scope.noResults = false;
  requestNotificationChannel.onDisplayReady($scope, function(){

    $scope.model = display.getDisplayWindow();
    $scope.active = false;
    console.log($scope.model);
    if($scope.model.length === 0 ){
      $scope.noResults = true;
    }
  });

  $scope.tools = {
    'annotations' : false,
    'collections' : false,
    'stories' : false,
    'active' : false
  };

  $scope.toolsShown = false;


  requestNotificationChannel.onToolAdded($scope, function(item){
    if ($scope.tools.hasOwnProperty(item)) {
      $scope.tools[item] = true;
      $scope.tools.active = true;
    }

  });

  requestNotificationChannel.onToolRemoved($scope, function(item){
    if ($scope.tools.hasOwnProperty(item)) {
      $scope.tools[item] = false;
      var removeTools = true;
      for (var property in $scope.tools) {
        if ($scope.tools.hasOwnProperty(property)) {
          if (property !== 'active' && $scope.tools[property]) {
            removeTools = false;
          }
        }
      }
      if (removeTools) {
        $scope.tools.active = false;
      }
    }


  });

  requestNotificationChannel.onSearchStarted($scope, function(){
    $scope.model = [];
    $scope.active = true;
    $scope.noResults = false;
  });

  requestNotificationChannel.onQueryChange($scope, function(query){
    if(query === ''){
      display.resetDisplay();
    }else{

      if(DataModel.getResults().length){
        display.addDisplayData($filter('filter')(display.getDisplayData(), query), 'filter');
      }
    
    }
  });

}

DeckgridController.$inject = ['$scope', '$filter', 'requestNotificationChannel', 'DataModel', 'display'];
