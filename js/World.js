
// This class contains data used by the world in a format that's easy to access
class CountryData {

    constructor(type, name, data, geometry, yearData, suicideData) {
        this.type = type
        this.name = name;
        this.data = data;
        this.yearData = yearData;
        this.geometry = geometry;
        this.suicideData = suicideData;
    }
}

//This class represents the map view of the data set
class World {

    constructor(data, updateCountry, yearData, suicideData) {

        //data parameters
        this.data = data;
        this.yearData = yearData;
        this.updateCountry = updateCountry;
        this.suicideData = suicideData;

        //used for deciding which country should be selected
        this.selectCountryNum = 1;
        this.compareEnabled = false;

        //used for panning
        this.maxlat = 83;
        this.width = 900;
        this.height = 700;
        this.rotate = 60;
        this.tlast = [0, 0];
        this.slast = null;

        //heatmap settings
        this.year = 2011;
        this.sex = "Both";
        this.age = ["5-14 years", "15-24 years", "25-34 years", "35-54 years", "55-74 years", "75+ years"];

        //map projection
        this.projection = d3.geoMercator()
            .rotate([this.rotate, 0])
            .scale(1)
            .translate([this.width / 2, this.height / 2]);

        //determines the color scale of the data
        let max = 0;
        for (let i = 1985; i < 2017; i++) {
            let pot = d3.max(Object.values(yearData), d => (d[i] && d[i].totalPop ? d[i].totalSui / (d[i].totalPop / 100000) : 0));
            max = max > pot ? max : pot;
        }
        this.colorScale = d3.scaleLinear()
            .domain([0, 60])
            .range(["white", "red"]);
    }

    //called to change which country is being selected
    changeCountrySelect(num) {
        this.selectCountryNum = parseInt(num);
    }

    //called to change which country is being selected
    switchChangeEnabled(bool) {
        this.compareEnabled = bool;
    }

    //gives bounds for the projection
    mercatorBounds(projection, maxlat) {
        var yaw = this.projection.rotate()[0];
        var xymax = projection([-yaw + 180 - 1e-6, -maxlat]);
        var xymin = projection([-yaw - 180 + 1e-6, maxlat]);

        return [xymin, xymax];
    }

    //draws the world
    drawWorld(world) {


        world = topojson.feature(world, world.objects['countriesold']);

        //creates a countrydata object for each country
        let countries = [];
        let i, j;
        for (i in world.features) {
            let found = false;
            for (j in this.data) {

                if (this.data[j]["key"] == world.features[i].properties.ADMIN) {
                    countries.push(new CountryData(
                        world.features[i].type,
                        world.features[i].properties.ADMIN,
                        this.data[j]["value"],
                        world.features[i].geometry,
                        this.yearData[world.features[i].properties.ADMIN],
                        this.suicideData[world.features[i].properties.ADMIN]));

                    found = true;
                    break;
                }
            }

            if (!found) {
                countries.push(new CountryData(world.features[i].type, world.features[i].properties.ADMIN, undefined, world.features[i].geometry, undefined, undefined));
            }
        }


        let svg = d3.select("#map").append("svg")
            .attr('width', this.width)
            .attr('height', this.height);


        let that = this;

        svg.append("g").attr("id", "mapDrawing");

        //sets up initial scaling for map projection
        var b = this.mercatorBounds(this.projection, this.maxlat);
        var s = this.width / (b[1][0] - b[0][0]);
        this.scaleExtent = [s, 10 * s];

        this.slast = s;
        this.projection.scale(s);

        this.path = d3.geoPath().projection(this.projection);

        //binds data to and draws each country
        d3.select("#mapDrawing").selectAll('path')
            .data(countries)
            .join('path')
            .attr('d', this.path)
            .attr('class', 'boundary')
            .attr('align', 'center')
            .attr('id', d => d.name)
            .attr('fill', d => d.yearData ? (d.yearData[2011] && d.yearData[2011].totalPop ? this.colorScale(d.yearData[2011].totalSui / (d.yearData[2011].totalPop / 100000)) : 'grey') : 'grey')
            .on('click', function () {
                if (that.switchChangeEnabled) {
                    that.updateCountry(this.id, that.selectCountryNum);
                } else {
                    that.updateCountry(this.id, 1);
                }

            });

        //sets up zoom callback
        let zoom = d3.zoom()
            .scaleExtent(this.scaleExtent)
            .on('zoom', () => {
                that.redraw(d3.event);
            });

        svg.call(zoom).call(zoom.transform, d3.zoomIdentity.scale(s));

        this.drawLegend()
    }

