var padding = 50;
var widthGeo = window.innerWidth - padding
var heightGeo = 600;

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
        tmp = getDataGeo(data)
        dataset = tmp["data"]
        centroids = tmp["centroids"]
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
  circlesGeo = svgContainerGeo.selectAll("circle")
                        .data(dataset)
                        .attr('fill', function(d){
                          if(k==-1)
                            return "white"
                          else
                            return colours[d[1][k]]
                        })


   svgContainerGeo.selectAll(".centroid").remove()
   if( k != -1)
     centroidCirclesGeo = svgContainerGeo.selectAll(".centroid")
                                    .data(centroids[k])
                                    .enter()
                                    .append("circle")
                                    .attr('class', "centroid")
                                    .attr("cx", function(d) {
                                      return projection(d)[0]
                                     })
                                    .attr("cy", function(d) {
                                      return projection(d)[1]
                                    })
                                    .attr("r", '10')
                                    .attr('fill', function(d,i){
                                      return colours[i]
                                    })
                                    .attr('stroke-width', '3')
                                    .attr('stroke', 'black')
}


var plotMap = function(){
  projection = d3.geoAlbersUsa().fitSize([widthGeo, heightGeo], map);
  path.projection(projection)

  svgContainerGeo = d3.select("#map").append("svg")
                         .attr("width", widthGeo)
                         .attr("height", heightGeo+padding);

   svgContainerGeo.selectAll("path")
              .data(map.features)
              .enter()
              .append("path")
              .attr("d", path)
              .style('fill', function(d,i){
                // We could create a scheme with pale colours and use diff. colour for each distric
                  return '#179'
              });

    circlesGeo = svgContainerGeo.selectAll("circle")
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
                            return 'white'
                          })
}
