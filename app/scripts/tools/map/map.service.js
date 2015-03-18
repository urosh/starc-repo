/**
 * Created by urosdamnjanovic on 11/4/14.
 */
(function(){
  'use strict';

  angular.module('app.tools.map')
    .factory('mapService', MapService);

  MapService.$inject = ['DataModel', 'display', '$filter'];

  function MapService(DataModel, display, $filter) {
    var service = {
      setMarkers : setMarkers,
      resetMarkers : resetMarkers,
      addCenter: addCenter,
      getCenter: getCenter,
      addBounds: addBounds,
      getBounds: getBounds
    };
    var id  = 0;
    var center = {};
    var bounds = {};
    function setMarkers(clickedMarker) {

      var markers = [];
      var res = DataModel.getResults();
      for(var key in res){
        if(res[key].lat && res[key].lng && res[key].lat!== '0'){
          var add = true;
          for(var i in markers){
            if( markers[i].latitude === res[key].lat && markers[i].longitude === res[key].lng ) {
              add = false;
            }
          }

          if(add){
            id++;
            var icon = null;
            var clicked = false;
            if(clickedMarker && clickedMarker.latitude === res[key].lat && clickedMarker.lng === res[key].longitude ) {
              if(clickedMarker.clicked) {
                icon = null;
                clicked = false
              }else{
                icon = "images/green.png";
                clicked = true;  
              }
              
            }
            markers.push(
              {
                id: id,
                latitude: res[key].lat,
                longitude: res[key].lng,
                clicked: clicked,
                icon: icon

              }
            );
          }

        }
      }
      if(clickedMarker) {
        if(clickedMarker.clicked) {
          display.resetDisplay();
        }else{
          display.addDisplayData($filter('filter')(DataModel.getResults(), function(item){
            if(item.lat === clickedMarker.latitude && item.lng === clickedMarker.longitude){
              return true;
            }else{
              return false;
            }
          }), 'map');  
        }
        

      }
      return markers;
    }


    function resetMarkers(markers) {
      _.each(markers, function(marker){
        marker.clicked = false;
        marker.icon = null;
      });
      return markers;
    }

    function addCenter(cnt) {
      center = cnt;
    }

    function getCenter() {
      return center;
    }

    function addBounds(bnds) {
      bounds = bnds;
    }

    function getBounds() {
      return bounds;
    }
    return service;


  }
})();