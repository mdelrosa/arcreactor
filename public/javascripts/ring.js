//ring.js

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20b();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 110)
    .outerRadius(radius - 20);

var arc2 = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 10);

var svg = d3.select(".chord").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


function renderRing(beats) {
    console.log('here')
    var path = svg.selectAll("path")
        .data(pie(beats))
        .enter().append("path")
        .attr("fill", function(d, i) {return color(beats[i])})
        .attr("base_color", function(d, i) { return color(beats[i]); })
        .attr("d", arc)
}

var path = svg.selectAll("path")
    // .data(pie(dataset.counts))
    // .enter().append("path")
    // .attr("fill", function(d, i) {return color(dataset.counts[i])})
    // .attr("base_color", function(d, i) { return color(dataset.counts[i]); })
    // .attr("d", arc)
    // // .attr("url_string", function(d, i) { return dataset.urls[i];})
    // // .attr("name", function(d, i) { return dataset.names[i]; })
    // .attr("count", function(d, i) { return dataset.counts[i]; })
    .on("mouseover", function(){
            d3.select(this).style("fill", "#DDDDDD");
            // var artist = $(this).attr("name");
            // var count = $(this).attr("count");
            // $(".artist").html("<b>" + artist + ": " + count + " listens<b>");
        })
    .on("mouseout", function(){
        d3.select(this).style("fill", function() { return d3.select(this).attr("base_color"); });
        // $(".artist").html("");
    })
    .on("click", function(){
        // var url = d3.select(this).attr('url_string');
        // console.log("Click captured.")
        // window.location = url;
    });