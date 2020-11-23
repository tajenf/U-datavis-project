class UI {

    constructor(data) {
        this.drawItems();
    }

    drawItems() {
        //UI SVG 
        let ui_svg = d3.select("#ui")
            .append("svg")
            .attr("id", "ui_svg")
            .attr("height", "250px")
            .attr("width", "1100px");

        let ui_gender_drop = d3.select("#ui")
            .append("div")
            .attr("id", "gender_div");

        let ui_age_drop = d3.select("#ui")
            .append("div")
            .attr("id", "age_div");

        let ui_religion_drop = d3.select("#ui")
            .append("div")
            .attr("id", "religion_div");

        let ui_lifestyle_drop = d3.select("#ui")
            .append("div")
            .attr("id", "lifestyle_div");

        let ui_gov_drop = d3.select("#ui")
            .append("div")
            .attr("id", "gov_div");


        this.textTitles();
        this.year_slider();
    }

    textTitles() {
        let ui_svg = d3.select("#ui_svg");

        //Country Text
        ui_svg.append("text")
            .text("Country")
            .attr("transform", "translate(10, 30)")
            .attr("id", "country")
            .attr("class", "title");

        //Country name 1
        ui_svg.append("text")
            .text("Country_Name1")
            .attr("transform", "translate(80, 30)")
            .attr("id", "country_name1")
            .attr("class", "country");

        //Country 2 Text
        ui_svg.append("text")
            .text("Country")
            .attr("transform", "translate(300, 30)")
            .attr("id", "country")
            .attr("class", "title");

        //Country name 2
        ui_svg.append("text")
            .text("Country_Name2")
            .attr("transform", "translate(380, 30)")
            .attr("id", "country_name2")
            .attr("class", "country");

/////////////////////////////// gender section 
        let gender_options = ["Female", "Male"];

        let gender_div = d3.select("#gender_div");

        let gender_form = gender_div.append("form")
            .attr("name", "form_gender")
            .attr("id", "form_gender")
            .text("Gender: ");

        let select_gender = gender_form.append("select")
            .attr("name", "gender")
            .attr("id", "gender")
            .selectAll("option")
            .data(gender_options)
            .enter()
            .append("option")
            .attr("value", function (d) {
                return d;
            })
            .text(function (d) {
                return d;
            });

/////////////////////////////age section 
        let age_group_options = ["15-24 years", "25-34 years", "35-54 years", "55-74 years", "75+ years"];

        let age_div = d3.select("#age_div");

        let age_form = age_div.append("form")
            .attr("name", "form_age")
            .attr("id", "form_age")
            .text("Age Group: ");

        let select_age = age_form.append("select")
            .attr("name", "age")
            .attr("id", "age")
            .selectAll("option")
            .data(age_group_options)
            .enter()
            .append("option")
            .attr("value", function (d) {
                return d;
            })
            .text(function (d) {
                return d;
            });

        // //Religion 
        // ui_svg.append("text")
        //     .text("Religion")
        //     .attr("transform", "translate(600, 90)");

        // //Lifestyle 
        // ui_svg.append("text")
        //     .text("Lifestyle")
        //     .attr("transform", "translate(10, 150)");

        // //Government Structure 
        // ui_svg.append("text")
        //     .text("Government Structure")
        //     .attr("transform", "translate(300, 150)");

        //Country comparison 
        ui_svg.append("text")
            .text("Country Comparison")
            .attr("transform", "translate(800, 30)");
    }

    buttons() {
        let ui_svg = d3.select("#ui_buttons");

        let male_button = ui_svg.append("button").text("herro")
            .attr("type", "button")
            .attr("id", "male_button")
            .attr("onclick", "alert('Hello world!')")
            // .attr("transform", "translate(10, 90)")
            ;
        // male_button.append("text").text("hello");
    }

    year_slider() {
        let ui_svg = d3.select("#ui_svg");

        let range1 = d3.select("#range1");
        let range2 = d3.select("#range2");

        range1.attr("oninput", function () {
            return ("this.value=Math.min(this.value,this.parentNode.childNodes[5].value-1);" +
                "var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);" +
                "var children = this.parentNode.childNodes[1].childNodes;" +
                "children[1].style.width=value+'%';" +
                "children[5].style.left=value+'%';" +
                "children[7].style.left=value+'%';" +
                "children[11].style.left=value+'%';" +
                "children[11].childNodes[1].innerHTML= this.value;")
        });

        range2.attr("oninput", function () {
            return ("this.value=Math.max(this.value,this.parentNode.childNodes[3].value-(-1));" +
                "var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);" +
                "var children = this.parentNode.childNodes[1].childNodes;" +
                "children[3].style.width=(100-value)+'%';" +
                "children[5].style.right=(100-value)+'%'; " +
                "children[9].style.left=value+'%'; " +
                "children[13].style.left=value+'%'; " +
                "children[13].childNodes[1].innerHTML=this.value;")
        });
    }


}