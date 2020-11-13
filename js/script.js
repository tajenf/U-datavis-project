let data = d3.csv('./data/master.csv'); //simp 


Promise.all([data]).then(data => 
    {
        console.log(data);

        function updateCountry(countryId)
        {
            console.log("confirming this works");
            console.log(countryId);
        }

        let world = new World(data[0], updateCountry);
        let table = new Table(data[0]);
        let info = new InfoPanel(data[0]);

        d3.json('./data/world.json').then(map => { world.drawWorld(map)});

        

    });