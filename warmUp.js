var dataset = [ 5, 10, 15, 20, 25 ];

d3.select("#warmup").selectAll("p")
  .data(dataset)
  .enter()
  .append("p")
  .text(function(d) {
    return "I can count up to " + d;
  })
  .style("color", function(d) {
  if (d > 15) {	//Threshold of 15
    return "red";
  } else {
    return "black";
  }
});


var jsonRects = [
  { 'x':0,   'y':80, 'width':80, 'height':80, 'fill':"purple", 'stroke':"gray",  'stroke_width':2, 'opacity':0.9 },
  { 'x':50,  'y':60, 'width':80, 'height':80, 'fill':"blue", 'stroke':"gray",  'stroke_width':2, 'opacity':0.8 },
  { 'x':100,  'y':40, 'width':80, 'height':80, 'fill':"green", 'stroke':"gray",  'stroke_width':2, 'opacity':0.7 },
  { 'x':150, 'y':20, 'width':80, 'height':80, 'fill':"yellow", 'stroke':"gray",  'stroke_width':2, 'opacity':0.6 },
  { 'x':200, 'y':0,  'width':80, 'height':80, 'fill':"red", 'stroke':"gray",  'stroke_width':2, 'opacity':0.5 }
];

var svgContainer = d3.select("#warmup").append("svg")
                                  .attr("width", 300)
                                  .attr("height", 300);

var circles = svgContainer.selectAll("rect")
                                  .data(jsonRects)
                                  .enter()
                                  .append("rect");

var circleAttributes = circles
               .attr("x", function (d) { return d.x; })
               .attr("y", function (d) { return d.y; })
               .attr("width", function (d) { return d.width; })
               .attr("height", function (d) { return d.height; })
               .attr("stroke", function (d) { return d.stroke; })
               .attr("stroke-width", function (d) { return d.stroke_width; })
               .attr("fill-opacity", function (d) { return d.opacity; })
               .style("fill", function(d) { return d.fill; });
