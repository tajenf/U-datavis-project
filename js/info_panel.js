class InfoPanel {

    constructor(sdata, ydata)
    {
        //console.log("data for info");
        //console.log(data);

        this.yeardata = ydata;
        this.suicides = sdata;

        console.log(this.suicides);
        console.log(this.yeardata);

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

        if (this.yeardata[countryID]) {
            detailPanel.select("#pop").text(this.yeardata[countryID][this.year]["population"]);
            
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