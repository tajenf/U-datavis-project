class UI {

    constructor(data) {

        // console.log(data); 
        // console.log(data.length);


        // this.textbox();
        this.drawPlot();
    }

    drawPlot() {
        let ui_svg = d3.select("#ui").append("svg").attr("id", "ui_svg").attr("height", "250px").attr("width", "1100px");

       // ui_svg.append('div').attr('id', 'activeYear-bar');

        this.textTitles();
        this.year_slider(); 
    }

    textTitles() {
        let ui_svg = d3.select("#ui_svg");

        let end = ui_svg.attr("width");

        //Country Text
        ui_svg.append("text").text("Country").attr("transform", "translate(10, 30)").attr("id", "country").attr("class", "title");

        //Country 2 Text
        ui_svg.append("text").text("Country").attr("transform", "translate(300, 30)").attr("id", "country").attr("class", "title");

        //Gender Text
        ui_svg.append("text").text("Gender").attr("transform", "translate(10, 90)");

        //Age Group
        ui_svg.append("text").text("Age Group").attr("transform", "translate(300, 90)");

        //Religion 
        ui_svg.append("text").text("Religion").attr("transform", "translate(600, 90)");

        //Lifestyle 
        ui_svg.append("text").text("Lifestyle").attr("transform", "translate(10, 150)");

        //Government Structure 
        ui_svg.append("text").text("Government Structure").attr("transform", "translate(300, 150)");

        //Country comparison 
        ui_svg.append("text").text("Country Comparison").attr("transform", "translate(800, 30)");
    }

    dropdown(data) {


    }

    year_slider() {
        // let that = this;
        // let yearScale = d3.scaleLinear().domain([1985, 2016]).range([30, 730]);
        let ui_svg = d3.select("#ui_svg"); 


    }


}