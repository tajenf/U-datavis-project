let data = d3.csv('./data/master.csv'); //simp 

Promise.all([data]).then(data => 
    {
        //oData is the organized data with each country having its own subarray
        let oData = [];
        let countryName = "";
        let startIndex = -1;
        let yearData = {};
        let suicideData = {};

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

        data[0].forEach(element => {
            
            if (!yearData[element.country]) {
                yearData[element.country] = {};
            }

            let population = element.population;
            let gdp = element["gdp_per_capita ($)"];

            yearData[element.country][element.year] = {population, gdp};

            if (!suicideData[element.country]) {
                suicideData[element.country] = {};
            }

            if (!suicideData[element.country][element.year]) {
                suicideData[element.country][element.year] = {};
            }

            if (!suicideData[element.country][element.year][element.sex]) {
                suicideData[element.country][element.year][element.sex] = {};
            }

            let suicides = parseInt(element.suicides_no);
            let popsuicides = parseFloat(element["suicides/100k pop"]);

            suicideData[element.country][element.year][element.sex][element.age] = [suicides, popsuicides];
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
        let info = new InfoPanel(suicideData, yearData);
        let ui = new UI(data[0]); 

        d3.json('./data/countries.geojson').then(map => { world.drawWorld(map)});

    });