var w = window.innerWidth
var h = 400;
var padding = 50;
var offset = 10;

var directory = 'data\\'
var file_2003 = 'data_2003.json'
var file_2015 = 'data_2015.json'
var dataset_2003 = null
var dataset_2015 = null
var selected = "2015"

console.log("Loading data from 2003..")
d3.json(directory+file_2003, function(error, data) {
  if (error) {
    console.log("Error while loading the data:\n"+error)
  } else {
    console.log("Data from 2003 has been loaded.");
    dataset_2003 = data

    console.log("Loading data from 2015..")
    d3.json(directory+file_2015, function(error, data) {
      if (error) {
        console.log("Error while loading the data:\n"+error)
      } else {
        console.log("Data from 2015 has been loaded.");
        dataset_2015 = data
        // dataset_2015
        initializeScatterPlot();
      }
    });
  }
});

d3.select("#changeYearButton")
  .on("click", function() {
      if(selected == "2003"){
        selected = "2015"
        updateScatterPlot(dataset_2015)
      } else {
        selected = "2003"
        updateScatterPlot(dataset_2003)
      }
  });



var updateScatterPlot = function(dataset){
  var data = getData(dataset)

  circles = svgContainerScatter.selectAll("circle")
                   .data(data)
                   .attr("cx", function(d) {
                       return scaleX(d[0][0]);
                   })
                   .attr("cy", function(d) {
                       return scaleY(d[0][1]);
                   })
                   .attr("r", function(d) {
                       var sum = d[0][0] + d[0][1]
                       return sum/total*100;
                   })

  labels = svgContainerScatter.selectAll(".crime-labels")
                     .data(data)
                     .text(function(d) {
                        return d[1];
                     })
                     .attr("x", function(d) {
                        return scaleX(d[0][0])+offset;
                     })
                     .attr("y", function(d) {
                        return scaleY(d[0][1])-offset;
                     })


   datasetLabel = svgContainerScatter.select("#label")
                           .text("Data from: "+selected)

}

var initializeScatterPlot = function(){
  var data_2003 = getData(dataset_2003)
  var data_2015 = getData(dataset_2015)
  data = data_2003.concat(data_2015)

  scaleY = d3.scaleLinear()
                 .domain([d3.min(data, function(d) { return d[0][1]; }), d3.max(data, function(d) { return d[0][1]; })])
                 .range([padding, h-padding])

  scaleX = d3.scaleLinear()
                  .domain([d3.min(data, function(d) { return d[0][0]; }), d3.max(data, function(d) { return d[0][0]; })])
                  .range([padding, w-padding*2])

  if(selected = "2015"){
      data_init = data_2015
      dataset = dataset_2015
  } else {
      data_init = data_2003
      dataset = dataset_2003
  }

  svgContainerScatter = d3.select("#scatterPlot").append("svg")
                                     .attr("width", w)
                                     .attr("height", h);

  circles = svgContainerScatter.selectAll("circle")
                        .data(data_init)
                        .enter()
                        .append("circle")
                        .attr("fill", "#001190")

  labels = svgContainerScatter.selectAll(".crime-labels")
                   .data(data_init)
                   .enter()
                   .append("text")
                   .attr("font-family", "sans-serif")
                   .attr("font-size", "12px")
                   .attr('class', "crime-labels")
                   .attr("fill", "#000");

  datasetLabel = svgContainerScatter.append("text")
                              .text("Data from: "+selected)
                              .attr("x", 10)
                              .attr("y", 20)
                              .attr("font-family", "sans-serif")
                              .attr("font-size", "12px")
                              .attr("id", 'label')
                              .attr("fill", "#001190")

   updateScatterPlot(dataset)

}
