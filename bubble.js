// import * as d3 from "d3";

// Russia = combined counts for Soviet Union, Russian Empire, Russia, Unified Team
// Germany = combined counts for West Germany, East Germany, United Team of Germany, Germany, Saar(didn't find)
// Serbia = combined counts for Yugoslavia, Independent Olympic Participants, Serbia and Montenegro
// China = Hong Kong
// Kuwait = Independent Olympic Athletes 
// UK = Bermuda
// Sri Lanka = Ceylon

document.addEventListener("DOMContentLoaded", function(){
    // const root = document.getElementById('root');
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
    // var xAxis = d3.scaleLinear()
    var xAxis = d3.scaleLog([200, 2e5], [0, width])
        // .ticks(12, d3.format(",d"))  //doesn't work
        // .domain([0, 100000])
        // .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis).ticks(width / 80, ","));

    // Add Y axis
    var yAxis = d3.scaleLinear()
        // .domain([0, 3000])
        .domain([0, 2000000000])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(yAxis));

    // Add x-axis label
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 5)
        .text("GDP per capita, PPP & inflation-adjusted (USD)");

    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("y", 20)
      .attr("x", 0)
    //   .attr("dy", ".75em, 1.5em, 2.5em, 3.5em")
      .attr("transform", "rotate(-90)")
      .text("Total Summer Olympic Medal Count");

    // Add year label
    var yearLabel = svg
      .append("text")
      .attr("class", "year-label")
    //   .attr("text-anchor", "end")
      .attr("y", height - 24)
      .attr("x", width - 225)
      .text(1896);

    function getValue(values, year) {
        const idx = bisectYear(values, year, 0, values.length - 1);
        const arr = values[idx];

        // data smoothing with weighting if year is not found
        // if (idx > 0) {
        //     const backArray = values[idx - 1];
        //     const t = (year - arr[0]) / (backArray[0] - arr[0]);
        //     return arr[1] * (1 - t) + backArray[1] * t;
        // }
        return arr[1];
    }

    //return bisector of array with year and value
    bisectYear = d3.bisector(([year]) => year).left

    Promise.all([
        // d3.json("/data/nations.json"),
        // d3.csv("/data/income.csv"),
        // d3.csv("/data/population.csv"),
        d3.json("/data/combined.json"),
        // d3.csv("/data/country_codes.csv"),
        d3.csv("olympic_data_copy.csv")
    ]).then(function (data) {
        // console.log(data[0][0])  // first row of combined
        // console.log(data[0][0])  // first row of income
        // console.log(data[1])  // first row of population
        // console.log(data[2][0])  // first row of combined
        console.log(data[2])
        const combined = data[0];
        const olympic = data[1];

        //find missing countries
        olympic.forEach(country => {
            let found = false;
            combined.forEach(code => {
                if (country.Nation === code.name) {
                    found = true;
                }
            })
            if (found === false) {
                console.log(country.Nation)
            }
        })

        function getData(year) {
            return data[0].map(country => ({
                name: country.name,
                // region: country.region,
                income: getValue(country.income, year),
                population: getValue(country.population, year)
                // lifeExpectancy: valueAt(country.lifeExpectancy, year)
            }));
        }

        // x = d3.scaleLog([200, 1e5], [margin.left, width - margin.right])
        // y = d3.scaleLinear([14, 86], [height - margin.bottom, margin.top])
        radius = d3.scaleSqrt([0, 5e8], [0, width / 24])

        // svg.append('circle')
        //     .attr('cx', 100)
        //     .attr('cy', 100)
        //     .attr('r', 50)
        //     .attr('stroke', 'black')
        //     .attr('fill', '#69a3b2');

        const circle = svg.append("g")
            .attr("stroke", "black")
            .selectAll("circle")
            .data(getData(1896), d => d.name)
        .join("circle")
        .sort((a, b) => d3.descending(a.population, b.population))
        .attr("cx", d => xAxis(d.income))
        .attr("cy", d => yAxis(d.population))
        .attr("r", d => radius(d.population))
        // .attr("fill", d => color(d.region))
        .attr("fill", '#69a3b2')
        .call(circle => circle.append("title")
        //     .text(d => [d.name, d.region].join("\n")));
            .text(d => [d.name, d.region].join("\n")));
        // console.log(circle);

        //update function
        const update = (year) => {
            circle
                .data(getData(year), d => d.name)
                .sort((a, b) => d3.descending(a.population, b.population))
                .transition()
                .duration(500)
                .attr("cx", d => xAxis(d.income))
                .attr("cy", d => yAxis(d.population))
                .attr("r", d => radius(d.population))
            // console.log(yearLabel);
            yearLabel.text(year);
            // d3.select("text").text("dataset" + dataIndex);
        }

        const slider = d3.select("#year-slider")

        // console.log(slider.property("value"))
        
        slider.on("mousemove", function () {
            update(this.value);
        })
        const updateSlider = () => {
            // console.log(slider.property("value"))
            let currentYear = slider.property("value")
            slider.property("value", parseInt(currentYear)+1);
            update(slider.property("value"));
        }
        //autoplay on load
        let moveSlider = setInterval(updateSlider, 500);
        const clearPlay = () => {clearInterval(moveSlider)};
        //clear interval after 100 seconds
        setTimeout(clearPlay, 100000)
        const button = d3.select("button");
        slider.on("click", () => {
            clearPlay();
            // console.log(d3.select("button").property("innerHTML"))
            button.property("innerHTML","Play")
            update(slider.property("value"));
        });
        button.on("click", () => {
            if (button.property("innerHTML") === "Play") {
                moveSlider = setInterval(updateSlider, 500);
                button.property("innerHTML", "Pause");
            } else {
                clearPlay();
                button.property("innerHTML", "Play");
            }
        });

        // var dot = svg.append("g")
        //     .attr("class", "dots")
        //     .selectAll(".dot")
        //     .data(getData(1800))
        //     .enter().append("circle")
        //     // Add additional class with region name of currently added circle. 
        //     .attr("class", function (d) { return "dot " + regionScale(d.Region); })
        //     .style("fill", function (d) { return colorScale(d.Region); })
            // .call(position)
        //     .sort(order)
        //     .on("mouseover", fadeChart);	

        //find missing countries
        // combined.forEach(country => {
        //     let found = false;
        //     countryCode.forEach(code => {
        //         if (country.name === code.Country) {
        //             found = true;
        //         }
        //     })
        //     if (found === false) {
        //         console.log(country.name)
        //     }
        // })
        
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

// Countries missing in IOC data but in country data
// Kiribati
// Marshall Islands
// Montenegro
// South Sudan
// Tuvalu