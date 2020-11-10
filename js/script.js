let data = d3.csv('./data/master.csv'); //simp 


Promise.all([data]).then(data => 
    {
        console.log(data);

        let world = new World(data[0]);
        let table = new Table(data[0]);

        d3.json('./data/world.json').then(map => { world.drawWorld(map)});

    });