    //A lot of this is taken from http://bl.ocks.org/patricksurry/6621971 for a scrolling map with wraparound
    //This function redraws the map on a zoom event, either moving it by letting it pan horizontally or zooming in or out
    redraw(event) {
        if (event) {
            var scale = event.transform.k;
            var t = [event.transform.x, event.transform.y];


            if (scale != this.slast) {
                this.projection.scale(scale);
            } else {
                var dx = t[0] - this.tlast[0];
                var dy = t[1] - this.tlast[1];
                var yaw = this.projection.rotate()[0];
                var tp = this.projection.translate();

                this.projection.rotate([yaw + 360. * dx / this.width * this.scaleExtent[0] / scale, 0, 0]);

                var b = this.mercatorBounds(this.projection, this.maxlat);

                if (b[0][1] + dy > 0)
                    dy = -b[0][1];
                else if (b[1][1] + dy < this.height)
                    dy = this.height - b[1][1];

                this.projection.translate([tp[0], tp[1] + dy]);
            }

            this.slast = scale;
            this.tlast = t;

            d3.select("#mapDrawing").selectAll('path')
                .attr('d', this.path);
        }
    }

    //draws the legend for the heatmap under the map
    drawLegend() {
        let svg = d3.select("#map-legend").append("svg")
            .attr('width', this.width)
            .attr('height', 100);


        svg.selectAll('rect').data(this.colorScale.ticks(60))
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 15)
            .attr('y', 10)
            .attr('width', 15)
            .attr('height', 20)
            .attr('fill', d => this.colorScale(d));

        svg.selectAll('text').data(this.colorScale.ticks(30))
            .enter()
            .append('text')
            .attr('x', (d, i) => i * 30)
            .attr('y', 45)
            .text(d => d);

        svg.append('text')
            .attr('x', 360)
            .attr('y', 70)
            .attr('font-size', 20)
            .attr('font-weight', 'bold')
            .text('Suicides per 100,000');

        svg.append('text')
            .attr('x', 410)
            .attr('y', 90)
            .attr('font-size', 12)
            .text('(of selected populus)');

        svg.append('rect')
            .attr('x', 75)
            .attr('y', 55)
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', 'grey');

        svg.append('text')
            .attr('x', 10)
            .attr('y', 65)
            .attr('font-weight', 'bold')
            .text('No data:');

    }

    //updates the heatmap
    update(type, param) {
        let that = this;

        //updates relevant variables for settings
        if (type == "sex") {
            this.sex = param;
        } else if (type == "age") {
            if (param == "all")
                this.age = ["5-14 years", "15-24 years", "25-34 years", "35-54 years", "55-74 years", "75+ years"];
            else {
                this.age = [];
                for (let value of param) {
                    if (value[1][1] == 1)
                        this.age.push(value[0]);
                }
            }
        } else if (type == "year") {
            this.year = param;
        }

        //determines new population and suicide values for each country based on parameters set above
        d3.select("#mapDrawing").selectAll('path')
            .attr('fill', function (d) {
                let pop = 0;
                let sui = 0;
                for (let i = 0; i < that.age.length; i++) {
                    let a = that.age[i];
                    if (d.suicideData) {
                        if (d.suicideData["male"] && d.suicideData["male"]["a" + a.replace(' ', '_')] && d.suicideData["female"]["a" + a.replace(' ', '_')][that.year]) {
                            if (that.sex == "both") {
                                pop += d.suicideData["female"]["a" + a.replace(' ', '_')][that.year]['population'];
                                pop += d.suicideData["male"]["a" + a.replace(' ', '_')][that.year]['population'];
                                sui += d.suicideData["female"]["a" + a.replace(' ', '_')][that.year]['suicides'];
                                sui += d.suicideData["male"]["a" + a.replace(' ', '_')][that.year]['suicides'];
                            } else {
                                pop += d.suicideData[that.sex]["a" + a.replace(' ', '_')][that.year]['population'];
                                sui += d.suicideData[that.sex]["a" + a.replace(' ', '_')][that.year]['suicides'];
                            }
                        }
                    }
                }
                return pop != 0 ? that.colorScale(sui / (pop / 100000)) : 'grey';
            });
    }
}