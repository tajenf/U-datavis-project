class UI {

    constructor(data, updateYear, updateAge, updateGender, updateStory, updateCompare, updateCountry, UpdateCountrySelecting, updateGraph2) {

        this.updateCountry = updateCountry;
        this.updateYear = updateYear;
        this.updateAge = updateAge;
        this.updateGender = updateGender;
        this.updateStory = updateStory;
        this.updateCompare = updateCompare;
        this.updateCountrySelecting = UpdateCountrySelecting;
        this.updateG2 = updateGraph2;
        
        this.looping = false;
        this.checkCount = 6;

        this.age_map = new Map([
            ["5-14 years", ["5-14 years", 1]],
            ["15-24 years", ["15-24 years", 1]],
            ["25-34 years", ["25-34 years", 1]],
            ["35-54 years", ["35-54 years", 1]],
            ["55-74 years", ["55-74 years", 1]],
            ["75+ years", ["75+ years", 1]]
        ]);

        this.drawItems();
    }

    initiallizePage() {
        this.updateCompare(false);
        this.setYear(2011);
        this.updateAge("all");
        this.updateGender("both");
        this.updateStory("0");
        this.updateCountry("United States of America", 1);
        this.updateCountry("Jamaica", 2);
    }

    drawItems() {
        let ui_div = d3.select("#ui");

        //UI features 
        let ui_svg = ui_div
            .append("svg")
            .attr("id", "ui_svg")
            .attr("height", "130px")
            .attr("width", "1100px");

        //Slider creation 
        let ui_slider = ui_div
            .append("div")
            .attr("id", "slider_div")
            .attr("class", "slider");

        ui_slider.append("input")
            .attr("type", "range")
            .attr("id", "year_slider_id")
            .attr("oninput", "rangevalue.value=value");

        ui_slider.append("output")
            .attr("id", "rangevalue")
            .text(2011);

        //Create div sections 
        let ui_gender_drop = ui_div
            .append("div")
            .attr("id", "gender_div");

        let ui_age_drop = ui_div
            .append("div")
            .attr("id", "age_div");

        let ui_compare_div = ui_div
            .append("div")
            .attr("id", "compare_div");

        let ui_compare_Toggle = ui_div
            .append("div")
            .attr("id", "compareToggle_div");

        //Age Group Title 
        ui_svg.append("text")
            .text("Age Group")
            .attr("transform", "translate(80, 20)")
            .attr("id", "age_group_title");

        this.year_slider(1985, 2015); //starting years 
        this.ui_Features();
    }

    ui_Features() {
        let that = this;

        //Gender feature creation 
        let gender_options = ["Both", "Female", "Male"];

        let gender_div = d3.select("#gender_div");

        let gender_form = gender_div.append("form")
            .attr("name", "form_gender")
            .attr("id", "form_gender")
            .text("Gender: ");

        let select_gender = gender_form.append("select")
            .attr("name", "gender")
            .attr("id", "gender_select")
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

        //update other features 
        document.getElementById("gender_select").onchange = function () {
            that.updateGender(this.value.toLowerCase());
        };

        document.getElementById("year_slider_id").onchange = function () {
            that.setYear(this.value);
        };

        //Age Group feature creation 
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
            .property("checked", true)
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

        //Helper method to make sure one check box is always selected for age groups 
        function UpdateAgeOption(current) {
            let array = that.age_map.get(current.value);

            if (current.checked == true) {
                array[1] = 1;
                that.checkCount++;
            } else if (current.checked == false && that.checkCount > 1) {
                array[1] = 0;
                that.checkCount--;
            } else {
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
            } else {
                this.checked = false;
            }
        };

        //Compare feature 
        let compare_div = d3.select("#compare_div");

        compare_div.append("form")
            .text("Country Comparison ")
            .append("input")
            .attr("id", "input_compare")
            .attr("type", "checkbox");

        //Toggle and updated UI feature visibillity 
        document.getElementById("input_compare").onchange = function () {
            that.OnCompare(this.checked);

        };

        let compare_toggle = d3.select("#compareToggle_div")
            .classed("hidden", true);

        let compare_data = ["1", "2"];

        compare_toggle
            .selectAll("g")
            .data(compare_data)
            .enter()
            .append("g")
            .append("input")
            .attr("type", "radio")
            .attr("name", "toggle")
            .attr("id", function (d) {
                if (d == 1) {
                    return "toggle-on";
                }
                return "toggle-off";
            })
            .attr("class", function (d) {
                if (d == 1) {
                    return "toggle toggle-left compare_toggle";
                }
                return "toggle toggle-right compare_toggle";
            })
            .attr("value", function (d) {
                if (d == 1) {
                    return 1;
                }
                return 2;
            })
            .property("checked", function (d) {
                if (d == 1) {
                    return true;
                }
                return false;

            });

        compare_toggle
            .selectAll("g")
            .append("label")
            .attr("class", "btn")
            .attr("for", function (d) {
                if (d == 1) {
                    return "toggle-on";
                }
                return "toggle-off";
            })
            .text(function (d) {
                if (d == 1) {
                    return "Select Country " + d;
                }
                return "Select Country " + d;
            });

        //Update countrires 
        document.getElementById("toggle-on").onclick = function () {
            that.updateCountrySelecting(this.value);
        }

        document.getElementById("toggle-off").onclick = function () {
            that.updateCountrySelecting(this.value);
        }

        //Update graph 2 for what type it needs to be 
        d3.select("#gdp_TID").attr('checked', "checked");

        document.getElementById("gdp_TID").onclick = function () {
            that.updateG2(this.value);
        };

        document.getElementById("cellphone_TID").onclick = function () {
            that.updateG2(this.value);

        };

        document.getElementById("power_TID").onclick = function () {
            that.updateG2(this.value);

        };

        document.getElementById("density_TID").onclick = function () {
            that.updateG2(this.value);

        };

        document.getElementById("unemployment_TID").onclick = function () {
            that.updateG2(this.value);
        };


        let stories = ["intro", "story_1", "story_2", "story_3", "story_4"];

        //Story feature 
        d3.select("#story_div").selectAll("input")
            .data(stories)
            .enter()
            .append("input")
            .attr("type", "radio")
            .attr("id", function (d) {
                return d + "_ID";
            })
            .attr("name", "Story_radio")
            .attr("value", function (d) {
                if (d == "intro") {
                    return 0;
                } else if (d == "story_1") {
                    return 1;
                } else if (d == "story_2") {
                    return 2;
                } else if (d == "story_3") {
                    return 3;
                }
                return 4;
            });

        //Story update calls
        d3.select("#intro_ID").attr('checked', "checked");

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


            switch (parseInt(current.value)) {
                case 0:
                    //intro
                    that.setYear(2011);
                    document.getElementById("input_compare").checked = false;
                    that.OnCompare(false);
                    that.updateCountry("United States of America", 1);
                    break;

                case 1:
                    //male to female ratio
                    that.setYear(1989);
                    document.getElementById("input_compare").checked = false;
                    that.OnCompare(false);
                    that.updateCountry("Japan", 1);
                    break;

                case 2:
                    //urbanization/density
                    that.setYear(2005);
                    document.getElementById("input_compare").checked = true;
                    that.OnCompare(true);
                    that.updateCountry("Israel", 1);
                    that.updateCountry("Cyprus", 2);
                    break;

                case 3:
                    //first world country/third world country
                    that.setYear(2014);
                    that.updateCompare(true);
                    document.getElementById("input_compare").checked = true;
                    that.OnCompare(true);
                    that.updateCountry("United Kingdom", 1);
                    that.updateCountry("Cuba", 2);
                    break;

                case 4:
                    //ADVENTURE TIME!!!
                    if (!that.looping) {
                        that.looping = true;
                        that.story4(1985);
                    }
                    break;
                default:
                    break;
            }

            that.updateStory(current.value);
        };

    }

    OnCompare(checked) {

        let compareTog = d3.select("#compareToggle_div");

        let path2 = d3.select("#path_group2");
        let hov2 = d3.select("#Hover_points2");

        let path4 = d3.select("#path_group4");
        let hov4 = d3.select("#Hover_points4");

        //Make visibility feature for toggle. 
        if (checked) {
            this.updateCompare(true);

            compareTog
                .classed("hidden", false)
                .classed("visible", true);

            path2
                .classed("hidden", false)
                .classed("visible", true);

            hov2
                .classed("hidden", false)
                .classed("visible", true);

            path4
                .classed("hidden", false)
                .classed("visible", true);

            hov4
                .classed("hidden", false)
                .classed("visible", true);

        } else {
            this.updateCompare(false);

            compareTog
                .classed("hidden", true)
                .classed("visible", false);

            path2
                .classed("hidden", true)
                .classed("visible", false);

            hov2
                .classed("hidden", true)
                .classed("visible", false);

            path4
                .classed("hidden", true)
                .classed("visible", false);

            hov4
                .classed("hidden", true)
                .classed("visible", false);
        }
    }

    story4(year) {
        this.setYear(year);

        if (year < 2015) {
            setTimeout(() => {
                this.story4(year + 1)
            }, 300);
        }
        else {
            this.looping = false;
        }
    }

    //update year 
    setYear(newYear) {
        let slider = d3.select("#year_slider_id");
        let yearLabel = d3.select("#rangevalue")

        slider.attr("value", newYear);
        yearLabel.text(newYear);
        this.updateYear(newYear);
    }

    year_slider(min, max) {
        let slider = d3.select("#year_slider_id");

        slider.attr("min", min);
        slider.attr("max", max);
        slider.attr("value", 2011);
    }
}