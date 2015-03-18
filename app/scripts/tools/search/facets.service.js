/**
 * Created by urosdamnjanovic on 11/4/14.
 */
(function(){
  'use strict';

  angular
    .module('app.tools.search')
    .factory('facetService', FacetService );

  FacetService.$inject = ['DataModel', 'display'];

  /* @ngInject */
  function FacetService(DataModel, display) {
    var service = {
      setFacetTypes : setFacetTypes,
      setFacetCollections : setFacetCollections,
      filterFacet : filterFacet,
      updateDisplay : updateDisplay
    };

    return service;
    ////////////////

    function setFacetTypes() {
      var types = [];
      _.each(DataModel.getResultTypes(), function (item) { types.push({'name': item, 'selected': false}); });
      return types;
    }

    function setFacetCollections() {
      var collections = [];
      _.each(DataModel.getResultCollections(), function (item) { collections.push({'name': item, 'selected': false}); });
      return collections;
    }

    function filterFacet( currentStatus, _items, source) {
      var items = _items;
      var add = true;
      var removeIndex = -1;
      _.each(items, function(item, i){
        if(item['name'] === source['name']){
          add = false;
          if(currentStatus) { removeIndex = i; }
        }
      });

      if(currentStatus && removeIndex > -1) { items.splice(removeIndex, removeIndex+1); }
      if(add) { items.push(source); }

      return items;
    }

    function updateDisplay(types, collections) {
      var newDisplayData = [];

      if (!types.length && !collections.length) {
        display.resetDisplay();
      } else {
        _.each(display.getDisplayData(), function (item) {
          var add = false;

          _.each(collections, function (collection) {
            if (item.collection === collection.name) {
              add = true;
            }
          });

          _.each(types, function (type) {
            if (item.type === type.name) {
              add = true;
            }
          });

          if (add) {
            newDisplayData.push(item);
          }

        });
        display.addDisplayData(newDisplayData, 'facets');
      }
    }

  }

})();