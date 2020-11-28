class Graph {

    constructor(data, country_name, Gender, Age_group, compare) {

        let graph_svg = d3.select('#graph')
            .append("svg")
            .attr("id", "graph_svg")
            .attr("height", 500)
            .attr("width", 600);

        //Graph 1 Line
        graph_svg.append("g")
            .attr("transform", "translate(50,20)")
            .append("path")
            .attr("id", "graph_path")
            .attr("fill", "none")
            .attr("stroke", "black");

        //Graph 1 Hover points 
        graph_svg.append("g")
            .attr("transform", "translate(50,20)")
            .attr("id", "Hover_points");

        //Graph 1 y-axis 
        graph_svg.append("text")
            .attr("id", "axis-label-y")
            .attr("transform", "translate(15, 200), rotate(-90)")
            .style("text-anchor", "middle")
            .text("Suicide Count");

        //Graph 1 x-axis 
        graph_svg.append("text")
            .attr("id", "axis-label-x")
            .attr("transform", "translate(300, 470)")
            .style("text-anchor", "middle")
            .text("Years");

        //Display 
        graph_svg.append("g")
            .attr("id", "Graph-Info_1")
            .append("text")
            .attr("transform", "translate(300, 490)")
            .style("text-anchor", "middle")
            .text("Country: " + country_name + ",  Gender: " + Gender + ",  Age: " + Age_group);

        this.updateGraph(data, country_name, Gender, Age_group, compare);
    }

    updateGraph(data, country_name, Gender, Age_group) {//}, compare, country_name2, Gender2, Age_group2) {

        let filter_data = null;

        if (country_name == "world" && Gender == "both" && Age_group == "all") {
            console.log("I went in here!"); 
            filter_data = data; 
        }
        else if (country_name != "world" && Gender != "both" && Age_group != "all") {
            filter_data = data.filter(d => ((d.country == country_name) && (d.sex == Gender) && (d.age == Age_group)));
        }
        //will need more checkers 
        console.log(data);
        console.log(filter_data);

        let max_sui = d3.max(filter_data, function (d) { return +d.suicides_no });
        let max_yr = d3.max(filter_data, function (d) { return d.year });
        let min_yr = d3.min(filter_data, function (d) { return d.year });

        this.scaleY = d3.scaleLinear()
            .domain([max_sui, 0])
            .range([0, 400]);

        this.scaleX = d3.scaleLinear()
            .domain([min_yr, max_yr])
            .range([0, 500]);

        this.drawLegend();
        this.drawLines(filter_data);
        this.drawPoints(filter_data);
    }

    drawLegend() {

        let svg = d3.select("#graph_svg");

        //x-axis
        svg.append("g").attr("transform", "translate(50, 420)")
            .call(d3.axisBottom(this.scaleX).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg.append("g").attr("transform", "translate(50,20)")
            .call(d3.axisLeft(this.scaleY).ticks(10));
    }

    drawLines(data) {

        let LineGenerator = d3
            .line()
            .x(d => this.scaleX(d.year))
            .y(d => this.scaleY(d.suicides_no));

        d3.select("#graph_path")
            .data(data)
            .transition().duration(2000)
            .attr("d", LineGenerator(data));
    }

    drawPoints(data) {

        let that = this;
        let point_group = d3.select("#Hover_points");

        point_group.selectAll("circle")
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

        point_group.selectAll("circle")
            .data(data)
            .on("mouseover", function (d) {
                let current = d3.select(this);
                current.attr("class", "hovered");
                let current_title = current.append("title");
                current_title
                    .append("text")
                    .text("Number of Suicides: " + Math.round(that.scaleY.invert(current.attr("cy"))) + "\n" + "Year: " + Math.round(that.scaleX.invert(current.attr("cx"))));
            })
            .on("mouseout", function () {
                let current = d3.select(this);
                current.attr("class", null);
                current.selectAll("title").remove();
            });
    }
}