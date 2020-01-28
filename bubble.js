// import * as d3 from "d3";

// Russia = combined counts for Soviet Union, Russian Empire, Russia, Unified Team
// Germany = combined counts for West Germany, East Germany, United Team of Germany, Germany, Saar
// Serbia = combined counts for Yugoslavia, Independent Olympic Participants, Serbia and Montenegro

document.addEventListener("DOMContentLoaded", function(){
    const root = document.getElementById('root');
    root.textContent = 'This is new text';
    // d3.select("div").style("color", "blue");

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 20, bottom: 100, left: 100},
        width = 1200 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#root")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var xAxis = d3.scaleLinear()
        .domain([0, 10000])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis));

    // Add Y axis
    var yAxis = d3.scaleLinear()
        .domain([0, 3000])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(yAxis));

    // Add x-axis label.
    svg.append("text")
        // .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", height + 37)
        .text("GDP per capita, PPP & inflation-adjusted (USD)");

    // Add y-axis label
    svg
      .append("text")
    //   .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("y", -47)
      .attr("x", -height/2)
    //   .attr("dy", ".75em, 1.5em, 2.5em, 3.5em")
      .attr("transform", "rotate(-90)")
      .text("Total Summer Olympic Medal Count");

    // d3.csv("income_per_person_gdppercapita_ppp_inflation_adjusted.csv", function(data) {
    // });
})