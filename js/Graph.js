class Graph {

    constructor(data, country_name, Gender, Age_group, compare) {

        d3.select('#graph').append("svg").attr("id", "graph_svg").attr("height", 500).attr("width", 600);

        let graph_svg = d3.select('#graph_svg');

        graph_svg.append("g").attr("transform", "translate(50,20)").append("path")
            .attr("id", "graph_path").attr("fill", "none").attr("stroke", "black");

        graph_svg.append("g").attr("transform", "translate(50,20)").attr("id", "Hover_points");

        graph_svg.append("text").attr("id", "axis-label-y").attr("transform", "translate(15, 200), rotate(-90)").style("text-anchor", "middle").text("Suicide Count");
        graph_svg.append("text").attr("id", "axis-label-x").attr("transform", "translate(300, 470)").style("text-anchor", "middle").text("Years");

        //Display 
        graph_svg.append("text").attr("id", "Graph-Info").attr("transform", "translate(300, 490)").style("text-anchor", "middle").text("Country: " + country_name + ",  Gender: " + Gender + ",  Age: " + Age_group);

        this.updateGraph(data, country_name, Gender, Age_group, compare);
    }

    updateGraph(data, country_name, Gender, Age_group) {//}, compare, country_name2, Gender2, Age_group2) {
        this.data = data;

        let filter_data = data.filter(d => ((d.country == country_name) && (d.sex == Gender) && (d.age == Age_group)));

        let max_sui = d3.max(filter_data, function (d) { return +d.suicides_no });
        let max_yr = d3.max(filter_data, function (d) { return d.year });
        let min_yr = d3.min(filter_data, function (d) { return d.year });

        this.scaleY = d3.scaleLinear()
            .domain([max_sui, 0]) //max = 22338
            .range([0, 400]); //will need to change later 

        //time 
        this.scaleX = d3.scaleLinear()
            .domain([min_yr, max_yr])
            .range([0, 500]); //will need to change later 

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
                        .attr("r", "3")
                        .attr("cx", d => this.scaleX(d.year))
                        .attr("cy", d => this.scaleY(d.suicides_no))
                },
                update => {
                    update.transition()
                        .attr("r", "3")
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
        //   .on("click", function () {
        //     let current = d3.select(this);
        //     console.log("X: " + Math.round(aScale.invert(current.attr("cx"))) + ",");
        //     console.log("Y: " + Math.round(bScale.invert(current.attr("cy"))));
        //   });
    }
}