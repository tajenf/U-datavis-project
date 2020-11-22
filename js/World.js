
class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, name, properties, geometry) {
        this.type = type
        this.name = name;
        this.properties = properties;
        this.geometry = geometry;
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
            for (j in this.data)
            {

                if (this.data[j]["country"] == world.features[i].properties.ADMIN)
                {
                    countries.push(new CountryData(world.features[i].type, world.features[i].properties.ADMIN, this.data[j], world.features[i].geometry));
                    found = true;
                    break;
                }
            }

            if (!found)
            {
                countries.push(new CountryData(world.features[i].type, world.features[i].properties.ADMIN, undefined, world.features[i].geometry));
            }
        }

        console.log(countries);

        let svg = d3.select("#map").append("svg");
        let container = d3.select('#map');
        let that = this;
        
        svg.append("g").attr("id", "mapDrawing");

        let path = d3.geoPath().projection(this.projection);

        d3.select("#mapDrawing").selectAll('path')
            .data(countries)
            .join('path')
            .attr('d', path)
            .attr('class', 'boundary')
            .attr('id', d => d.name)
            .on('click', function ()
            {
                that.updateCountry(this.id);
            });

        let zoom = d3.zoom()
            .scaleExtent([1,2])
            .translateExtent([[-500, -300], [1500, 1000]])
            .on('zoom', () => {
                svg.attr('transform', d3.event.transform)
            });

        container.call(zoom);
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