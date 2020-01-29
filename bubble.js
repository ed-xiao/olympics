// import * as d3 from "d3";

// Russia = combined counts for Soviet Union, Russian Empire, Russia, Unified Team
// Germany = combined counts for West Germany, East Germany, United Team of Germany, Germany, Saar
// Serbia = combined counts for Yugoslavia, Independent Olympic Participants, Serbia and Montenegro


document.addEventListener("DOMContentLoaded", function(){
    const root = document.getElementById('root');
    // root.textContent = 'This is new text';
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
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", height + 37)
        .text("GDP per capita, PPP & inflation-adjusted (USD)");

    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "middle")
      .attr("y", -47)
      .attr("x", -height/2)
    //   .attr("dy", ".75em, 1.5em, 2.5em, 3.5em")
      .attr("transform", "rotate(-90)")
      .text("Total Summer Olympic Medal Count");

    // Add year label
    var label = svg
      .append("text")
      .attr("class", "year-label")
    //   .attr("text-anchor", "end")
      .attr("y", height - 24)
      .attr("x", width - 225)
      .text(1896);

    //works only in livewatch
    // d3.csv("/data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv", function(gdp) {
    //     console.log(gdp)
    // });
    // d3.array("")

    // didn't work
    // d3.json("/data/nations.json", function(data) {
    //     console.log("hello")
    // });

    // d3.json("/data/nations.json").then(function (data) {
    //     console.log(data[0]);
    // });

    Promise.all([
        // d3.json("/data/nations.json"),
        // d3.csv("/data/income.csv"),
        // d3.csv("/data/population.csv"),
        d3.json("/data/combined.json")
    ]).then(function (data) {
        console.log(data[0][0])  // first row of combined
        console.log(data[0][100])  // first row of combined
        // console.log(data[0][0])  // first row of income
        // console.log(data[1][0])  // first row of population
        // console.log(data[2][0])  // first row of combined
        
        
        ////// second merging of population data into merged dataset
        // const combined = data[2];
        // const populations = data[1];
        // populations.forEach(popObj => {
        //     let population = [];
        //     let country = '';
        //     Object.keys(popObj).forEach(key => {
        //         if (key !== "country") {
        //             population.push([parseInt(key), parseInt(popObj[key])])
        //         } else {
        //             country = popObj[key];
        //         }
        //     })
        //     // console.log(population)
        //     combined.forEach(countryObj => {
        //         if (countryObj.name === country) {
        //             countryObj.population = population;
        //         }
        //     })
        // });

        //////////////////////////////////
        //   first functions to create first version of combined with only income data
        // const incomes = data[0];
        // let merged = [];

        // incomes.forEach(incomeObj => {
        //     let obj = {};
        //     obj.income = [];
        //     Object.keys(incomeObj).forEach(key => {
        //         if (key === "country") {
        //             obj.name = incomeObj[key]
        //         } else {
        //             obj.income.push([parseInt(key), parseInt(incomeObj[key])])
        //         }
        //     })
        //     merged.push(obj);
        // })
        // console.log(merged)

        //////////////////////////////////////////
        //to download newly created JSON object
        // function download(content, fileName, contentType) {
        //     var a = document.createElement("a");
        //     var file = new Blob([content], { type: contentType });
        //     a.href = URL.createObjectURL(file);
        //     a.download = fileName;
        //     a.click();
        // }
        // download(JSON.stringify(combined), 'json.txt', 'text/plain');

    });
})