
class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, id, properties, geometry, region) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;
    }
}


class World {

    constructor(data, updateCountry)
    {
        this.data = data;
        this.updateCountry = updateCountry;
        this.projection = d3.geoMercator().translate([500, 500]).scale([150]);
    }
    
    drawWorld(world)
    {
        console.log(world);
        //world = topojson.feature(world, world.objects.countries);

        let countries = [];
        let i,j;
        for(i in world.features)
        {
            let found = false;
            for (j in this.nameArray)
            {

                if (this.nameArray[j] == world.features[i].id)
                {
                    countries.push(new CountryData(world.features[i].type, world.features[i].id, this.populationData[j], world.features[i].geometry, this.populationData[j].region));
                    found = true;
                    break;
                }
            }

            if (!found)
            {
                countries.push(new CountryData(world.features[i].type, world.features[i].id, undefined, world.features[i].geometry, undefined));
            }
        }

        let svg = d3.select("#map").append("svg");
        let that = this;
        
        svg.append("g").attr("id", "mapDrawing");

        let path = d3.geoPath().projection(this.projection);

        d3.select("#mapDrawing").selectAll('path')
            .data(countries)
            .join('path')
            .attr('d', path)
            .attr('class', 'boundary')
            .attr('id', d => d.id)
            .on('click', function ()
            {
                that.updateCountry(this.id);
            });
    }

    drawLegend()
    {

    }

    drawData()
    {
        
    }

    toggleHighlight()
    {

    }

    //don't know if we need this or not, just blocking out some code
    toggleStory()
    {

    }
}