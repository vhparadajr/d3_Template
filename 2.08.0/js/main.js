/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/
var svg = d3.select("#chart-area").append("svg")
    .attr('width', '500')
    .attr('height', '500')


d3.json("data/buildings.json").then((data) =>{
  data.forEach((d) =>{
    d.height = +d.height
  })
  var x = d3.scaleBand()
  .domain(["Burj Khalifa", "Shanghai Tower", "Abraj Al-Bait Clock Tower", "Ping An Finance Centre", "Lotte World Tower", "One World Trade Center", "Guangzhou CTF Finance Center"])
  .range([0,400])
  .paddingInner(0.3)
  .paddingOuter(0.3)



  var y = d3.scaleLinear()
    .domain([0, 828])
    .range([0, 400])

  var rect = svg.selectAll("rect")
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
          return "blue"
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
