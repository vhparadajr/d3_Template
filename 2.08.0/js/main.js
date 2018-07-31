/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/
var margin = {left:100, right :10, top:10, bottom:100}
var width = 600 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

var svg = d3.select("#chart-area").append("svg")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

var g =svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.json("data/buildings.json").then(function(data){
  data.forEach((d) =>{
    d.height = +d.height
  })


  var x = d3.scaleBand()
  .domain(data.map((d) =>{
    return d.name
  }))
  .range([0,height])
  .paddingInner(0.3)
  .paddingOuter(0.3)

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) =>{
      return d.height
    })])
    .range([0, height])

  var xAxisCall = d3.axisBottom(x)
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "Translate(0, " + height + ")")
    .call(xAxisCall)

  var yAxisCall = d3.axisLeft(y)
  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)


  var rect = g.selectAll("rect")
    .data(data)
    .enter()
    .append('rect')
      .attr('x', (d, i) =>{
        return x(d.name)
      })
      .attr('y', 20)
      .attr('width', x.bandwidth)
      .attr('height', (d) =>{
        return y(d.height)
      })
      .attr('rx', 0)
      .attr('ry', 0)
      .attr('stroke', 'black')
      .style('fill', (d) =>{
        if(d.name == "Lotte World Tower"){
          return "green"
        }else{
          return "red"
        }
      });
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
