let data = d3.csv('./data/master.csv'); //simp 

Promise.all([data]).then(data => 
    {
        //oData is the organized data with each country having its own subarray
        let oData = [];
        let countryName = "";
        let startIndex = -1;
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

        //the difference between the two data sets
        console.log(oData);
        console.log(data);

        let graph = new Graph(data[0]);
        let info = new InfoPanel(data[0]);
        let world = new World(oData, (country) => info.updateInfo(country));

        d3.json('./data/countries.geojson').then(map => { world.drawWorld(map)});

    });