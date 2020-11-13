class Graph {

    constructor(data)
    {
        this.data = data;

        console.log(data); 


        this.scaleY = d3.scaleLinear()
        .domain([-100, 100])
        .range([0, 30]);

        this.scaleX = d3.scaleLinear()
        .domain([-100, 100])
        .range([0, 30]);
    }
    
    drawLegend()
    {



    }

    drawLines()
    {



    }

    //don't know if we need this or not, just blocking out some code
    toggleStory()
    {

    }
}