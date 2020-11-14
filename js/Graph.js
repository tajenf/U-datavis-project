class Graph {

    constructor(data) {
        this.data = data;

        console.log(data);


        let max = d3.max(data, function (d) { return +d.suicides_no });

        //sucide 
        this.scaleY = d3.scaleLinear()
            .domain([max, 0]) //max = 22338
            .range([0, 400]); //will need to change later 

        //time 
        this.scaleX = d3.scaleLinear()
            .domain([1985, 2016])
            .range([0, 500]); //will need to change later 

        //sucide over time 
        //gdp over time 
        //filter over 
        d3.select('#graph').append("svg").attr("id", "graph_svg").attr("height", 500).attr("width", 600);

        d3.select('#graph_svg').append("g").attr("transform", "translate(50,20)").append("path").attr("id", "graph_path"); 

        this.drawLegend();
        this.drawGraph(data);
    }

    //need? if were changing the y axis a lot? 
    drawLegend() {

        let svg = d3.select("#graph_svg");

        //x-axis
        svg.append("g").attr("transform", "translate(50, 420)")
            .call(d3.axisBottom(this.scaleX).ticks().tickFormat(d3.format("d")));

        //y-axis
        svg.append("g").attr("transform", "translate(50,20)")
            .call(d3.axisLeft(this.scaleY).ticks(10));
    }

    drawGraph(data) {

      //  let svg = d3.select("#graph_svg");

        let LineGenerator = d3
            .line()
            // .attr("x", function(d){
            //     return this.scaleX(d.year); 
            // })
            // .attr("y", function(d) {
            //     return this.scaleY(d.suicides_no); 
            // }); 
            // .x((d, i) => this.scaleX(i))
            // .y(d => this.scaleY(d.suicides_no));
            .x((d) => this.scaleX(d.year))
            .y(d => this.scaleY(d.suicides_no));

        d3.select("#graph_path")
            .data(data)
            //.transition().duration(2000)
            .attr("d", LineGenerator(data));
    }

    //? 
    drawLines() {



    }

    //don't know if we need this or not, just blocking out some code
    toggleStory() {

    }
}