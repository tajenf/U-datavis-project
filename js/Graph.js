class Graph {

    constructor(data, data2, data2Keys, Gender, Age_group, type) {

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
            .attr("stroke", "blue")
            .attr("stroke-width", 4);


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
            .attr("stroke", "green")
            .attr("stroke-width", 4);

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
        this.updateGraph2(data2, data2Keys, type);
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

        // console.log(filter_data2);

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

        this.drawLines1(filter_data, "#graph_path1");
        this.drawLines1(filter_data2, "#graph_path2");

        this.drawPoints1(filter_data, "#Hover_points1");
        this.drawPoints1(filter_data2, "#Hover_points2");

    }

    drawLegend1() {
        let svg1 = d3.select("#graph_svg1");

        //x-axis
        svg1.append("g").attr("transform", "translate(120, 420)")
            .call(d3.axisBottom(this.scaleX1).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg1.append("g").attr("transform", "translate(120,20)")
            .call(d3.axisLeft(this.scaleY1).ticks(10));
    }

    drawLines1(data, selectID) {
        let LineGenerator = d3
            .line()
            .x(d => this.scaleX1(d[0]))
            .y(d => this.scaleY1(d[1].suicides));

        d3.select(selectID)
            .data(data)
            .transition().duration(2000)
            .attr("d", LineGenerator(data));
    }

    drawPoints1(data, selectID) {

        let that = this;

        let point_group = d3.select(selectID);

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
    }




    updateGraph2(data2, data2Keys, type) {
        let filter_data;
        let filter_data2;
        let max_data;
        let max_yr;
        let min_yr;

        // console.log(data2);

        filter_data = data2[this.country1_select];
        filter_data2 = data2[this.country2_select];


        filter_data = Object.entries(filter_data);
        filter_data2 = Object.entries(filter_data2);

        let fill = filter_data.filter(d => d[1][type] != null);
        let fill2 = filter_data2.filter(d => d[1][type] != null);

        min_yr = fill[0][0];
        max_yr = fill[fill.length - 1][0];
        max_data = d3.max(fill, function(d) { return +d[1][type] });

        this.scaleY2 = d3.scaleLinear()
            .domain([max_data, 0])
            .range([0, 400]);

        this.scaleX2 = d3.scaleLinear()
            .domain([min_yr, max_yr])
            .range([0, 500]);

        this.drawLegend2();
        this.drawLines2(fill, "#graph_path3", type);
        this.drawLines2(fill2, "#graph_path4", type);
        this.drawPoints2(fill, "#Hover_points3", type);
        this.drawPoints2(fill2, "#Hover_points4", type);
    }

    drawLegend2() {

        let svg2 = d3.select("#graph_svg2");

        //x-axis
        svg2.append("g").attr("transform", "translate(120, 420)")
            .call(d3.axisBottom(this.scaleX2).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg2.append("g").attr("transform", "translate(120,20)")
            .call(d3.axisLeft(this.scaleY2).ticks(10));
    }

    drawLines2(data, selectID, type) {

        let LineGenerator = d3
            .line()
            .x(d => this.scaleX2(d[0]))
            .y(d => this.scaleY2(d[1][type]));

        d3.select(selectID)
            .data(data)
            .transition().duration(2000)
            .attr("d", LineGenerator(data));
    }

    drawPoints2(data, selectID, type) {

        let that = this;

        let point_group = d3.select(selectID);

        point_group.selectAll("circle")
            .data(data)
            .join(
                enter => {
                    enter
                        .append("circle")
                        .transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX2(d[0]))
                        .attr("cy", d => this.scaleY2(d[1][type]))
                },
                update => {
                    update.transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX2(d[0]))
                        .attr("cy", d => this.scaleY2(d[1][type]))
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
                    .append("text") /////////////////////////////////////////////////////////need to change the text of the hover points 
                    .text("Number of Suicides: " + Math.round(that.scaleY2.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX2.invert(current.attr("cx"))));
            })
            .on("mouseout", function() {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });
    }
}