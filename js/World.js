
class CountryData {

    constructor(type, name, data, geometry, yearData) {
        this.type = type
        this.name = name;
        this.data = data;
        this.yearData = yearData;
        this.geometry = geometry;
    }
}


class World {

    constructor(data, updateCountry, yearData)
    {
        this.data = data;
        this.yearData = yearData;
        this.updateCountry = updateCountry;
        this.projection = d3.geoMercator().translate([500, 500]).scale([150]);


        this.colorScale = d3.scaleLinear()
            .domain([0 , d3.max(Object.values(yearData), d => (d[1985] ? d[1985].totalSui/d[1985].totalPop : 0))])
            .range(["lightgray", "red"]);
    }
    
    drawWorld(world)
    {
        console.log(world);
        console.log(this.yearData);
        console.log(this.data);
        //world = topojson.feature(world, world.objects.countries);

        let countries = [];
        let i,j;
        for(i in world.features)
        {
            let found = false;
            for (j in this.data)
            {

                if (this.data[j]["key"] == world.features[i].properties.ADMIN)
                {
                    countries.push(new CountryData(world.features[i].type, world.features[i].properties.ADMIN, this.data[j]["value"], world.features[i].geometry, this.yearData[world.features[i].properties.ADMIN]));
                    found = true;
                    break;
                }
            }

            if (!found)
            {
                countries.push(new CountryData(world.features[i].type, world.features[i].properties.ADMIN, undefined, world.features[i].geometry, undefined));
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
            .attr('fill', d=> d.yearData ? (d.yearData[1985] ? this.colorScale(d.yearData[1985].totalSui/d.yearData[1985].totalPop) : 'grey') : 'grey')
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