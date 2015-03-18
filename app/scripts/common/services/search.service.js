(function(){

  'use strict';

  angular.module('app.commons')
    .factory('searchService', SearchService);


  SearchService.$inject = ['$http', 'DataModel', 'display'];

  function SearchService($http, DataModel, display){

    var service = {
      initializeSearch : initializeSearch,
      runSearch : runSearch,
      listItems : listItems,
      getStats : getStats,
      getStatTime : getStatTime,
      addLocationInfo: addLocationInfo
    };
    var data = {
      'search' : [],
      'collections[]': [],
      'types[]': [],
      'locations[]': []
    };

    return service;

    function initializeSearch(){
      return $http.get('http://public.cyi.ac.cy/starcRepo/api/init');
    }
    function addLocationInfo(loc) {
      data['locations[]'] = loc;
    }

    function runSearch() {
      var params = DataModel.getQueryData();
      
      data['search'] = params.search;
      data['collections[]'] = params.collections;
      data['types[]'] = params.types;
      return $http.get('http://public.cyi.ac.cy/starcRepo/api/search', {params: data}).then(function(res){
        DataModel.setResults(res.data);
        display.addDisplayData(res.data, 'search');

      });
    }


    function listItems(items){

      var data  = JSON.stringify({
        'items' : items
      });

      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      return $http.post('http://public.cyi.ac.cy/starcRepo/api/list', data).then(function(res){
        DataModel.setResults(res.data);
        display.addDisplayData(res.data, 'search');
      });
    }

    function getStats() {
      return $http.get('http://public.cyi.ac.cy/starcRepo/api/stats');
    }

    function getStatTime() {
      return $http.get('http://public.cyi.ac.cy/starcRepo/api/time');
    }
  }

})();

