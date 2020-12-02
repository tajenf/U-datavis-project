let suiData = d3.csv('./data/master.csv'); //simp
let densityData = d3.csv('./data/population_density.csv');
let cellData = d3.csv('./data/Cellphone.csv');
let powerData = d3.csv('./data/PowerConsumption.csv');
let unemploymentData = d3.csv('./data/totalUnemployment.csv');


Promise.all([suiData, densityData, cellData, powerData, unemploymentData]).then(data => {
    //oData is the organized data with each country having its own subarray
    let oData = [];
    let countryName = "";
    let startIndex = -1;

    //data that we have multiple years for
    let yearData = {};

    //suicide data organized as follows
    // country -> sex -> age group -> year
    let suicideData = {};

    //data specific to a country that won't change over time
    let countryData = {};
    //all possible subkeys for country data
    let countryKeys = new Set();
    //all possible subkeys for yearly data
    let yearKeys = new Set();

    //data structure map section
    for (let i = 0; i < data[0].length; i++) {
        if (countryName == "") {
            countryName = data[0][i]["country"];
            startIndex = i;
        }
        if (countryName != data[0][i]["country"]) {
            oData.push({ key: countryName, value: data[0].slice(startIndex, i) });
            countryName = "";
        }
    }

    //sets for all possible years/agegroups since not every year will exist for every country or age in a given year.
    let years = new Set();
    let ageGroups = new Set();

    //world is a dropped feature as we determined it was dis-honest since data may be lacking.
    //for example the world population drops from 2014 to 2016 due to lack of data.
    //it is left in for finding info for stories
    yearData["World"] = {};
    suicideData["World"] = {};


    data[0].forEach(suiData => {

        //yearly data section
        
        //the following 2 if statements are to ensure things are initiallized properly
        if (!yearData[suiData.country]) {
            yearData[suiData.country] = {};
        }

        if (!yearData["World"][suiData.year]) {
            yearData["World"][suiData.year] = {};
        }

        let gdp = parseInt(suiData["gdp_per_capita ($)"]);

        yearData[suiData.country][parseInt(suiData.year)] = { gdp };

        //suicide data section
        if (!suicideData[suiData.country]) {
            suicideData[suiData.country] = {};
        }

        if (!suicideData[suiData.country][suiData.sex]) {
            suicideData[suiData.country][suiData.sex] = {};
        }

        if (!suicideData[suiData.country][suiData.sex]["a" + suiData.age.replace(" ", "_")]) {
            suicideData[suiData.country][suiData.sex]["a" + suiData.age.replace(" ", "_")] = {};
        }

        if (!suicideData["World"][suiData.sex]) {
            suicideData["World"][suiData.sex] = {};
        }

        if (!suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")]) {
            suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")] = {};
        }

        if (!suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")][suiData.year]) {
            suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")][suiData.year] = {};
            suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")][suiData.year]["suicides"] = 0;
            suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")][suiData.year]["population"] = 0;
        }

        let suicides = parseInt(suiData.suicides_no);
        let population = parseInt(suiData.population);
        let popsuicides = parseFloat(suiData["suicides/100k pop"]);

        suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")][suiData.year]["suicides"] += (suicides);
        suicideData["World"][suiData.sex]["a" + suiData.age.replace(" ", "_")][suiData.year]["population"] += (population);
        suicideData[suiData.country][suiData.sex]["a" + suiData.age.replace(" ", "_")][suiData.year] = { suicides, population, popsuicides };

        years.add(suiData.year);
        ageGroups.add("a" + suiData.age.replace(" ", "_"));
    });

    //Following loops add all of the additional data to the year data structure.

    //density
    data[1].forEach(denData => {
        let country = denData.Country;

        if (yearData[country]) {
            for (let year = 1985; year <= 2016; year++) {

                if (denData[year]) {
                    if (!yearData[country][year]) {
                        yearData[country][year] = {};
                    }

                    yearData[country][year]["density"] = denData[year];
                }

            }
        }
    });

    //cellphone subscriptions
    data[2].forEach(cellData => {
        let country = cellData.Country;

        if (yearData[country]) {
            for (let year = 1985; year <= 2016; year++) {

                if (cellData[year]) {
                    if (!yearData[country][year]) {
                        yearData[country][year] = {};
                    }

                    yearData[country][year]["cellphone"] = cellData[year];
                }

            }
        }
    });

    //power consumption
    data[3].forEach(powData => {
        let country = powData.Country;

        if (yearData[country]) {
            for (let year = 1985; year <= 2016; year++) {

                if (powData[year]) {
                    if (!yearData[country][year]) {
                        yearData[country][year] = {};
                    }

                    yearData[country][year]["power"] = powData[year];
                }

            }
        }
    });

    //unemployment % of workforce
    data[4].forEach(unEmploymentData => {
        let country = unEmploymentData.Country;

        if (yearData[country]) {
            for (let year = 1985; year <= 2016; year++) {

                if (unEmploymentData[year]) {
                    if (!yearData[country][year]) {
                        yearData[country][year] = {};
                    }

                    yearData[country][year]["unemployment"] = unEmploymentData[year];
                }

            }
        }
    });


    //graph seciton asked for compilation of suicide over all ages and both sexes.
    //used this to also used to calculate ratio
    years.forEach(year => {

        Object.keys(suicideData).forEach(country => {

            if (yearData[country][year]) {
                let malePop = 0;
                let femalePop = 0;
                let maleSui = 0;
                let femaleSui = 0;
                let bothages = {};
                let bothpop = {};

                ageGroups.forEach(age => {
                    //checks there is data in sucides to compile the information.
                    if (suicideData[country]["male"][age] && suicideData[country]["male"][age][year]) {
                        malePop += parseInt(suicideData[country]["male"][age][year]["population"]);
                        femalePop += parseInt(suicideData[country]["female"][age][year]["population"]);
                        maleSui += parseInt(suicideData[country]["male"][age][year]["suicides"]);
                        femaleSui += parseInt(suicideData[country]["female"][age][year]["suicides"]);
                        bothpop[age] = parseInt(suicideData[country]["male"][age][year]["population"]) + parseInt(suicideData[country]["female"][age][year]["population"]);
                        bothages[age] = parseInt(suicideData[country]["male"][age][year]["suicides"]) + parseInt(suicideData[country]["female"][age][year]["suicides"]);
                    }
                });

                let population = malePop + femalePop;

                //checks to see if any data was found
                if (population > 0) {

                    //again checks to make sure the data structure is ready for more values.
                    if (!suicideData[country]["both"]) {
                        suicideData[country]["both"] = {};
                    }

                    if (!suicideData[country]["both"]["all"]) {
                        suicideData[country]["both"]["all"] = {};
                    }

                    if (!suicideData[country]["male"]["all"]) {
                        suicideData[country]["male"]["all"] = {};
                    }

                    if (!suicideData[country]["female"]["all"]) {
                        suicideData[country]["female"]["all"] = {};
                    }

                    //this was added late so graphs didn't need to add males/females together.
                    ageGroups.forEach(age => {
                        if (!suicideData[country]["both"][age]) {
                            suicideData[country]["both"][age] = {};
                        }

                        if (!suicideData[country]["both"][age][year]) {
                            suicideData[country]["both"][age][year] = { suicides: bothages[age], population: bothpop[age]};
                        }
                    });


                    //population already set do dermine if data was found.
                    let suicides = maleSui + femaleSui;

                    //Bellow we actually populate the rest of the information
                    suicideData[country]["both"]["all"][year] = { population, suicides };
                    suicideData[country]["female"]["all"][year] = {};
                    suicideData[country]["male"]["all"][year] = {};

                    suicideData[country]["female"]["all"][year]["population"] = femalePop;
                    suicideData[country]["male"]["all"][year]["population"] = malePop;

                    suicideData[country]["female"]["all"][year]["suicides"] = femaleSui;
                    suicideData[country]["male"]["all"][year]["suicides"] = maleSui;

                    yearData[country][year]["malePop"] = malePop;
                    yearData[country][year]["femalePop"] = femalePop;
                    yearData[country][year]["totalPop"] = population;

                    yearData[country][year]["maleSui"] = maleSui;
                    yearData[country][year]["femaleSui"] = femaleSui;
                    yearData[country][year]["totalSui"] = suicides;

                    //ratio is the % that males make up the total number of suicides
                    let ratio = (parseInt(maleSui) / parseInt(suicides) * 100).toFixed(1);

                    yearData[country][year]["ratio"] = ratio;
                }
            }

        });
    });


    //yearKeys moved together for reference (don't need console.log() now) again since not all data is available in
    //a given year we made this set to iterate over and update values even if are not present that year.
    yearKeys.add("gdp");
    yearKeys.add("malePop");
    yearKeys.add("femalePop");
    yearKeys.add("totalPop");
    yearKeys.add("maleSui");
    yearKeys.add("femaleSui");
    yearKeys.add("totalSui");
    yearKeys.add("density");
    yearKeys.add("cellphone");
    yearKeys.add("unemployment");
    yearKeys.add("power");
    yearKeys.add("ratio");

    //quick code for data analysis
    /*
    let totSui = 0;
    Object.keys(yearData["World"]).forEach(year => {
        totSui += yearData["World"][year]["totalSui"];
    });
    console.log("tot sui");
    console.log(totSui);
    */

    //broadcasts country selected
    //1 for primary country
    //2 for country that is only visible when comparing.
    function UpdateCountry(country, countryNum) {
        info.UpdateCountry(country, countryNum);
        graph.updateGraph("country" + countryNum, country);
        graph.updateGraph2("country" + countryNum, country);
    }

    function UpdateCountrySelecting(countryNum) {
        world.changeCountrySelect(countryNum);
    }

    //param is a bool true for display 2 countries false for only 1.
    function UpdateDualCountryView(display2countries) {
        // console.log(display2countries);
        info.UpdateDualCountryView(display2countries);
        world.switchChangeEnabled(display2countries);
    }

    //year is starting year, span is number of following years
    //span = 0 means we are only looking at the year in question
    function UpdateYear(year, span) {
        world.update("year", year);
        info.UpdateYear(year, span);
    }

    //updates selected age groups
    function UpdateAge(ageGroups) {
        world.update("age", ageGroups);
        graph.updateGraph("age", ageGroups);
    }

    //updates which sex is selected between male, female or both
    function UpdateSex(sex) {
        world.update("sex", sex);
        graph.updateGraph("sex", sex);
    }

    //story integer to inform story related text.
    function UpdateStory(storyNum) {
        info.UpdateStory(storyNum);
    }

    //Update Graph 2 
    function UpdateGraph2(value) {
        graph.updateGraph2("type", value);
    }

    //initialization of coding sections
    let world = new World(oData, UpdateCountry, yearData, suicideData);
    let graph = new Graph(suicideData, yearData, yearKeys, "both", "gdp");
    let info = new InfoPanel(suicideData, yearData, yearKeys, countryData, countryKeys, ageGroups);
    let ui = new UI(oData, UpdateYear, UpdateAge, UpdateSex, UpdateStory, UpdateDualCountryView, UpdateCountry, UpdateCountrySelecting, UpdateGraph2);

    //sends out initial information so that all sections show the same information.
    ui.initiallizePage();

    d3.json('./data/countriestopo.json').then(map => { world.drawWorld(map) });

});