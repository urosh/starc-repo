/**
 * Created by urosdamnjanovic on 11/4/14.
 */
(function(){

  'use strict';
  
  angular.module('app.tools.visualizations')
    .factory('visService', VisualizationService);

  VisualizationService.$inject = ['DataModel'];
  function VisualizationService(DataModel) {

    var visList = [
      {'name' : 'upload distribution', 'visible': false},
      {'name' : 'object types', 'visible': false},
      {'name' : 'relations', 'visible': false}
    ];

    var service = {
      visList : visList,
      visSelected : visSelected,
      getVisList: getVisList,
      getResultsData : getResultsData
    };
    function visSelected(index) {
      _.each(visList, function(item){
        item.visible = false;
      });
      visList[index].visible = true;
    }

    function getVisList() {
      return visList;
    }

    function getResultsData(data) {
      console.log('ok we are here?');
      var results = DataModel.getResults();
      var newData = [];
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < results.length; j++) {
          if(data[i].docID === results[j].docID){
            newData.push(data[i]);
          }
        }
      }
      return newData;
    }

    return service;

  }

})();