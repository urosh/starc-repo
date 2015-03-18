/**
 * Created by urosdamnjanovic on 11/4/14.
 */
(function(){

  'use strict';

  angular.module('app.tools.visualizations')
    .directive('starcTimeBar', TimeBarDirective);

  TimeBarDirective.$inject = ['d3Service'];

  function TimeBarDirective(d3Service) {
    var directive = {
      restrict : 'E',
      scope : {
        bartitle: '@',
        datasrc: '='
      },
      controller: TimeBarController,
      controllerAs: 'vm',
      template: '<div class="barchart-div"><p class="title">{{ bartitle }}</p></div>',
      link : TimeBarLink
    };

    TimeBarController.$inject = ['$scope', 'searchService', 'visService', 'requestNotificationChannel', 'display', '$filter', 'DataModel'];

    function TimeBarController($scope, searchService, visService, requestNotificationChannel, display, $filter, DataModel) {
      var vm = this;
      var data = [];
      vm.dataSource = 'repo';
      vm.filterActive = false;
      vm.histogramData = [];
      vm.histogramBins = [];
      vm.getData = getData;
      vm.barClicked = barClicked;
      vm.data = [];
      activate();

      function activate() {
        requestNotificationChannel.onSearchResultsReady($scope, function(){
          resetDisplay();
          if(vm.dataSource === 'search'){

            vm.data = visService.getResultsData(data);
          }
        });
      }


      function getData() {
        searchService.getStatTime().then(function(res){
          vm.data = res.data;
          data = res.data;  // this is our data from the repository. It holds information about all existing objects.

          $scope.$watch('datasrc', function(val){
            resetDisplay();
            if(val){
              vm.dataSource = 'search';
              vm.data = visService.getResultsData(data);
            }else{
              vm.dataSource = 'repo';
              vm.data = data;
            }
          });

        });
      }

      function barClicked(i, selected) {
        if(vm.dataSource === 'search'){
          if(selected){
            $scope.$apply(display.resetDisplay());
          } else{
            $scope.$apply(filterData(i));
          }

        }else{
          $scope.$apply(searchData(i));
        }
      }


      function filterData(i) {
        vm.filterActive = true;
        display.addDisplayData($filter('filter')(DataModel.getResults(), function(item){
          var result = false;
          _.each(vm.histogramData[i], function(obj){
            if(item.docID === obj) {
              result = true;
            }
          });
          return result;
        }), 'vis');
      }

      function searchData(i) {
        requestNotificationChannel.searchStarted();
        searchService.listItems(vm.histogramData[i]);
      }




      function resetDisplay() {

        if(vm.filterActive){
          vm.filterActive = false;
          display.resetDisplay();
        }

      }




    }

    function TimeBarLink(scope, element) {

      var margin = {top: 10, right: 10, bottom: 50, left: 10},
        width = 410 - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;
        
      d3Service.d3()
        .then(function(d3){
          scope.vm.getData();
          var timeFormat = d3.time.format('%Y-%m-%d %H:%M:%S');

          var x = d3.time.scale()
            .domain([new Date('2013 2 1'), d3.time.month.offset(new Date(), 1)])
            .range([0, width]);

          var months = d3.time.months(new Date('2013 2 1'), d3.time.month.offset(new Date(), 1));

          var xAxis = d3.svg.axis()
            .tickFormat(d3.time.format("%Y-%m"))
            .tickSize(2,0)
            .tickValues(months)
            .orient("bottom")
            .scale(x);


          var y = d3.scale.linear()
            .range([height, 0]);

          var svg = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right )
            .attr("height", height + margin.top + margin.bottom)

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(5," + (height) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-1em")
            .attr("dy", "-.2em")
            .attr("transform", "rotate(-90)" );




          scope.$watch('vm.data', function(data, oldData){

            if(!data.length) return;
            var currentDate;
            for (var i = 0; i < months.length-1; i++) {
              scope.vm.histogramBins[i] = 0;
              scope.vm.histogramData[i] = [];
              for (var j = 0; j < data.length; j++) {
                currentDate = new Date(data[j].time);
                currentDate = timeFormat.parse(data[j].time);
                if( currentDate < months[i+1] && currentDate > months[i]){
                  scope.vm.histogramBins[i]++;
                  scope.vm.histogramData[i].push(data[j].docID);
                }
              }
            }

            y.domain([0, d3.max(scope.vm.histogramBins, function(d){ return d; }) ]);

            if(!oldData.length) {
              /* Initialize visualization */
              svg.selectAll(".bar")
                .data(scope.vm.histogramBins)
                .enter()
                .append("g")
                .attr("class", "bar")
                .attr("transform", function (d, i) { return "translate(" + (x(months[i]) + 5) + "," + y(d) + ")"; })
                .append("rect")
                .attr("x", 1)
                .on("click", function(d, i){
                  var selected = d3.select(this).classed("active");
                  d3.selectAll('rect').classed("active", false);
                  if(!selected) {
                    d3.select(this).classed("active", true);
                  }else{
                    d3.select(this).classed("active", false);
                  }
                  scope.vm.barClicked(i, selected);
                })
                .attr("width", function (d, i) { return  x(months[i + 1]) - x(months[i]) - 2; })
                .attr("height", function (d) { return height - y(d); });


              svg.selectAll(".bar")
                .append("text")
                .text(function(d) {
                  if(height - y(d) < 10){ return '';}
                  else{
                    return d;
                  }
                })
                .attr("x", function(d, i) {  return ( x(months[i+1]) - x(months[i]) ) / 2; })
                .attr("y", function(d) { return 10; })
                .attr("font-family", "sans-serif")
                .attr("font-size", "9px")
                .attr("fill", "white")
                .attr("text-anchor", "middle");

            }else{
              /* Update visualization */
              d3.selectAll('rect').classed("active", false);

              svg.selectAll(".bar")
                .data(scope.vm.histogramBins)
                .transition()
                .duration(500)
                .attr("transform", function (d, i) { return "translate(" + (x(months[i]) + 5) + "," + y(d) + ")"; })
                .select("rect")
                .attr("height", function (d) { return height - y(d); });


              svg.selectAll(".bar")
                .data(scope.vm.histogramBins)
                .select("text")
                .text(function(d) {
                  if(height - y(d) < 10){ return '';}
                  else{
                    return d;
                  }
                });

            }

          });



        });

    }


    return directive;

  }

})();