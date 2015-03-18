(function(){
  'use strict';

  angular.module('app.tools.collections')
    .factory('collectionsService', CollectionsService);

  CollectionsService.$inject = ['$http'];

  function CollectionsService($http){
    var service = {
      itemExist : itemExist,
      saveCollection : saveCollection,
      clearItems : clearItems
    };

    return service;

    function clearItems(items) {
      for (var i = 0; i < items.length; i++) {
        items[i].active = false;
      }
    }

    function itemExist(items, id) {
      var exist = false;
      for (var i = 0; i < items.length; i++) {
        if( items[i]['docID'] === id ){
          exist = true;
        }
      }
      return exist;
    }


    function saveCollection(_title, _text, _items) {
      var title = _title;
      var text = '';
      if(_text) {
        text = _text;
      }
      var items = '';

      _.each(_items, function(_item){
        if(items){
          items = items + ', ' + _item.docID;
        }else{
          items =_item.docID;
        }
      });

      var collectionData = {
        'title': title,
        'text': text,
        'items': items
      };
      JSON.stringify(collectionData);

      $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

      return $http.post('http://public.cyi.ac.cy/starcRepo/map/savecollection', collectionData);

    }

  }


})();






