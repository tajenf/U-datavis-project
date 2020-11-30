class Graph {

    constructor(data, data2, data2Keys, Gender, Age_group) {

        this.country1_select = "United States of America";
        this.country2_select = "United Kingdom";

        this.story;

        ///////////////////////////////////////////////////Graph 1/////////////////////////////////
        let graph_svg1 = d3.select('#graph')
            .append("svg")
            .attr("id", "graph_svg1")
            .attr("height", 500)
            .attr("width", 650);

        //Graph 1 Line
        graph_svg1.append("g")
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path1")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 4);

        //Graph 1 Hover points 
        graph_svg1.append("g")
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points1");

        //Graph 2 Line
        graph_svg1.append("g")
            .classed("hidden", false)
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path2")
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 4);

        //Graph 2 Hover points 
        graph_svg1.append("g")
            .classed("hidden", false)
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points2");

        ////////////////////////////////////////////////////////////////Graph 1 axies 
        //Graph 1 y-axis 
        graph_svg1.append("text")
            .attr("id", "axis-label-y1")
            .attr("transform", "translate(40, 200), rotate(-90)")
            .style("text-anchor", "middle")
            .text("Suicide Count");

        //Graph 1 x-axis 
        graph_svg1.append("text")
            .attr("id", "axis-label-x1")
            .attr("transform", "translate(330, 470)")
            .style("text-anchor", "middle")
            .text("Years");

        // //Display 
        // graph_svg1.append("g")
        //     .attr("id", "Graph-Info_1")
        //     .append("text")
        //     .attr("transform", "translate(330, 490)")
        //     .style("text-anchor", "middle")
        //     .text("Country: " + country_name + ",  Gender: " + Gender + ",  Age: " + Age_group);

        ///////////////////////////////////////////////Graph2 ///////////////////////////////////////////////////////////////////////
        let graph_svg2 = d3.select('#graph')
            .append("svg")
            .attr("id", "graph_svg2")
            .attr("height", 500)
            .attr("width", 650);

        //Graph 3 Line
        graph_svg2.append("g")
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path3")
            .attr("fill", "none")
            .attr("stroke", "black");

        //Graph 3 Hover points 
        graph_svg2.append("g")
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points3");


        //Graph 4 Line
        graph_svg2.append("g")
            .classed("hidden", false)
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path4")
            .attr("fill", "none")
            .attr("stroke", "black");

        //Graph 4 Hover points 
        graph_svg2.append("g")
            .classed("hidden", false)
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points4");


        ////////////////////////////////////////////////////Graph 2 axies 
        //Graph 2 y-axis 
        graph_svg2.append("text")
            .attr("id", "axis-label-y2")
            .attr("transform", "translate(40, 200), rotate(-90)")
            .style("text-anchor", "middle")
            .text("placeholder");

        //Graph 2 x-axis 
        graph_svg2.append("text")
            .attr("id", "axis-label-x2")
            .attr("transform", "translate(330, 470)")
            .style("text-anchor", "middle")
            .text("Years");

        // //Display 
        // graph_svg2.append("g")
        //     .attr("id", "Graph-Info_2")
        //     .append("text")
        //     .attr("transform", "translate(330, 490)")
        //     .style("text-anchor", "middle")
        //     .text("Country: " + country_name + ",  Gender: " + Gender + ",  Age: " + Age_group);


        this.updateGraph(data, Gender, Age_group);
        this.updateGraph2(data2, data2Keys);
    }

    updateGraph(data, Gender, Age_group) {

        let filter_data;
        let filter_data2;
        let max_sui;
        let max_yr;
        let min_yr;

        // if (country_name != null && Gender == "both" && Age_group == "all") {
        filter_data = data[this.country1_select][Gender][Age_group];
        filter_data2 = data[this.country2_select][Gender][Age_group];

        console.log(filter_data2);

        filter_data = Object.entries(filter_data);
        filter_data2 = Object.entries(filter_data2);


        min_yr = filter_data[0][0];
        max_yr = filter_data[filter_data.length - 1][0];
        max_sui = d3.max(filter_data, function(d) { return +d[1].suicides });

        // console.log(filtata);
        // let a = Object.entries(filtata);
        // console.log(a);
        // console.log(a[0][0]);
        // console.log(a[a.length - 1][0]);
        // let max = d3.max(a, function(d) { return +d[1].suicides });
        // console.log(max);


        // } else if (Gender != "both" && Age_group != "all") {
        // filter_data = data.filter(d => ((d.country == country_name) && (d.sex == "female") && (d.age == "5-14 years")));

        // max_sui = d3.max(filter_data, function(d) { return +d.suicides_no });
        // max_yr = d3.max(filter_data, function(d) { return d.year });
        // min_yr = d3.min(filter_data, function(d) { return d.year });
        // }

        this.scaleY1 = d3.scaleLinear()
            .domain([max_sui, 0])
            .range([0, 400]);

        this.scaleX1 = d3.scaleLinear()
            .domain([min_yr, max_yr])
            .range([0, 500]);

        this.drawLegend1();
        this.drawLines1(filter_data, filter_data2, 1);
        this.drawPoints1(filter_data, filter_data2, 1);
    }

    updateGraph2(data2, data2Keys) {
        console.log(data2);
        console.log(data2Keys);

    }

    drawLegend1() {

        let svg1 = d3.select("#graph_svg1");

        //x-axis
        svg1.append("g").attr("transform", "translate(120, 420)")
            .call(d3.axisBottom(this.scaleX1).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg1.append("g").attr("transform", "translate(120,20)")
            .call(d3.axisLeft(this.scaleY1).ticks(10));


        let svg2 = d3.select("#graph_svg2");

        //x-axis
        svg2.append("g").attr("transform", "translate(120, 420)")
            .call(d3.axisBottom(this.scaleX1).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg2.append("g").attr("transform", "translate(120,20)")
            .call(d3.axisLeft(this.scaleY1).ticks(10));
    }

    drawLines1(data, data2, graphN) {

        console.log(data);
        console.log(data2);


        let LineGenerator = d3
            .line()
            .x(d => this.scaleX1(d[0]))
            .y(d => this.scaleY1(d[1].suicides));

        d3.select("#graph_path1")
            .data(data)
            .transition().duration(2000)
            .attr("d", LineGenerator(data));

        d3.select("#graph_path2")
            .data(data2)
            .transition().duration(2000)
            .attr("d", LineGenerator(data2));



        // let LineGenerator2 = d3
        //     .line()
        //     .x(d => this.scaleX(d.year))
        //     .y(d => this.scaleY(d.suicides_no));

        // d3.select("#graph_path2")
        //     .data(data)
        //     .transition().duration(2000)
        //     .attr("d", LineGenerator2(data));
    }

    drawPoints1(data, data2, graphN) {

        let that = this;

        let point_group = d3.select("#Hover_points1");

        point_group.selectAll("circle")
            .data(data)
            .join(
                enter => {
                    enter
                        .append("circle")
                        .transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX1(d[0]))
                        .attr("cy", d => this.scaleY1(d[1].suicides))
                },
                update => {
                    update.transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX1(d[0]))
                        .attr("cy", d => this.scaleY1(d[1].suicides))
                },
                exit => {
                    exit.remove();
                }
            );

        point_group.selectAll("circle")
            .data(data)
            .on("mouseover", function(d) {
                let current = d3.select(this);
                current.attr("class", "hovered");
                let current_title = current.append("title");
                current_title
                    .append("text")
                    .text("Number of Suicides: " + Math.round(that.scaleY1.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX1.invert(current.attr("cx"))));
            })
            .on("mouseout", function() {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });

        point_group = d3.select("#Hover_points2");


        point_group.selectAll("circle")
            .data(data2)
            .join(
                enter => {
                    enter
                        .append("circle")
                        .transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX1(d[0]))
                        .attr("cy", d => this.scaleY1(d[1].suicides))
                },
                update => {
                    update.transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX1(d[0]))
                        .attr("cy", d => this.scaleY1(d[1].suicides))
                },
                exit => {
                    exit.remove();
                }
            );

        point_group.selectAll("circle")
            .data(data2)
            .on("mouseover", function(d) {
                let current = d3.select(this);
                current.attr("class", "hovered");
                let current_title = current.append("title");
                current_title
                    .append("text")
                    .text("Number of Suicides: " + Math.round(that.scaleY1.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX1.invert(current.attr("cx"))));
            })
            .on("mouseout", function() {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });
    }
}