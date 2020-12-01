class Graph {

    constructor(data, data2, data2Keys, Gender, type) {

        this.data = data;
        this.data2 = data2;
        this.type = type;
        this.country1_select = "United States of America";
        this.country2_select = "Jamaica";
        this.Gender = Gender;
        // this.age_group = Age_group;

        this.age_map = new Map([
            ["5-14 years", ["5-14 years", 1]],
            ["15-24 years", ["15-24 years", 1]],
            ["25-34 years", ["25-34 years", 1]],
            ["35-54 years", ["35-54 years", 1]],
            ["55-74 years", ["55-74 years", 1]],
            ["75+ years", ["75+ years", 1]]
        ]);

        ///////////////////////////////////////////////////Graph 1/////////////////////////////////
        let graph_svg1 = d3.select('#graph')
            .append("svg")
            .attr("id", "graph_svg1")
            .attr("height", 500)
            .attr("width", 650);

        //Graph 1 Line
        graph_svg1.append("g")
            .attr("id", "path_group1")
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
            .attr("id", "path_group2")
            .classed("hidden", true)
            .classed("visible", false)
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path2")
            .attr("fill", "none")
            .attr("stroke", "purple")
            .attr("stroke-width", 4);

        //Graph 2 Hover points 
        graph_svg1.append("g")
            .classed("hidden", true)
            .classed("visible", false)
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points2");

        ////////////////////////////////////////////////////////////////Graph 1 axies 
        //Graph 1 y-axis 
        graph_svg1.append("text")
            .attr("id", "axis-label-y1")
            .attr("transform", "translate(40, 200), rotate(-90)")
            .style("text-anchor", "middle")
            .text("SUICIDE COUNT");

        //Graph 1 x-axis 
        graph_svg1.append("text")
            .attr("id", "axis-label-x1")
            .attr("transform", "translate(370, 470)")
            .style("text-anchor", "middle")
            .text("YEARS");

        ///////////////////////////////////////////////Graph2 ///////////////////////////////////////////////////////////////////////
        let graph_svg2 = d3.select('#graph')
            .append("svg")
            .attr("id", "graph_svg2")
            .attr("height", 500)
            .attr("width", 650);

        //Graph 3 Line
        graph_svg2.append("g")
            .attr("id", "path_group3")
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path3")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 4);

        //Graph 3 Hover points 
        graph_svg2.append("g")
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points3");

        //Graph 4 Line
        graph_svg2.append("g")
            .attr("id", "path_group4")
            .classed("hidden", true)
            .classed("visible", false)
            .attr("transform", "translate(120,20)")
            .append("path")
            .attr("id", "graph_path4")
            .attr("fill", "none")
            .attr("stroke", "purple")
            .attr("stroke-width", 4);

        //Graph 4 Hover points 
        graph_svg2.append("g")
            .classed("hidden", true)
            .classed("visible", false)
            .attr("transform", "translate(120,20)")
            .attr("id", "Hover_points4");


        ////////////////////////////////////////////////////Graph 2 axies 
        //Graph 2 y-axis 
        graph_svg2.append("text")
            .attr("id", "axis-label-y2")
            .attr("transform", "translate(40, 200), rotate(-90)")
            .style("text-anchor", "middle")
            .text(type.toUpperCase());

        //Graph 2 x-axis 
        graph_svg2.append("text")
            .attr("id", "axis-label-x2")
            .attr("transform", "translate(370, 470)")
            .style("text-anchor", "middle")
            .text("YEARS");

        this.drawLegend1();
        this.drawLegend2();
        this.updateGraph2("none", 0);
    }


    updateGraph(type, value) {
        console.log("i was called");
        console.log(type + " " + value);

        let that = this;

        if (type == "country1") {
            console.log("in c1 if");
            this.country1_select = value;
            console.log(this.country1_select);
            console.log(this.country2_select);
        } else if (type == "country2") {
            console.log("in c222222222 if");
            this.country2_select = value;
        } else if (type == "age" && value != "all") {
            this.age_map = value;
        } else if (type == "sex") {
            this.Gender = value;
        }

        let filter_data;
        let filter_data2;
        let max_sui;
        let max_yr;
        let min_yr;

        let val1 = this.age_map.get("5-14 years")[1];
        let val2 = this.age_map.get("15-24 years")[1];
        let val3 = this.age_map.get("25-34 years")[1];
        let val4 = this.age_map.get("35-54 years")[1];
        let val5 = this.age_map.get("55-74 years")[1];
        let val6 = this.age_map.get("75+ years")[1];

        if (this.Gender == "both" && val1 == 1 && val2 == 1 && val3 == 1 && val4 == 1 && val5 == 1 && val6 == 1) {
            filter_data = Object.entries(this.data[this.country1_select][this.Gender]["all"]);
            filter_data2 = Object.entries(this.data[this.country2_select][this.Gender]["all"]);
        } else {

            let subData1 = this.data[this.country1_select][this.Gender];
            let subData2 = this.data[this.country2_select][this.Gender];

            let added1 = {};
            let added2 = {};

            added1 = recalc(subData1, added1);
            added2 = recalc(subData2, added2);

            filter_data = Object.entries(added1);
            filter_data2 = Object.entries(added2)
        }


        min_yr = Math.min(filter_data[0][0], filter_data2[0][0]);
        max_yr = Math.max(filter_data[filter_data.length - 1][0], filter_data2[filter_data2.length - 1][0]);
        max_sui = Math.max(d3.max(filter_data, function(d) { return +d[1].suicides }), d3.max(filter_data2, function(d) { return +d[1].suicides }));

        this.scaleY1 = d3.scaleLinear()
            .domain([max_sui, 0])
            .range([0, 400]);

        this.scaleX1 = d3.scaleLinear()
            .domain([min_yr, max_yr])
            .range([0, 500]);

        this.updateLegend1();

        this.drawLines1(filter_data, "#graph_path1");
        this.drawLines1(filter_data2, "#graph_path2");

        this.drawPoints1(filter_data, this.country1_select, "#Hover_points1");
        this.drawPoints1(filter_data2, this.country2_select, "#Hover_points2");


        function recalc(data, map) {
            for (let value of that.age_map.values()) {
                if (value[1] == 1) {
                    let a = "a" + value[0].replace(' ', '_');

                    let entries = Object.entries(data[a]);

                    for (let cur of entries.values()) {
                        if (map[cur[0]] == undefined) {
                            let num = cur[1].suicides;
                            map[cur[0]] = { suicides: num };
                        } else {
                            let sum = map[cur[0]].suicides;
                            sum += parseInt(cur[1].suicides);
                            map[cur[0]] = { suicides: sum };
                        }
                    }

                }
            }
            return map;
        }
    }

    drawLegend1() {
        let svg1 = d3.select("#graph_svg1");

        //x-axis
        svg1.append("g").attr("id", "g1x-axis").attr("transform", "translate(120, 420)");

        //y-axis
        svg1.append("g").attr("id", "g1y-axis").attr("transform", "translate(120,20)");
    }

    updateLegend1() {
        d3.select("#g1x-axis").call(d3.axisBottom(this.scaleX1).ticks().tickFormat(d3.format("d")));
        d3.select("#g1y-axis").call(d3.axisLeft(this.scaleY1).ticks(10));
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

    drawPoints1(data, countryN, selectID) {

        let that = this;

        let point_group = d3.select(selectID);

        point_group.selectAll("circle")
            .data(data)
            .join(
                enter => {
                    enter
                        .append("circle")
                        .transition()
                        .attr("r", "3")
                        .attr("cx", d => this.scaleX1(d[0]))
                        .attr("cy", d => this.scaleY1(d[1].suicides))
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);
                },
                update => {
                    update.transition()
                        .attr("r", "3")
                        .attr("cx", d => this.scaleX1(d[0]))
                        .attr("cy", d => this.scaleY1(d[1].suicides))
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);
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
                    .text(countryN + ": " + "\n" + "Number of Suicides: " + Math.round(that.scaleY1.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX1.invert(current.attr("cx"))));
            })
            .on("mouseout", function() {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });
    }


    updateGraph2(type, value) {
        let that = this;

        if (type == "type") {
            this.type = value;
        } else if (type == "country1") {
            this.country1_select = value;
        } else if (type == "country2") {
            this.country2_select = value;
        }

        let filter_data;
        let filter_data2;
        let max_data;
        let max_yr;
        let min_yr;

        filter_data = Object.entries(this.data2[this.country1_select]);
        filter_data2 = Object.entries(this.data2[this.country2_select]);

        let fill = filter_data.filter(d => d[1][this.type] != null);
        let fill2 = filter_data2.filter(d => d[1][this.type] != null);

        min_yr = Math.min(fill[0][0], fill2[0][0]);
        max_yr = Math.max(fill[fill.length - 1][0], fill2[fill2.length - 1][0]);

        let max1 = d3.max(fill, function(d) { return +d[1][that.type] });
        let max2 = d3.max(fill2, function(d) { return +d[1][that.type] });

        max_data = Math.max(max1, max2);

        this.scaleY2 = d3.scaleLinear()
            .domain([max_data, 0])
            .range([0, 400]);

        this.scaleX2 = d3.scaleLinear()
            .domain([min_yr, max_yr])
            .range([0, 500]);

        this.updateLegend2();
        this.drawLines2(fill, "#graph_path3", this.type);
        this.drawLines2(fill2, "#graph_path4", this.type);
        this.drawPoints2(fill, this.country1_select, "#Hover_points3", this.type);
        this.drawPoints2(fill2, this.country2_select, "#Hover_points4", this.type);
        this.updateAxisName(this.type);
    }

    updateAxisName(type) {
        d3.select("#axis-label-y2").text(type.toUpperCase());
    }

    drawLegend2() {

        let svg2 = d3.select("#graph_svg2");

        //x-axis
        svg2.append("g").attr("id", "g2x-axis").attr("transform", "translate(120, 420)");

        //y-axis
        svg2.append("g").attr("id", "g2y-axis").attr("transform", "translate(120,20)");

    }

    updateLegend2() {
        d3.select("#g2x-axis").call(d3.axisBottom(this.scaleX2).ticks().tickFormat(d3.format("d")));
        d3.select("#g2y-axis").call(d3.axisLeft(this.scaleY2).ticks(10));
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

    drawPoints2(data, countryN, selectID, type) {

        let that = this;

        let point_group = d3.select(selectID);

        point_group.selectAll("circle")
            .data(data)
            .join(
                enter => {
                    enter
                        .append("circle")
                        .transition()
                        .attr("r", "3")
                        .attr("cx", d => this.scaleX2(d[0]))
                        .attr("cy", d => this.scaleY2(d[1][type]))
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);
                },
                update => {
                    update.transition()
                        .attr("r", "3")
                        .attr("cx", d => this.scaleX2(d[0]))
                        .attr("cy", d => this.scaleY2(d[1][type]))
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);
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
                    .text(countryN + ": \n" + type.toUpperCase() + ": " + Math.round(that.scaleY2.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX2.invert(current.attr("cx"))));
            })
            .on("mouseout", function() {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });
    }
}