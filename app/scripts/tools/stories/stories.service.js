/**
 * Created by urosdamnjanovic on 11/6/14.
 */
(function(){

  'use strict';
  angular
    .module('app.tools.stories')
    .factory('storiesService', StoriesService );


  /* @ngInject */

  StoriesService.$inject = ['storiesDataModel'];
  function StoriesService(storiesDataModel) {
    var service = {
      manageBlocks : manageBlocks,
      blockTypeChanged: blockTypeChanged,
      addObjectToBlock : addObjectToBlock,
      removeObjectFromBlock : removeObjectFromBlock,
      updateStory : updateStory

    };

    return service;

    ////////////////
    function manageBlocks(i, mode) {
      // once i add the bock i need to take care of stories collection also.
      // I need to move
      var source = storiesDataModel.getBlocks();
      var stories = storiesDataModel.getStories();
      if(mode === 'add') {
        source.splice(i+1, 0, {'type': 'block', 'active' : false});
        stories.splice(i+1, 0, {});
      } else{
        source.splice(i, 1);
        stories.splice(i, 1);
      }

      //return source;
    }





    function addObjectToBlock(item, source) {
      var add = true;
      for (var i = 0; i < source.length; i++) {
        if(item.docID === source[i].docID){ add = false; }
      }
      if(add) { source.push(item); }
    }
    function removeObjectFromBlock(index, source) {
      source.splice(index, 1);
    }



    function blockTypeChanged(index, type) {
      var source = storiesDataModel.getBlocks();
      for (var i = 1; i < source.length; i++) {
        source[i].active = false;
      }
      source[index].active = true;
      source[index].type = type;
    }



    function updateStory(type,  index, content) {
      var source = storiesDataModel.getStories();
      if(type === 'title') {
        source[0].title = content;
        source[0].type = 'title';
      }else if(type === 'text'){
        source[index] = {
          content : content,
          type : 'text',
          index : index
        };

      }else if(type === 'object') {
        source[index] = {
          content : content,
          type : 'object',
          index : index

        };


      }

    }





  }

})();