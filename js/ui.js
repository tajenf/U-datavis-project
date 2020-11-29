class UI {

    constructor(data, updateYear, updateAge, updateGender, updateStory, updateCompare) {
        this.updateYear = updateYear;
        this.updateAge = updateAge;
        this.updateGender = updateGender;
        this.updateStory = updateStory;
        this.updateCompare = updateCompare;

        this.startYear = 1985;
        this.endYear = 2016;
        this.checkCount = 1;

        this.age_map = new Map([["5-14 years", ["5-14 years", 1]], ["15-24 years", ["15-24 years", 1]], ["25-34 years", ["25-34 years", 1]], ["35-54 years", ["35-54 years", 1]], ["55-74 years", ["55-74 years", 1]], ["75+ years", ["75+ years", 1]]]);

        this.drawItems();
    }

    drawItems() {

        let ui_div = d3.select("#ui");

        // let end = d3.select("#ui_svg").attr("width");//not sure if need yet 

        //Add div sections for UI features 
        let ui_svg = ui_div
            .append("svg")
            .attr("id", "ui_svg")
            .attr("height", "220px")
            .attr("width", "1100px");

        let ui_gender_drop = ui_div
            .append("div")
            .attr("id", "gender_div");

        let ui_age_drop = ui_div
            .append("div")
            .attr("id", "age_div");

        let ui_story = ui_div
            .append("div")
            .attr("id", "story_div");

        let ui_compare_toggle = ui_div
            .append("div")
            .attr("id", "compare_div");

        //Age Group Title 
        ui_svg.append("text")
            .text("Age Group")
            .attr("transform", "translate(80, 60)")
            .attr("id", "age_group_title");

        //Country1 Text
        ui_svg.append("text")
            .text("Country: ")
            .attr("transform", "translate(40, 30)")
            .attr("id", "country1_title")
            .attr("class", "title");

        //Country2 Text
        ui_svg.append("text")
            .text("Country: ")
            .attr("transform", "translate(330, 30)")
            .attr("id", "country2_title")
            .attr("class", "title")
            .classed("hidden", true);

        //Country1 Name Text 
        ui_svg.append("text")
            .attr("transform", "translate(140, 30)")
            .attr("id", "country1_name")
            .attr("class", "title");

        //Country2 name Text
        ui_svg.append("text")
            .attr("transform", "translate(430, 30)")
            .attr("id", "country2_name")
            .attr("class", "title")
            .classed("hidden", true);

        this.ui_Titles_Update("World", "None", true);   ////////will need to reset 
        this.ui_Features();
        this.year_slider();
    }

    ui_Titles_Update(country1, country2, compare) {

        console.log("updated TItles was called"); 
        d3.select("#country1_name").text(country1);
        if (compare == true) {
            d3.select("#country2_title").classed("hidden", false);
            let country2Name = d3.select("#country2_name");
            country2Name.text(country2)
            country2Name.classed("hidden", false);
        }
    }

    ui_Features() {
        let that = this;

        //Gender feature 
        let gender_options = ["Both", "Female", "Male"];

        let gender_div = d3.select("#gender_div");

        let gender_form = gender_div.append("form")
            .attr("name", "form_gender")
            .attr("id", "form_gender")
            .text("Gender: ");

        let select_gender = gender_form.append("select")
            .attr("name", "gender")
            .attr("id", "gender_select")
            // .attr("class", "gender-selected")
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
            that.updateGender(this.value.toLowerCase());
        };

        //Age Group feature  
        let age_group_options = ["5-14 years", "15-24 years", "25-34 years", "35-54 years", "55-74 years", "75+ years", "All"];

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
                return true;
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
            let array = that.age_map.get(current.value);

            if (current.checked == true) {
                array[1] = 1;
                that.checkCount++;
            }
            else if (current.checked == false && that.checkCount > 1) {
                array[1] = 0;
                that.checkCount--;
            }
            else {
                current.checked = true;
            }
            d3.select("#All_option_ID").property("checked", false);

            that.updateAge(that.age_map);
        };

        //Apply Age selection update age function
        document.getElementById("5-14 years_option_ID").onclick = function () {
            UpdateAgeOption(this);
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

                for (let i of that.age_map.values()) {
                    i[1] = 1;
                }

                that.checkCount = 6;
                that.updateAge(that.age_map);
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
            if (this.checked == true) {
                that.updateCompare(true);
            }
            else {
                that.updateCompare(false);
            }
        };


        let stories = ["intro", "story_1", "story_2", "story_3", "story_4"]; //, "deselect"];

        //Story feature 
        d3.select("#story_div").selectAll("input")
            .data(stories)
            .enter()
            .append("input")
            .attr("type", "radio")
            // .attr("class", function (d) {
            //     return d + "class";
            // })
            .attr("id", function (d) {
                return d + "_ID";
            })
            .attr("name", "Story_radio")
            .attr("value", function (d) {
                if (d == "intro") {
                    return 0;
                }
                else if (d == "story_1") {
                    return 1;
                }
                else if (d == "story_2") {
                    return 2;
                }
                else if (d == "story_3") {
                    return 3;
                }
                return 4;
            });

        document.getElementById("intro_ID").onclick = function () {
            UpdateStorySection(this);
        };

        document.getElementById("story_1_ID").onclick = function () {
            UpdateStorySection(this);
        };

        document.getElementById("story_2_ID").onclick = function () {
            UpdateStorySection(this);
        };

        document.getElementById("story_3_ID").onclick = function () {
            UpdateStorySection(this);
        };

        document.getElementById("story_4_ID").onclick = function () {
            UpdateStorySection(this);
        };

        function UpdateStorySection(current) {
            console.log(current.value);
            that.updateStory(current.value);
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