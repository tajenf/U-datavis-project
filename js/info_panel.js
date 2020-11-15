class InfoPanel {

    constructor(data)
    {
        //console.log("data for info");
        //console.log(data);

        this.data = {};
        this.suicides = {}
        
        data.forEach(element => {
            
            if (!this.data[element.country]) {
                this.data[element.country] = {};
            }

            let population = element.population;
            let gdp = element["gdp_per_capita ($)"];

            this.data[element.country][element.year] = {population, gdp};

            if (!this.suicides[element.country]) {
                this.suicides[element.country] = {};
            }

            if (!this.suicides[element.country][element.year]) {
                this.suicides[element.country][element.year] = {};
            }

            if (!this.suicides[element.country][element.year][element.sex]) {
                this.suicides[element.country][element.year][element.sex] = {};
            }

            let suicides = parseInt(element.suicides_no);
            let popsuicides = parseFloat(element["suicides/100k pop"]);

            this.suicides[element.country][element.year][element.sex][element.age] = [suicides, popsuicides];
            
            
        });

        //console.log(this.suicides);

        this.detailPanel = d3.select("#detail");

        this.initialPopulate();

        this.year = "1987";
        this.sex = "both";
        this.age = "all";
    }

    initialPopulate()
    {
        let detailPanel = d3.select("#detail");

        detailPanel.classed("details");

        detailPanel.append("div").text("Country: ").classed("cat", true)
            .append("div").text("curCountry").attr('id', "country").classed("data", true);

        detailPanel.append("div").text("Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "suicide").classed("data", true);

            detailPanel.append("div").text("Population: ").classed("cat", true)
                .append("div").text("curPop").attr('id', "pop").classed("data", true);
    }

    updateInfo(countryID)
    {
        let detailPanel = d3.select("#detail");


        detailPanel.select("#country").text(countryID);

        if (this.data[countryID]) {
            detailPanel.select("#pop").text(this.data[countryID][this.year]["population"]);
            
            let suicides = this.findSuicides(countryID);
            detailPanel.select("#suicide").text(suicides);
        } else {
            detailPanel.select("#pop").text("N/A");
            detailPanel.select("#suicide").text("N/A");
        }
        

        //console.log(this.data[countryID]);
    }

    findSuicides(countryID)
    {
        if (this.sex === "both") {
            return this.calcSuicides(this.suicides[countryID][this.year]["male"]) + this.calcSuicides(this.suicides[countryID][this.year]["female"]);
        } else {
            return this.calcSuicides(this.suicides[countryID][this.year][this.sex]);
        }
    }

    calcSuicides(data)
    {
        //TODO only add specific ages
        let output = 0;
        Object.keys(data).forEach(key => {
            output += data[key][0];
        });
        return output;
    }
}