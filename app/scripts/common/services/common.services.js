
(function(){
  'use strict';

  angular.module('app.commons')
    .factory('CommonServices', CommonService);

  CommonService.$inject = ['$http'];  
  
  function CommonService($http){
    var service = {
      addObjectFromCollection : addObjectFromCollection,
      addItemToArray: addItemToArray,
      removeObjectFromCollection: removeObjectFromCollection,
      getItem: getItem,
      getItemById: getItemById
    };

    return service;

    function addObjectFromCollection(source, target, property, value) {
      // function gets source array, target array, property name, and value
      for(var i = 0, j = source.length; i < j; i++){
        if(source[i][property] === value){
          var add = true;
          for(var k = 0, l = target.length; k < l; k++){
            if(target[k][property] === value){
              add = false;
            }
          }
          if(add){
            target.push(source[i]);
          }


        }
      }
    }

    function addItemToArray(myarray, item) {
      var itemIndex = myarray.indexOf(item);
      if(itemIndex === -1 ){
        myarray.push(item)
      }else{
        myarray.splice(itemIndex, 1);
      }
    }

    function removeObjectFromCollection(target, property, value) {
      // function gets source array, target array, property name, and value
      var removeIndex = -1;
      for(var i = 0, j = target.length; i < j; i++){
        if(target[i][property] === value){
          removeIndex = i;
        }
      }
      target.splice(removeIndex, 1);
    }

    function getItem(docID) {
      return $http.get('http://public.cyi.ac.cy/starcRepo/api/details', {params: {docID: docID}});

    }

    function getItemById(collection, id) {
      for (var i = 0, j = collection.length; i < j; i++) {
        if( collection[i].docID === id ){
          return collection[i];
        }
      }
      return [];
    }

  }
})();
