var padding = 50;
var w = window.innerWidth - padding
var h = 600;

// Data
var map = null
var dataset = null
var centroids = null
var k = 0
var no_points = 0

var path = d3.geoPath();
var file = "data/exportData.json"
colours = [ "#ff5733", "#0cffff", "#ffbd33", "#27ff23", "#f441ee", "#000"]

var url = "https://raw.githubusercontent.com/suneman/socialdataanalysis2016/master/files/sfpddistricts.geojson"
d3.json(url, function (error, json) {
  if (error) {
    console.log("Error while loading the map:\n"+error)
  } else {
    console.log("Map has been loaded.")
    map = json


    d3.json(file, function (error, data) {
      if (error) {
        console.log("Error while loading the data:\n"+error)
      } else {
        console.log("Data has been loaded.")
        tmp = getData(data)
        dataset = tmp["data"]
        centroids = tmp["centroids"]
        console.log(dataset);
        no_points = dataset.length
        plotMap()
      }
    });
  }
});

d3.select(".buttons")
  .on("click", function() {
    var tmp = d3.event.target
    if( tmp.classList.contains('button') ){
      k = tmp.value - 2
      updateMap()
    }
});

var updateMap = function(){
  circles = svgContainer.selectAll("circle")
         .data(dataset)
         .attr('fill', function(d){
           return colours[d[1][k]]
         })

// GET THE CEONTROIDS
  //  centroids = svgContainer.selectAll(".centroid")
  //                          .data(dataset.slice(idx1, idx2))
  //                          .attr('class', "centroid")
  //                          .attr("cx", function(d) {
  //                            return projection(d[0])[0]
  //                           })
  //                          .attr("cy", function(d) {
  //                            return projection(d[0])[1]
  //                          })
  //                          .attr("r", '10')
  //                          .attr('stroke', function(d){
  //                            console.log(d);
  //                            return colours[d[1][k]]
  //                          })
  //                          .attr('stroke-width', '5')
  //                          .attr('fill', 'none')
}


var plotMap = function(){
  projection = d3.geoAlbersUsa().fitSize([w, h], map);
  path.projection(projection)

  svgContainer = d3.select("#map").append("svg")
                         .attr("width", w)
                         .attr("height", h+padding);

   svgContainer.selectAll("path")
              .data(map.features)
              .enter()
              .append("path")
              .attr("d", path)
              .style('fill', '#179');

    circles = svgContainer.selectAll("circle")
                          .data(dataset)
                          .enter()
                          .append("circle")
                          .attr("cx", function(d) {
                            return projection(d[0])[0]
                           })
                          .attr("cy", function(d) {
                            return projection(d[0])[1]
                          })
                          .attr("r", function(d) {
                            return 2;
                          })
                          .attr('fill', function(d){
                            return colours[d[1][k]]
                          })

      centroids = svgContainer.selectAll(".centroid")
                            .data(centroids)
                            .enter()
                            .append("circle")
                            .attr('class', "centroid")
                            .attr("cx", function(d) {
                              console.log(d);
                              return projection(d[0])[0]
                             })
                            .attr("cy", function(d) {
                              return projection(d[0])[1]
                            })
                            .attr("r", '10')
                            .attr('stroke', function(d){
                              return colours[d[1][k]]
                            })
                            .attr('stroke-width', '5')
                            .attr('fill', 'none')


                            // border: 2px solid red;
                            // .attr('border-color', function(d){
                            //   return colours[d[1][k]]
                            // })
}
