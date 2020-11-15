class InfoPanel {

    constructor(data)
    {
        this.data = data;

        this.detailPanel = d3.select("#detail");

        this.initialPopulate();
    }

    initialPopulate()
    {
        let detailPanel = d3.select("#detail");

        detailPanel.classed("details");

        detailPanel.append("div").text("Country: ").classed("cat", true)
            .append("div").text("curCountry").attr('id', "country").classed("data", true);

        detailPanel.append("div").text("Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "suicide").classed("data", true);
    }

    updateInfo(countryID)
    {
        let detailPanel = d3.select("#detail");

        detailPanel.select("#country").text(countryID);
    }
}