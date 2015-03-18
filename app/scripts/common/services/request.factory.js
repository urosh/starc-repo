(function(){
  'use strict';

  angular.module('app.commons')
    .factory('requestNotificationChannel', RequestFactory);

  RequestFactory.$inject = ['$rootScope'];

  function RequestFactory($rootScope){
    var _SEARCH_START_ = '_SEARCH_START_';
    var _RESULTS_READY_ = '_RESULTS_READY_';
    var _DISPLAY_READY_ = '_DISPLAY_READY_';
    var _ITEM_CLICKED_ = '_ITEM_CLICKED_';
    var _QUERY_CHANGE_ = '_QUERY_CHANGE_';
    var _TOOL_ADDED_ = '_TOOL_ADDED_';
    var _TOOL_REMOVED_ = '_TOOL_REMOVED_';
    var _ITEM_ADDED_TO_COLLECTION = '_ITEM_ADDED_TO_COLLECTION';
    var _ITEM_ANNOTATE_ = '_ITEM_ANNOTATE_';
    var _SET_HISTORY_ = '_SET_HISTORY_';
    var _ADD_TO_STORY_ = '_ADD_TO_STORY';
    var _MAP_SEARCH_ = '_MAP_SEARCH_';
    var _LOAD_X3DOM_ = '_LOAD_X3DOM_';
    var _X3DOM_LOADED_ = '_X3DOM_LOADED_';
    var _REMOVE_MODAL_ = '_REMOVE_MODAL_';

    return {
      searchStarted: searchStarted,
      onSearchStarted: onSearchStarted,
      searchResultsReady: searchResultsReady,
      onSearchResultsReady: onSearchResultsReady,
      displayReady: displayReady,
      onDisplayReady: onDisplayReady,
      queryChange: queryChange,
      onQueryChange: onQueryChange,
      itemSelect: itemSelect,
      onItemSelected: onItemSelected,
      toolAdded: toolAdded,
      onToolAdded: onToolAdded,
      toolRemoved: toolRemoved,
      onToolRemoved: onToolRemoved,
      itemAddedToCollection: itemAddedToCollection,
      onItemAddedToCollection: onItemAddedToCollection,
      itemAnnotate: itemAnnotate,
      onItemAnnotate: onItemAnnotate,
      historySet : historySet,
      onHistorySet: onHistorySet,
      itemAddToStory : itemAddToStory,
      onItemAddedToStory : onItemAddedToStory,
      mapSearch: mapSearch,
      onMapSearch: onMapSearch,
      loadX3DOM: loadX3DOM,
      onLoadX3DOM: onLoadX3DOM,
      x3domLoaded: x3domLoaded,
      onX3DOMLoaded: onX3DOMLoaded,
      removeModal: removeModal,
      onModalRemoved: onModalRemoved
      
    };

    function searchStarted() {
      $rootScope.$broadcast(_SEARCH_START_);
    }

    function onSearchStarted($scope, handler) {
      $scope.$on(_SEARCH_START_, function(event){
        handler();
      });
    }

    function searchResultsReady(){
      $rootScope.$broadcast(_RESULTS_READY_);
    }

    function onSearchResultsReady($scope, handler) {
      $scope.$on(_RESULTS_READY_, function (event) {
        handler();
      });
    }

    function displayReady(item) {
      $rootScope.$broadcast(_DISPLAY_READY_, {display: item});
    }


    function onDisplayReady($scope, handler) {
      $scope.$on(_DISPLAY_READY_, function(event, args){
        handler(args.display);
      });
    }

    function queryChange(query) {
      $rootScope.$broadcast(_QUERY_CHANGE_, {query: query});
    }

    function onQueryChange($scope, handler) {
      $scope.$on(_QUERY_CHANGE_, function(event, args){
        handler(args.query);
      });
    }

    function itemSelect(docID) {
      $rootScope.$broadcast(_ITEM_CLICKED_, {docID: docID});
    }

    function onItemSelected($scope, handler) {
      $scope.$on(_ITEM_CLICKED_, function(event, args){
        handler(args.docID);
      });
    }


    function toolAdded(tool) {
      $rootScope.$broadcast(_TOOL_ADDED_, {tool: tool});
    }


    function onToolAdded($scope, handler) {
      $scope.$on(_TOOL_ADDED_, function(event, args){
        handler(args.tool);
      });
    }


    function toolRemoved(tool) {
      $rootScope.$broadcast(_TOOL_REMOVED_, {tool: tool});
    }


    function onToolRemoved($scope, handler) {
      $scope.$on(_TOOL_REMOVED_, function(event, args){
        handler(args.tool);
      });
    }


    function itemAddedToCollection(item) {
      $rootScope.$broadcast(_ITEM_ADDED_TO_COLLECTION, {id: item});
    }


    function onItemAddedToCollection($scope, handler) {
      $scope.$on(_ITEM_ADDED_TO_COLLECTION, function(event, args){
        handler(args.id);
      });
    }


    function itemAnnotate(item) {
      $rootScope.$broadcast(_ITEM_ANNOTATE_, {id: item});
    }

    function onItemAnnotate($scope, handler) {
      $scope.$on(_ITEM_ANNOTATE_, function(event, args){
        handler(args.id);
      });
    }


    function historySet(item) {
      $rootScope.$broadcast(_SET_HISTORY_, {query: item});
    }

    function onHistorySet($scope, handler){
      $scope.$on(_SET_HISTORY_, function(event, args){
        handler(args.query);
      });
    }

    function itemAddToStory(item) {
      $rootScope.$broadcast(_ADD_TO_STORY_, {item: item});
    }

    function onItemAddedToStory($scope, handler) {
      $scope.$on(_ADD_TO_STORY_, function(event, args){
        handler(args.item);
      });
    }

    function mapSearch(mode) {
      $rootScope.$broadcast(_MAP_SEARCH_, {mode: mode});
    }

    function onMapSearch($scope, handler) {
      $scope.$on(_MAP_SEARCH_, function(event, args) {
        handler(args.mode);
      });
    }

    function loadX3DOM(id) {
      $rootScope.$broadcast(_LOAD_X3DOM_, {id: id});
    }

    function onLoadX3DOM($scope, handler){
      $scope.$on(_LOAD_X3DOM_, function(event, args){
        handler(args.id);
      });
    }

    function x3domLoaded() {
      $rootScope.$broadcast(_X3DOM_LOADED_);
    }

    function onX3DOMLoaded($scope, handler) {
      $scope.$on(_X3DOM_LOADED_, function(event) {
        handler();
      })
    }

    function removeModal() {
      $rootScope.$broadcast(_REMOVE_MODAL_);
    }

    function onModalRemoved($scope, handler) {
      $scope.$on(_REMOVE_MODAL_, function(event){
        handler();
      });
    }
  }

})();
