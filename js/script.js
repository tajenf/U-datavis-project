let data = d3.csv('./data/master.csv'); //simp 

Promise.all([data]).then(data => 
    {
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
        let countryKeys = {};
        //all possible subkeys for yearly data
        let yearKeys = new Set();

        for (let i = 0; i < data[0].length; i++)
        {
            if (countryName == "")
            {
                countryName = data[0][i]["country"];
                startIndex = i;
            }
            if (countryName != data[0][i]["country"])
            {
                oData.push([{key:"country", value: countryName}, {key:"values", value: data[0].slice(startIndex, i)}]);
                countryName = "";
            }
        }

        let years = new Set();
        let ageGroups = new Set();

        data[0].forEach(element => {
            
            if (!yearData[element.country]) {
                yearData[element.country] = {};
            }

            let population = element.population;
            let gdp = element["gdp_per_capita ($)"];

            yearData[element.country][element.year] = {gdp};

            if (!suicideData[element.country]) {
                suicideData[element.country] = {};
            }

            if (!suicideData[element.country][element.sex]) {
                suicideData[element.country][element.sex] = {};
            }

            if (!suicideData[element.country][element.sex]["a" + element.age.replace(" ", "_")]) {
                suicideData[element.country][element.sex]["a" + element.age.replace(" ", "_")] = {};
            }

            let suicides = parseInt(element.suicides_no);
            let popsuicides = parseFloat(element["suicides/100k pop"]);

            suicideData[element.country][element.sex]["a" + element.age.replace(" ", "_")][element.year] = {suicides, popsuicides, population};

            years.add(element.year);
            ageGroups.add("a" + element.age.replace(" ", "_"));
        });

        yearKeys.add("gdp");
        yearKeys.add("malePop");
        yearKeys.add("femalePop");
        yearKeys.add("totalPop");
        yearKeys.add("maleSui");
        yearKeys.add("femaleSui");
        yearKeys.add("totalSui");

        years.forEach( year => {

            Object.keys(suicideData).forEach(country => {

                if(yearData[country][year])
                {
                    let malePop = 0;
                    let femalePop = 0;
                    let maleSui = 0;
                    let femaleSui = 0;

                    ageGroups.forEach(age => {
                        if(suicideData[country]["male"][age] && suicideData[country]["male"][age][year])
                        {
                            malePop += parseInt(suicideData[country]["male"][age][year]["population"]);
                            femalePop += parseInt(suicideData[country]["female"][age][year]["population"]);
                            maleSui += parseInt(suicideData[country]["male"][age][year]["suicides"]);
                            femaleSui += parseInt(suicideData[country]["female"][age][year]["suicides"]);
                        }
                    });

                    yearData[country][year]["malePop"] = malePop;
                    yearData[country][year]["femalePop"] = femalePop;
                    yearData[country][year]["totalPop"] = malePop + femalePop;

                    yearData[country][year]["maleSui"] = maleSui;
                    yearData[country][year]["femaleSui"] = femaleSui;
                    yearData[country][year]["totalSui"] = maleSui + femaleSui;
                }

                
            });
        });

        function UpdateCountry(country) {
            info.UpdateCountry(country);
        }

        //year is starting year, span is number of following years
        //span = 0 means we are only looking at the year in question
        function UpdateYear(year, span) {
            info.UpdateYear(year, span);
        }

        function UpdateAge(ageGroup) {
        }

        function UpdateSex(sex) {
        }

        //the difference between the two data sets
        //console.log(oData);
        //console.log(data);

        let world = new World(oData, UpdateCountry);
        let graph = new Graph(data[0]);
        let info = new InfoPanel(suicideData, yearData, yearKeys, countryData, countryKeys, ageGroups);

        d3.json('./data/countries.geojson').then(map => { world.drawWorld(map)});

    });