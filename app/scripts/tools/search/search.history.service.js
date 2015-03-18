/**
 * Created by urosdamnjanovic on 11/3/14.
 */

(function(){

  'use strict';

  angular.module('app.tools.search')
    .factory('searchHistoryService', SearchHistoryService);

  function SearchHistoryService(DataModel,requestNotificationChannel, display) {
    var service = {
      getHistory : getHistory,
      showResults : showResults,
      setHistory : setHistory
    };

    var history = [];
    var numberOfHistoryItems = 8;

    return service;

    function getHistory() {
      return history;
    }

    function showResults(i) {
      requestNotificationChannel.historySet(history[i].query);
      DataModel.setResults(history[i].data);
      display.addDisplayData(history[i].data, 'search');
    }

    function setHistory() {
      if(history.length === numberOfHistoryItems){
        history.splice(0,1);
      }
      history.push({ 'data' : DataModel.getResults(), 'active' : true, 'query' : DataModel.getQueryData()});
      return history;
    }



  }

  SearchHistoryService.$inject = ['DataModel','requestNotificationChannel', 'display'];

})();
