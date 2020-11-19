class InfoPanel {

    constructor(sdata, ydata)
    {
        this.yeardata = ydata;
        this.suicides = sdata;

        this.detailPanel = d3.select("#detail");

        this.initialPopulate();

        this.country = "";
        this.year = "1987";
        this.yearspan = 0;
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

    UpdateCountry(countryID)
    {
        this.country = countryID;

        this.UpdatePanel();
    }

    UpdateYear(year, span)
    {
        this.year = year;
        this.span = span;

        this.UpdatePanel();
    }

    UpdatePanel(){
        let detailPanel = d3.select("#detail");

        detailPanel.select("#country").text(this.country);

        if (this.yeardata[this.country]) {
            detailPanel.select("#pop").text(this.yeardata[this.country][this.year]["population"]);
            
            let suicides = this.findSuicides(this.country);
            detailPanel.select("#suicide").text(suicides);
        } else {
            detailPanel.select("#pop").text("N/A");
            detailPanel.select("#suicide").text("N/A");
        }
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