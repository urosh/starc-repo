(function(){
  'use strict';


  angular.module('app.tools.map')
    .controller('mapController', MapController);

  MapController.$inject = [ 'DataModel', 
                            '$scope', 
                            '$filter', 
                            'display', 
                            'requestNotificationChannel', 
                            'mapService', 
                            'uiGmapGoogleMapApi', 
                            'searchService'];

  function MapController(DataModel, $scope, $filter, display, requestNotificationChannel, mapService, uiGmapGoogleMapApi, searchService) {
    var vm = this;
    vm.markers = [];
    vm.testMarkers = [];
    vm.searchBounds = {
      bounds: {},
      events: {
        bounds_changed: function(mapModel) {
          if(mapModel.getBounds()){
            // ok i have the data here. 
            console.log(mapModel.getBounds().getNorthEast().lat());
            if(vm.searchActive) {
              searchService.addLocationInfo([mapModel.getBounds().getSouthWest().lat(), mapModel.getBounds().getSouthWest().lng(), mapModel.getBounds().getNorthEast().lat(), mapModel.getBounds().getNorthEast().lng() ]);
            }
            // ok now i need to add info to search 
          }
        }
      }
    };
    vm.searchActive = false;
    
    

    vm.onClicked = function(marker){
      vm.markers = mapService.setMarkers(marker.model);
    }

    var maps;
    uiGmapGoogleMapApi.then(function(_maps) {
      activate();
      maps = _maps;
      //console.log($scope.map);
      var se = new _maps.LatLng(32, 32);
      var nw = new _maps.LatLng(32,32);
      //vm.searchBounds = new _maps.LatLngBounds(se,nw);
      vm.map = {
        center: {
          latitude: 35.1,
          longitude: 33.3
        },
        draggable: true,
        zoom: 8,
        
        events: {
          tilesloaded: function (map, eventName, originalEventArgs) {
            setMapData(map);

          },
          click: function (mapModel, eventName, originalEventArgs) {
            
          },
          dragend: function (mapModel, eventName, originalEventArgs) {
            setMapData(mapModel);
          
          },
          bounds_changed: function(mapModel) {
            setMapData(mapModel);
            setSearch();
            
          }
        }
      };
      
    
    });

    function setMapData(mapModel) {

      mapService.addCenter(mapModel.getCenter());
      mapService.addBounds(mapModel.getBounds());    
 
    }
    
    function setSearch() {
      if(vm.searchActive ){
        var latSW, lonSW, latNE, lonNE;
        latSW = mapService.getCenter().lat() - ( mapService.getCenter().lat() - mapService.getBounds().getSouthWest().lat() ) / 2;
        lonSW = mapService.getCenter().lng() - ( mapService.getCenter().lng() - mapService.getBounds().getSouthWest().lng() ) / 2;
        latNE = mapService.getBounds().getNorthEast().lat() - ( mapService.getBounds().getNorthEast().lat() - mapService.getCenter().lat() ) / 2;
        lonNE = mapService.getBounds().getNorthEast().lng() - ( mapService.getBounds().getNorthEast().lng() - mapService.getCenter().lng() ) / 2;
        
        vm.searchActive = true;
        vm.searchBounds.bounds = new maps.LatLngBounds(new maps.LatLng(latSW, lonSW), new maps.LatLng(latNE, lonNE));
        
      }

    }

    function activate() {
      vm.markers = mapService.setMarkers();
      
      requestNotificationChannel.onSearchResultsReady($scope, function(){
        vm.markers = mapService.setMarkers();
      
      });

      requestNotificationChannel.onDisplayReady($scope, function(item){
        if(item === 'filter'){
          mapService.resetMarkers(vm.markers);
        }
      });

      requestNotificationChannel.onMapSearch($scope, function(mode) {
        
        if(mode === 'search') {
          vm.searchActive = true;
          vm.map.draggable = false;
          setSearch();
        }else{
          vm.searchActive = false;
          vm.map.draggable = true;
            searchService.addLocationInfo([]);
            
        }

        
      });


    }
  }

  angular.module('app.tools.map')
    .controller('ControlsController', ControlsController);

  ControlsController.$inject = ['$scope', 'mapService', 'requestNotificationChannel'];

  function ControlsController($scope, mapService, requestNotificationChannel) {
    // we are here;
    $scope.filterMode = 'true';
    $scope.mapModeChanged = function(src) {
      if(src === 'filter') {
        $scope.filterMode = true;
        requestNotificationChannel.mapSearch('filter');
      }
      else { 
        $scope.filterMode = false; 
        requestNotificationChannel.mapSearch('search');
        
      }
    }

  }

  


})();



