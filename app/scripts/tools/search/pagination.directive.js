(function(){

  'use strict';

  angular.module('app.tools.search')
    .directive('starcPagination', PaginationDirective);

  function PaginationDirective() {
    var directive = {
      restrict : 'E',
      templateUrl : 'scripts/tools/search/templates/pagination.tpl.html',
      scope : {},
      controller : PaginationController,
      controllerAs : 'vm'
    };

    PaginationController.$inject = ['$scope', 'display', 'requestNotificationChannel'];

    function PaginationController($scope, display, requestNotificationChannel) {
      var vm = this;


      vm.numberOfItems = 0;
      vm.items = [];

      vm.paginationNumbers = [];
      vm.perPageNumbers = [20, 40, 80];
      vm.currentPage = 1;
      vm.itemsPerPage = 20;


      vm.perShow = false;
      vm.pagShow = false;
      vm.firstShow = false;
      vm.prevShow = false;
      vm.lastShow = false;
      vm.nextShow = false;

      vm.lastPage = lastPage;
      vm.nextPage = nextPage;
      vm.perPage = perPage;
      vm.itemPage = itemPage;
      vm.firstPage = firstPage;
      vm.prevPage = prevPage;



      var numberOfPages = 0;

      activate();

      function activate() {

        requestNotificationChannel.onDisplayReady($scope, initialize);

        $scope.$watchCollection('vm.items', function() {
          if (vm.items){
            updatePagination();
          }
        });

      }

      function initialize() {
        vm.items = display.getDisplayWindow();
        vm.numberOfItems = display.getNumberOfItems();
        vm.currentPage = display.getCurrentPage();
      }


      function perPage(e) {
        vm.itemsPerPage = e;
        updatePagination();
      }

      function itemPage(e) {
        vm.currentPage = e;
        updatePagination();
      }

      function firstPage() {
        vm.currentPage = 1;
        updatePagination();
      }

      function prevPage() {
        if(vm.currentPage > 1){
          vm.currentPage--;
          updatePagination();
        }
      }

      function nextPage() {
        if(vm.currentPage < numberOfPages ){
          vm.currentPage++;
          updatePagination();
        }
      }

      function lastPage() {
        vm.currentPage = numberOfPages;
        updatePagination();
      }





      function updateDisplay(currentPage, perPage) {
        display.setDisplay(currentPage, perPage);
      }

      function updatePagination() {
        if (vm.currentPage === 1){
          vm.firstShow = false;
        }
        vm.firstShow = false;
        vm.prevShow = false;
        vm.lastShow = false;
        vm.nextShow = false;

        numberOfPages = Math.ceil(vm.numberOfItems/vm.itemsPerPage);

        vm.paginationNumbers = [];
        if( vm.numberOfItems === 0 ){
          vm.perShow = false;
          vm.pagShow = false;
        }
        if( vm.numberOfItems > vm.itemsPerPage ) {
          vm.perShow = true;
          vm.pagShow = true;

          for (var i = -2; i < 3; i++){
            if( (vm.currentPage + i) > 0 && (vm.currentPage + i) < numberOfPages+1){

              vm.paginationNumbers.push(	vm.currentPage + i);
              if (i === -1){
                vm.firstShow = true;
                vm.prevShow = true;
              }
            }
          }


          if(vm.currentPage + 3 < numberOfPages){
            vm.lastShow = true;
            vm.nextShow = true;
          }

        }

        updateDisplay(vm.currentPage, vm.itemsPerPage);

      }


    }
    return directive;


  }


})();

