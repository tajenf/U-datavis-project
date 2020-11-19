class InfoPanel {

    constructor(sdata, ydata, ykeys, cdata, cKeys, ageGroups)
    {
        this.yearData = ydata;
        this.yearKeys = ykeys;
        this.suicideData = sdata;
        this.countryData = cdata;
        this.countryKeys = cKeys;
        this.ageGroups = ageGroups;

        console.log(this.ageGroups);

        this.detailPanel = d3.select("#detail");

        this.initialPopulate();



        this.country = "";
        this.year = "1987";
        this.yearSpan = 0;
    }

    initialPopulate()
    {
        let detailPanel = d3.select("#detail");

        detailPanel.classed("details");

        detailPanel.append("div").text("Country: ").classed("cat", true)
            .append("div").text("curCountry").attr('id', "country").classed("data", true);

        //forloop of country specific information

        detailPanel.append("div").text("year: ").attr('id', "yearlabel").classed("cat", true)
            .append("div").text("curCountry").attr('id', "year").classed("data", true);

        detailPanel.append("div").text("Total Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "totalSui").classed("data", true);

        detailPanel.append("div").text("Population: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "totalPop").classed("data", true);

        detailPanel.append("div").text("GDP: ").classed("cat", true)
            .append("div").text("curGDP").attr('id', "gdp").classed("data", true);

        let males = detailPanel.append('g').attr('id', "male");

        males.append("div").text("Male Population: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "malePop").classed("data", true);
            
        males.append("div").text("Total Male Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "maleSui").classed("data", true);
            
        males.append("div").text("Breakdown: ").classed("cat", true)

        males.append("div").text("-Ages 5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        males.append("div").text("-Ages 15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        males.append("div").text("-Ages 25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        males.append("div").text("-Ages 35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        males.append("div").text("-Ages 55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        males.append("div").text("-Ages 75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75+_years").classed("data", true);

        let females = detailPanel.append('g').attr('id', "female");

        females.append("div").text("Female Population: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "femalePop").classed("data", true);
            
        females.append("div").text("Total Female Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "femaleSui").classed("data", true);
            
        females.append("div").text("Breakdown: ").classed("cat", true)

        females.append("div").text("-Ages 5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        females.append("div").text("-Ages 15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        females.append("div").text("-Ages 25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        females.append("div").text("-Ages 35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        females.append("div").text("-Ages 55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        females.append("div").text("-Ages 75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75+_years").classed("data", true);

        
    }

    UpdateCountry(countryID)
    {
        this.country = countryID;

        this.UpdateAllInfo();
    }

    UpdateYear(year, span)
    {
        this.year = year;
        this.yearSpan = span;

        
        let detailPanel = d3.select("#detail");

        this.UpdateYearInfo(detailPanel);
        this.UpdateSuicides(detailPanel);
    }

    UpdateAllInfo()
    {
        let detailPanel = d3.select("#detail");

        detailPanel.select("#country").text(this.country);

        this.UpdateSuicides(detailPanel);
        
        this.UpdateYearInfo(detailPanel);
    }

    UpdateYearInfo(panel)
    {
        let yearlabel = panel.select("#yearlabel")
        let year = panel.select("#year");
        if (this.yearSpan == 0) {
            yearlabel.text("year: ");
            year.text(this.year);
        } else {
            yearlabel.text("years: ");
            year.text(`${this.year}-${this.year + this.yearSpan}`)
        }

        if (this.country == "") {
            return;
        }

        if (this.yearData[this.country] && this.yearData[this.country][this.year])
        {
            Object.keys(this.yearData[this.country][this.year]).forEach(key => {
                d3.select(`#${key}`).text(this.yearData[this.country][this.year][key]);
            });
        } else 
        {
            Object.keys(this.yearData[this.country][this.year]).forEach(key => {
                d3.select(`#${key}`).text("N/A");
            });
        }
    }

    UpdateSuicides(panel)
    {
        let male = panel.select("#male");
        let female = panel.select("#female");
        this.ageGroups.forEach( age =>
            {
                console.log(age);
                male.select(`#${age}`).text(this.suicideData[this.country]["male"][age][this.year]["suicides"]);
                female.select(`#${age}`).text(this.suicideData[this.country]["female"][age][this.year]["suicides"]);
            });  
    }
}