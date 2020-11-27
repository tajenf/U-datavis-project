class UI {

    constructor(data, updateYear, updateAge, updateGender, updateStory) {
        this.updateYear = updateYear;
        this.updateAge = updateAge;
        this.updateGender = updateGender;
        this.updateStory = updateStory;

        this.startYear = 1985;
        this.endYear = 2016;
        this.checkCount = 1;

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

        let ui_compare_toggle = d3.select("#ui")
            .append("div")
            .attr("id", "compare_div");

        this.ui_Titles();
        this.ui_Features();
        this.year_slider();
    }

    ui_Titles() {
        let ui_svg = d3.select("#ui_svg");
        let end = d3.select("#ui_svg").attr("width");

        console.log(end);

        //Country Text
        ui_svg.append("text")
            .text("Country: ")
            .attr("transform", "translate(40, 30)")
            .attr("id", "country1_title")
            .attr("class", "title");

        //Country Name Text 
        ui_svg.append("text")
            .text("Country_name")
            .attr("transform", "translate(140, 30)")
            .attr("id", "country1_name")
            .attr("class", "title");

        //Country 2 Text
        ui_svg.append("text")
            .text("Country: ")
            .attr("transform", "translate(330, 30)")
            .attr("id", "country2_title")
            .attr("class", "title");

        //Country 2 Text
        ui_svg.append("text")
            .text("Country_name2")
            .attr("transform", "translate(430, 30)")
            .attr("id", "country2_name")
            .attr("class", "title");

        //Age Group Title 
        ui_svg.append("text")
            .text("Age Group")
            .attr("transform", "translate(80, 60)")
            .attr("id", "age_group_title");
        //.attr("class", "title");
    }

    ui_Features() {
        let that = this;

        //Gender feature 
        let gender_options = ["Female", "Male", "Both"];

        let gender_div = d3.select("#gender_div");

        let gender_form = gender_div.append("form")
            .attr("name", "form_gender")
            .attr("id", "form_gender")
            .text("Gender: ");

        let select_gender = gender_form.append("select")
            .attr("name", "gender")
            .attr("id", "gender_select")
            .attr("class", "gender-selected")
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

        document.getElementById("gender_select").onchange = function () {
            that.updateGender(this.value); /////////////Need string? 
        };

        //Age Group feature  
        let age_group_options = ["15-24 years", "25-34 years", "35-54 years", "55-74 years", "75+ years", "All"];

        let age_div = d3.select("#age_div");

        let age_form = age_div.append("form")
            .attr("name", "form_age")
            .attr("id", "form_age");

        age_form.selectAll("g")
            .data(age_group_options)
            .enter()
            .append("g")
            .attr("class", "container");

        age_form.selectAll("g")
            .append("input")
            .attr("type", "checkbox")
            .property("checked", function (d) {
                if (d == "15-24 years") {
                    return true;
                }
                return false;
            })
            .attr("name", "age_options")
            .attr("value", function (d) {
                return d;
            })
            .attr("id", function (d) {
                return d + "_option_ID";
            })
            .attr("class", "age_input_options")
            .property("required", true);

        age_form.selectAll("g")
            .append("label")
            .attr("for", function (d) {
                return d;
            })
            .text(function (d) {
                return d;
            });

        age_form.selectAll("g")
            .append("br")

        function UpdateAgeOption(current) {
            //need to call updateAge here 
            if (current.checked == true) {
                that.checkCount++;
            }
            else if (current.checked == false && that.checkCount > 1) {
                that.checkCount--;
            }
            else {
                current.checked = true;
            }
            // console.log(that.checkCount); 
            // console.log(current.checked); 

            d3.select("#All_option_ID").property("checked", false);
        };

        document.getElementById("15-24 years_option_ID").onclick = function () {
            UpdateAgeOption(this);
        };

        document.getElementById("25-34 years_option_ID").onclick = function () {
            UpdateAgeOption(this);
        };

        document.getElementById("35-54 years_option_ID").onclick = function () {
            UpdateAgeOption(this);
        };

        document.getElementById("55-74 years_option_ID").onclick = function () {
            UpdateAgeOption(this);
        };

        document.getElementById("75+ years_option_ID").onclick = function () {
            UpdateAgeOption(this);
        };

        document.getElementById("All_option_ID").onclick = function () {
            //need to call updateAge here 
            if (this.checked == true) {
                d3.selectAll(".age_input_options").property("checked", true);
                that.checkCount = 5;
            }
            else {
                this.checked = false;
            }
        };

        //Compare feature 
        d3.select("#compare_div").append("form")
            .text("Country Comparison ")
            .append("input")
            .attr("id", "input_compare")
            .attr("type", "checkbox");

        document.getElementById("input_compare").onchange = function () {
            // console.log(this.checked);
        };
    }

    year_slider() {
        let that = this;

        let range1 = d3.select("#range1");
        let range2 = d3.select("#range2");

        range1.attr("oninput", function () {
            return "this.value=Math.min(this.value,this.parentNode.childNodes[5].value-1);" +
                "var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);" +
                "var children = this.parentNode.childNodes[1].childNodes;" +
                "children[1].style.width=value+'%';" +
                "children[5].style.left=value+'%';" +
                "children[7].style.left=value+'%';" +
                "children[11].style.left=value+'%';" +
                "children[11].childNodes[1].innerHTML= this.value;"

        });

        range2.attr("oninput", function () {
            return ("this.value=Math.max(this.value,this.parentNode.childNodes[3].value-(-1));" +
                "var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);" +
                "var children = this.parentNode.childNodes[1].childNodes;" +
                "children[3].style.width=(100-value)+'%';" +
                "children[5].style.right=(100-value)+'%'; " +
                "children[9].style.left=value+'%'; " +
                "children[13].style.left=value+'%'; " +
                "children[13].childNodes[1].innerHTML=this.value-1;")
        });

        //UpdateYear function passing in the current starting year and the span of current start to current end. 
        //Updates teh current startYear
        range1.on("input", function () {
            that.startYear = parseInt(this.value);
            that.updateYear(that.startYear, (that.endYear - that.startYear));
        });

        //UpdateYear function passing in the current starting year and the span of current start to current end. 
        //Updates the current endYear
        range2.on("input", function () {
            that.endYear = parseInt(this.value) - 1;
            that.updateYear(that.startYear, that.endYear - that.startYear)
        });
    }


}