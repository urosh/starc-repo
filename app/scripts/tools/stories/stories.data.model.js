/**
 * Created by urosdamnjanovic on 11/7/14.
 */
(function() {

  'use strict';
  angular
    .module('app.tools.stories' )
    .factory('storiesDataModel', StoriesModel);

  //StoriesModel.$inject = [''];

  /* @ngInject */
  function StoriesModel() {
    var service = {
      setBlock : setBlock,
      getBlocks : getBlocks,
      setStory : setStory,
      getStories : getStories
    };
    var blocks = [
      {'type' : 'title'},
      {'type' : '', 'active' : false },
      {'type' : '', 'active' : false },
      {'type' : '', 'active' : false }
    ];

    var stories = [
      {'title' : ''}
    ];




    ////////////////

    return service;

    function setBlock() {

    }
    function getBlocks() {
      return blocks;
    }

    function setStory() {

    }

    function getStories() {
      return stories;
    }



  }

})();