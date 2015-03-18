(function(){
	'use strict';

	angular.module('app.explore', []);
	
	angular.module('app.explore')
	  .constant('tools', {
	    'apps': [ 
	      {
	        'name': 'search',
	        'template': 'to be defined',
	        'code': 'sr'
	      },
	      {
	        'name': 'map',
	        'template': 'map template',
	        'code': 'mp'
	      },
	      {
	        'name': 'annotations',
	        'template': 'annotations template',
	        'code': 'an'
	      },
	      {
	        'name': 'collections',
	        'template': 'collections template',
	        'code': 'cl'
	      },
	      {
	        'name': 'statistics',
	        'template': 'statistics template',
	        'code': 'st'
	      },
	      {
	        'name': 'visualizations',
	        'template': 'visualizations template',
	        'code': 'vs'
	      },
	      {
	        'name': 'stories',
	        'template': 'stories template',
	        'code': 'sr'
	      }

	    ],
	    'urls' : '/dash?sr&mp'
	    
	  });


})();