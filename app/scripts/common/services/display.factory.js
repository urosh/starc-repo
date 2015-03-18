(function(){
  'use strict';

  angular.module('app.commons')
    .factory('display', DisplayFactory);

  DisplayFactory.$inject = ['$rootScope', 'requestNotificationChannel'];
    
  function DisplayFactory($rootScope, requestNotificationChannel){
    var history = [];
    var sources = [];
    var window = [];

    var itemsPerPage  = 20;
    var currentPage = 1;
    var numberOfItems = 0;

    var display = {
      getItemsPerPage : getItemsPerPage,
      getCurrentPage : getCurrentPage,
      getNumberOfItems : getNumberOfItems,
      history : history,
      sources : sources,
      window : window,
      setDisplay : setDisplay,
      addDisplayData : addDisplayData,
      resetDisplay : resetDisplay,
      getDisplayData : getDisplayData,
      getDisplayWindow : getDisplayWindow

    };

    return display;

    function getItemsPerPage(){
      return itemsPerPage;
    }
    function getCurrentPage(){
      return currentPage;
    }
    function getNumberOfItems(){
      return numberOfItems;
    }

    function setDisplay(_currentPage, _perPage){
      if (_currentPage){
        currentPage = _currentPage;
      }
      if(_perPage){
        itemsPerPage = _perPage;
      }
      if(sources.length){
        window = filterItems(currentPage, itemsPerPage);
        numberOfItems = sources[sources.length-1].length;
        requestNotificationChannel.displayReady(history[history.length-1]);
      }
    }

    function filterItems(curPage, perPage) {
      window = null;
      var source = sources[sources.length-1];
      var result = [];
      var firstItem = ( curPage - 1 ) * perPage;
      var lastItem = (source.length > firstItem + perPage ? firstItem + perPage : source.length);
      for(var i = firstItem; i < lastItem; i++){
        result.push(source[i]);
      }
      return result;
    }


    function addDisplayData(items, source) {
      if(source === 'search'){
        history = ['search'];
        itemsPerPage = 20;
        currentPage = 1;
        sources=[items];
      }else{
        currentPage = 1;
        history[1] = source;
        sources[1] = items;
      }
      setDisplay();
    }


    function resetDisplay() {
      sources.pop();
      history.pop();
      setDisplay();

    }

    function getDisplayData() {
      return sources[0];

    }

    function getDisplayWindow() {
      return window;
    }


  }
}) ();
