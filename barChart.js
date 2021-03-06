var padding = 50;
var width = Math.min(window.innerWidth - padding, 1200)
var height = 400;
var offset = 10;
var barPadding = 10;

var directory = 'data\\'
var fileName = 'driving_under_influence.json'
var dataset = null
var noElements = 0
var total = 0

console.log("Loading data for driving under influence..")
d3.json(directory+fileName, function(error, data) {
  if (error) {
    console.log("Error while loading the data:\n"+error)
  } else {
    console.log("Data for driving under influence has been loaded.");
    dataset = data

    generateBarChart()
  }
});


var generateBarChart = function(){
  var tmp = getData(dataset)[0][0]
  var data = []
  noElements = Object.values(tmp).length
  for(var i=0; i<noElements; i++){
    data.push([i,tmp[i]])
    total += tmp[i]
  }
  var scaleY = d3.scaleLinear()
                 .domain([d3.min(data, function(d) { return d[1]; }), d3.max(data, function(d) { return d[1]; })])
                 .range([padding, height-padding])


   var svgContainer = d3.select("#barChart").append("svg")
                                      .attr("width", width)
                                      .attr("height", height+padding);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          var color = (d[1] / total)*24 > 0.5 ? "red" : "green";
          return "<span style='color:"+ color +"'>" + d[1] + "</span> crimes!"
        })

   svgContainer.call(tip);

   var bars = svgContainer.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return d[0] * (width / noElements);
        })
        .attr("y", function(d) {
            return height - scaleY(d[1])
        })
        .attr("width", function(d) {
           return (width / noElements - barPadding)
        })
        .attr("height", function(d) {
            return scaleY(d[1])
        })
        .attr("fill", function(d) {
            var blue = Math.round(d[1]/noElements*2)
            var green = Math.round(255-(d[1]/noElements*10))
            return "rgb( 0 ,"+ green +","+ blue +" )";
        })
        .on("mouseover", function(d) { tip.show(d, document.getElementById("head")) })
        .on("mouseout", tip.hide);


   var labels = svgContainer.selectAll(".barLabel")
         .data(data)
         .enter()
         .append("text")
         .text(function(d) {
            return d[0];
         })
         .attr("x", function(d) {
             return d[0] * (width / noElements) + (barPadding+5)/2
         })
         .attr("y", function(d) {
             return height+20
         })
         .attr("class", "barLabel")
         .attr("font-family", "sans-serif")
         .attr("font-size", "12px")

}
