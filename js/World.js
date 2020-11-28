
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
        
        this.maxlat = 83;
        this.width = 700;
        this.height = 600;
        this.rotate = 60;
        this.tlast = [0,0];
        this.slast = null;

        this.projection = d3.geoMercator()
            .rotate([this.rotate,0])
            .translate([this.width/2, this.height/2])
            .scale(1);

        this.colorScale = d3.scaleLinear()
            .domain([0 , d3.max(Object.values(yearData), d => (d[1985] ? d[1985].totalSui/d[1985].totalPop : 0))])
            .range(["lightgray", "red"]);
    }
    
    mercatorBounds(projection, maxlat) 
    {
        var yaw = this.projection.rotate()[0];
        var xymax = projection([-yaw+180-1e-6,-maxlat]);
        var xymin = projection([-yaw-180+1e-6, maxlat]);
        
        return [xymin,xymax];
    }

    drawWorld(world)
    {
        console.log(world);
        world = topojson.feature(world, world.objects['countriesold']);
        console.log(this.yearData);
        console.log(this.data);

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

        let svg = d3.select("#map").append("svg")
            .attr('width', this.width)
            .attr('height', this.height);

        let that = this;
        
        svg.append("g").attr("id", "mapDrawing");

        var b = this.mercatorBounds(this.projection, this.maxlat);
        var s = this.width/(b[1][0]-b[0][0]);
        this.scaleExtent = [s, 10*s];

        this.projection.scale(this.scaleExtent[0]);

        this.path = d3.geoPath().projection(this.projection);

        d3.select("#mapDrawing").selectAll('path')
            .data(countries)
            .join('path')
            .attr('d', this.path)
            .attr('class', 'boundary')
            .attr('align', 'center')
            .attr('id', d => d.name)
            .attr('fill', d=> d.yearData ? (d.yearData[1985] ? this.colorScale(d.yearData[1985].totalSui/d.yearData[1985].totalPop) : 'grey') : 'grey')
            .on('click', function ()
            {
                that.updateCountry(this.id);
            });

        
        let zoom = d3.zoom()
            .scaleExtent(this.scaleExtent)
            .on('zoom', () => {
                that.redraw(d3.event);
            });

        svg.call(zoom);
    }

    //A lot of this is taken from http://bl.ocks.org/patricksurry/6621971 for a scrolling map with wraparound
    redraw(event)
    {
        if(event)
        {
            var scale = event.transform.k;
            var t = [event.transform.x, event.transform.y];

            if (scale != this.slast) 
            {
                this.projection.scale(scale);
            }
            else
            {
                var dx = t[0] - this.tlast[0];
                var dy = t[1] - this.tlast[1];
                var yaw = this.projection.rotate()[0];
                var tp = this.projection.translate();

                this.projection.rotate([yaw+360.*dx/this.width*this.scaleExtent[0]/scale, 0, 0]);
                
                var b = this.mercatorBounds(this.projection, this.maxlat);

                if (b[0][1] + dy > 0) 
                    dy = -b[0][1];
                else if (b[1][1] + dy < this.height)
                    dy = this.height-b[1][1];

                this.projection.translate([tp[0], tp[1] + dy]);
            }

            this.slast = scale;
            this.tlast = t;

            d3.select("#mapDrawing").selectAll('path')
                .attr('d', this.path);
        }
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