class Graph {

    constructor(data, data2, country_name, Gender, Age_group, compare) {

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
            .attr("stroke", "black");

        //Graph 1 Hover points 
        graph_svg1.append("g")
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points1");

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

        //Display 
        graph_svg1.append("g")
            .attr("id", "Graph-Info_1")
            .append("text")
            .attr("transform", "translate(330, 490)")
            .style("text-anchor", "middle")
            .text("Country: " + country_name + ",  Gender: " + Gender + ",  Age: " + Age_group);

        ///////////////////////////////////////////////Graph2 
        let graph_svg2 = d3.select('#graph')
            .append("svg")
            .attr("id", "graph_svg2")
            .attr("height", 500)
            .attr("width", 650)
            .classed("hidden", false);

        //Graph 2 Line
        graph_svg2.append("g")
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path2")
            .attr("fill", "none")
            .attr("stroke", "black");

        //Graph 2 Hover points 
        graph_svg2.append("g")
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points2");

        //Graph 2 y-axis 
        graph_svg2.append("text")
            .attr("id", "axis-label-y2")
            .attr("transform", "translate(40, 200), rotate(-90)")
            .style("text-anchor", "middle")
            .text("Suicide Count");

        //Graph 2 x-axis 
        graph_svg2.append("text")
            .attr("id", "axis-label-x2")
            .attr("transform", "translate(330, 470)")
            .style("text-anchor", "middle")
            .text("Years");

        //Display 
        graph_svg2.append("g")
            .attr("id", "Graph-Info_2")
            .append("text")
            .attr("transform", "translate(330, 490)")
            .style("text-anchor", "middle")
            .text("Country: " + country_name + ",  Gender: " + Gender + ",  Age: " + Age_group);


        this.updateGraph(data, data2, country_name, Gender, Age_group, compare);
    }

    updateGraph(data, data2, country_name, Gender, Age_group, compare) { //}, compare, country_name2, Gender2, Age_group2) {

        let filter_data = null;

        // if (country_name == "World" && Gender == "both" && Age_group == "all") {

        // }

        // console.log(data2);
        // console.log(data2["World"]["female"]);

        // else if (country_name != "world" && Gender != "both" && Age_group != "all") {
        filter_data = data.filter(d => ((d.country == country_name) && (d.sex == "female") && (d.age == "5-14 years")));
        // }
        // //will need more checkers 
        // console.log(data);
        // console.log(filter_data);

        let max_sui = d3.max(filter_data, function(d) { return +d.suicides_no });
        let max_yr = d3.max(filter_data, function(d) { return d.year });
        let min_yr = d3.min(filter_data, function(d) { return d.year });

        this.scaleY = d3.scaleLinear()
            .domain([max_sui, 0])
            .range([0, 400]);

        this.scaleX = d3.scaleLinear()
            .domain([min_yr, max_yr])
            .range([0, 500]);

        this.drawLegend();
        this.drawLines(filter_data, filter_data);
        this.drawPoints(filter_data, filter_data);
    }

    drawLegend() {

        let svg1 = d3.select("#graph_svg1");

        //x-axis
        svg1.append("g").attr("transform", "translate(120, 420)")
            .call(d3.axisBottom(this.scaleX).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg1.append("g").attr("transform", "translate(120,20)")
            .call(d3.axisLeft(this.scaleY).ticks(10));


        let svg2 = d3.select("#graph_svg2");

        //x-axis
        svg2.append("g").attr("transform", "translate(120, 420)")
            .call(d3.axisBottom(this.scaleX).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg2.append("g").attr("transform", "translate(120,20)")
            .call(d3.axisLeft(this.scaleY).ticks(10));
    }

    drawLines(data, data2) {

        let LineGenerator1 = d3
            .line()
            .x(d => this.scaleX(d.year))
            .y(d => this.scaleY(d.suicides_no));

        d3.select("#graph_path1")
            .data(data)
            .transition().duration(2000)
            .attr("d", LineGenerator1(data));

        let LineGenerator2 = d3
            .line()
            .x(d => this.scaleX(d.year))
            .y(d => this.scaleY(d.suicides_no));

        d3.select("#graph_path2")
            .data(data)
            .transition().duration(2000)
            .attr("d", LineGenerator2(data));
    }

    drawPoints(data, data2) {

        let that = this;
        let point_group1 = d3.select("#Hover_points1");

        point_group1.selectAll("circle")
            .data(data)
            .join(
                enter => {
                    enter.append("circle")
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX(d.year))
                        .attr("cy", d => this.scaleY(d.suicides_no))
                },
                update => {
                    update.transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX(d.year))
                        .attr("cy", d => this.scaleY(d.suicides_no))
                },
                exit => {
                    exit.remove();
                }
            );

        point_group1.selectAll("circle")
            .data(data)
            .on("mouseover", function(d) {
                let current = d3.select(this);
                current.attr("class", "hovered");
                let current_title = current.append("title");
                current_title
                    .append("text")
                    .text("Number of Suicides: " + Math.round(that.scaleY.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX.invert(current.attr("cx"))));
            })
            .on("mouseout", function() {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });






        let point_group2 = d3.select("#Hover_points2");

        point_group2.selectAll("circle")
            .data(data)
            .join(
                enter => {
                    enter.append("circle")
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX(d.year))
                        .attr("cy", d => this.scaleY(d.suicides_no))
                },
                update => {
                    update.transition()
                        .attr("r", "4")
                        .attr("cx", d => this.scaleX(d.year))
                        .attr("cy", d => this.scaleY(d.suicides_no))
                },
                exit => {
                    exit.remove();
                }
            );

        point_group2.selectAll("circle")
            .data(data)
            .on("mouseover", function(d) {
                let current = d3.select(this);
                current.attr("class", "hovered");
                let current_title = current.append("title");
                current_title
                    .append("text")
                    .text("Number of Suicides: " + Math.round(that.scaleY.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX.invert(current.attr("cx"))));
            })
            .on("mouseout", function() {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });
    }
}