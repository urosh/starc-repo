(function(){

  'use strict';

  angular.module('app.commons')
    .factory('DataModel', DataModel);

  DataModel.$inject = ['CommonServices', 'requestNotificationChannel'];

  function DataModel(CommonServices, requestNotificationChannel){

    var queryData = {};
    var selectedTools = [];
    var tools = [];

    var searchResults = [];
    var resultCollections = [];
    var resultTypes = [];

    var model = {
      selectTool : selectTool,
      removeTool: removeTool,
      getSelectedTools : getSelectedTools,
      setTools : setTools,
      setQueryData : setQueryData,
      getQueryData : getQueryData,
      setResults : setResults,
      getResults : getResults,
      getResultTypes : getResultTypes,
      getResultCollections : getResultCollections,
      getItemById : getItemById,

    };

    return model;

    // Tools selection. Adding and removing tools to the workspace
    function selectTool(source, e) {
      CommonServices.addObjectFromCollection(tools, selectedTools, 'name', e);
      requestNotificationChannel.toolAdded(e);

    }

    function removeTool(e) {
      CommonServices.removeObjectFromCollection(selectedTools, 'name', e);
      requestNotificationChannel.toolRemoved(e);
    }

    function getSelectedTools() {
      return selectedTools;
    }

    function setTools(_tools){
      tools = _tools;
    }

    // Search
    function setQueryData(query) {
      queryData = query;
    }

    function getQueryData() {
      return queryData;
    }



    function setResults(res) {
      resultCollections = [];
      resultTypes = [];

      searchResults = res;
      _.each(searchResults, function(item){
        var collectionExists = false;
        var typeExists = false;
        _.each(resultCollections, function(coll){
          if(item.collection === coll){
            collectionExists = true;
          }
        });

        _.each(resultTypes, function(type){
          if(type === item.type){
            typeExists = true;
          }
        });
        
        if(!collectionExists) { resultCollections.push(item.collection); }
        if(!typeExists) { resultTypes.push(item.type); }
      })
      

      requestNotificationChannel.searchResultsReady();
    }

    function getResults() {
      return searchResults;
    }

    function getResultTypes() {
      return resultTypes;
    }

    function getResultCollections() {
      return resultCollections;
    }

    function getItemById(id) {
      return CommonServices.getItemById(searchResults, id);
    }



  }


}) ();
