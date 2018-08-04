/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/
var margin = {left:100, right:10, top:10, bottom:100}
var width = 600 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

var svg = d3.select("#chart-area").append("svg")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

var g =svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var parseTime = d3.timeParse("%Y-%m-%d%H:%M:%S");
  console.log(parseTime("2016-09-1013:53:24"))
// var parseTime = d3.timeParse("%H:%M:%S");
//   console.log(parseTime("13:53:24"))

d3.json("data/revenue.json").then(function(data){
  data.forEach((d) =>{
    d.updated = parseTime(d.updated);
    d.revenuePerDay = parseFloat(d.revenuePerDay.slice(1));
  })

  var x = d3.scaleTime()
  .range([0,width])


  var y = d3.scaleLinear()
    .range([height, 0])


  // define the line
  var valueline = d3.line()
    .x(function(d) { return x(d.updated); })
    .y(function(d) { return y(d.revenuePerDay); });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.updated; }));
  y.domain([0, d3.max(data, function(d) { return d.revenuePerDay; })]);


  var xAxisCall = d3.axisBottom(x);
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxisCall);

  var yAxisCall = d3.axisLeft(y);
    g.append("g")
      .attr("class", "y axis")
      .call(yAxisCall);

    // Add the valueline path.
   g.append("path")
       .data([data])
       .attr("class", "line")
       .attr("d", valueline);
}).catch((error) =>{
  console.log(error)
})



  // var cirles = svg.selectAll("circle")
  //   .data(data);
  //
  // circles.enter()
  //     .append('circle')
  //     .attr('cx', (d, i) =>{
  //       console.log(d)
  //       return (i * 50) + 25
  //     })
  //     .attr('cy', 25)
  //     .attr('r', (d) => {
  //       return d.height / 15;
  //     })
  //     .style('fill', (d) =>{
  //       if(d.name == "Lotte World Tower"){
  //         return "blue"
  //       }else{
  //         return "red"
  //       }
  //     });
