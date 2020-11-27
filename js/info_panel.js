class InfoPanel {

    constructor(sdata, ydata, ykeys, cdata, cKeys, ageGroups)
    {
        this.yearData = ydata;
        this.yearKeys = ykeys;
        this.suicideData = sdata;
        this.countryData = cdata;
        this.countryKeys = cKeys;
        this.ageGroups = ageGroups;

        console.log(this.suicideData["World"]);
        console.log(this.suicideData["Brazil"]);

        this.initialPopulate();

        this.UpdateYear(1985, 2);
        this.UpdateCountry("World");
        this.UpdateStory(0);
    }

    initialPopulate()
    {
        let detailPanel = d3.select("#detail");

        detailPanel.classed("details");

        let CountryBlock = detailPanel.append('g');
        let StoryBlock = detailPanel.append('g');

        let maleBlock = detailPanel.append('g').attr('id', "male");
        let femaleBlock = detailPanel.append('g').attr('id', "female");

        CountryBlock.append("div").text("Country: ").classed("cat", true)
            .append("div").text("curCountry").attr('id', "country").classed("data", true);

        //forloop of country specific information

        let year = CountryBlock.append('g');
        year.append("div").text("year: ").attr('id', "yearlabel").classed("cat", true).style('display', 'inline');
        year.append("div").text("curYear").attr('id', "year").classed("data", true);

        CountryBlock.append("div").text("Total Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "totalSui").classed("data", true);

        CountryBlock.append("div").text("Population: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "totalPop").classed("data", true);

        CountryBlock.append("div").text("Suicides per 100k: ").classed("cat", true)
            .append("div").text("spk").attr('id', "suipk").classed("data", true);


        CountryBlock.append("div").text("GDP: ").classed("cat", true)
            .append("div").text("curGDP").attr('id', "gdp").classed("data", true);

        CountryBlock.append("div").text("Disclaimer: values like population and GDP will use the last year if you are looking at a span of years but suicides uses the total number in the span.").classed("disclaimer", true);

        
        StoryBlock.append('div').text("Story: ").classed("cat", true).attr('id', "title");

        StoryBlock.append('div').classed("story",true).attr('id', "story");


        maleBlock.append("div").text("Male Breakdown: ").classed("cat", true)

        maleBlock.append("div").text("Male Population: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "malePop").classed("data", true);
            
        maleBlock.append("div").text("Male Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "maleSui").classed("data", true);
            
        maleBlock.append("div").text("-Ages 5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        maleBlock.append("div").text("-Ages 15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        maleBlock.append("div").text("-Ages 25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        maleBlock.append("div").text("-Ages 35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        maleBlock.append("div").text("-Ages 55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        maleBlock.append("div").text("-Ages 75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_years").classed("data", true);

        

        femaleBlock.append("div").text("Female Breakdown: ").classed("cat", true)

        femaleBlock.append("div").text("Female Population: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "femalePop").classed("data", true);
            
        femaleBlock.append("div").text("Female Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "femaleSui").classed("data", true);

        femaleBlock.append("div").text("-Ages 5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        femaleBlock.append("div").text("-Ages 15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        femaleBlock.append("div").text("-Ages 25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        femaleBlock.append("div").text("-Ages 35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        femaleBlock.append("div").text("-Ages 55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        femaleBlock.append("div").text("-Ages 75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_years").classed("data", true);

        
    }

    UpdateCountry(countryID)
    {
        this.country = countryID;

        this.UpdateAllInfo();
    }

    UpdateYear(year, span)
    {
        this.year = parseInt(year);
        this.yearSpan = parseInt(span);

        if (this.country == "") {
            return;
        }
        let detailPanel = d3.select("#detail");

        this.UpdateYearInfo(detailPanel);
    }

    //updates country speific data then yearly data
    UpdateAllInfo()
    {
        let detailPanel = d3.select("#detail");

        detailPanel.select("#country").text(this.country);

        this.countryKeys.forEach(key => {
            //this.countryData[key];
        });

        this.UpdateYearInfo();
    }

    //updates information altered by years specifically
    UpdateYearInfo()
    {
        let panel = d3.select("#detail")

        let yearlabel = panel.select("#yearlabel")
        let year = panel.select("#year");
        if (this.yearSpan == 0) {
            yearlabel.text("year: ");
            year.text(this.year);
        } else {
            yearlabel.text("years: ");
            year.text(`${this.year}-${ this.year + this.yearSpan}`)
        }

        if (this.country == "") {
            return;
        }

        let pop;
        let sui;

        if (this.yearData[this.country] && this.yearData[this.country][this.year + this.yearSpan])
        {
            if (this.yearData[this.country][this.year + this.yearSpan]["totalPop"]) {
                pop = this.yearData[this.country][this.year + this.yearSpan]["totalPop"];
            }
            if (this.yearData[this.country][this.year + this.yearSpan]["totalSui"]) {
                sui = this.yearData[this.country][this.year + this.yearSpan]["totalSui"];
            }

            this.yearKeys.forEach(key => {
                if (key == "totalSui" && this.yearSpan > 0)
                {
                    let valueFound = false;
                    let totSui = 0;

                    for (let year = this.year; year <= this.year + this.yearSpan; year++)
                    {
                        if (this.yearData[this.country][year][key]) {
                            valueFound = true;
                            
                            totSui += parseInt(this.yearData[this.country][year][key]);
                        }
                    }

                    if (valueFound) {
                        panel.select(`#${key}`).text(new Intl.NumberFormat().format(totSui));
                    }
                    else
                    {
                        panel.select(`#${key}`).text("N/A");
                    }

                }
                else if (!this.yearData[this.country][this.year][key]) 
                {
                    panel.select(`#${key}`).text("N/A");
                }
                else if (Number.isInteger(this.yearData[this.country][this.year][key])) 
                {
                    panel.select(`#${key}`).text(new Intl.NumberFormat().format(this.yearData[this.country][this.year + this.yearSpan][key]));
                } else 
                {
                    panel.select(`#${key}`).text(this.yearData[this.country][this.year + this.yearSpan][key]);
                }
                
            });
        } else 
        {
            this.yearKeys.forEach(key => {
                panel.select(`#${key}`).text("N/A");
            });
        }

        //TODO set suicides per 100k

        this.UpdateAgeSuicides(panel);
    }

    UpdateStory(storyNum)
    {
        let panel = d3.select("#detail");

        let title = panel.select("#title");
        let text = panel.select("#story");

        let titlebase = "Story: ";

        switch (storyNum) {
            case 0:
                title.text(titlebase + "introduction");

                text.text("fill in later");
                break;
        
            default:
                
                break;
        }
    }

    UpdateAgeSuicides(panel)
    {
        let male = panel.select("#male");
        let female = panel.select("#female");
        this.ageGroups.forEach( age =>
            {
                let ageDivM = male.select(`#${age.replace('+', '')}`);
                let ageDivF = female.select(`#${age.replace('+', '')}`);

                if (!this.suicideData[this.country] || this.yearSpan == 0 && !this.suicideData[this.country]["male"][age] || (this.yearSpan == 0 && !this.suicideData[this.country]["male"][age][this.year])) {  //May need to expand to check there is data for this year
                    ageDivM.text("N/A");
                    ageDivF.text("N/A");
                    
                } else {
                    if (this.yearSpan == 0) {
                        ageDivM.text(new Intl.NumberFormat().format(
                                this.suicideData[this.country]["male"][age][this.year]["suicides"]));
                        ageDivF.text(new Intl.NumberFormat().format(
                                this.suicideData[this.country]["female"][age][this.year]["suicides"]));
                    } else {
                        let maleRecordFound = false;
                        let femaleRecordFound = false;
                        let maleSui = 0;
                        let femaleSui = 0;

                        for (let year = this.year; year <= this.year + this.yearSpan ; year++) {
                            if (this.suicideData[this.country]["male"][age][year]) {
                                maleSui += this.suicideData[this.country]["male"][age][year]["suicides"];
                                maleRecordFound = true;
                            }
                            if (this.suicideData[this.country]["female"][age][year]) {
                                femaleSui += this.suicideData[this.country]["female"][age][year]["suicides"];
                                femaleRecordFound = true;
                            }
                        }

                        let avgCatString = `--Avg per Year: `;

                        if (maleRecordFound) {
                            ageDivM.text(new Intl.NumberFormat().format(maleSui));
                            ageDivM.append("div").text(avgCatString).classed("cat", true)
                                .append("div").text(new Intl.NumberFormat().format(
                                    Math.round(maleSui/(this.yearSpan + 1)))).classed("data", true);
                        } else {
                            ageDivM.text("N/A");
                        }
                        
                        if (femaleRecordFound) {
                            ageDivF.text(new Intl.NumberFormat().format(femaleSui));
                            ageDivF.append("div").text(avgCatString).classed("cat", true)
                                .append("div").text(new Intl.NumberFormat().format(
                                    Math.round(femaleSui/(this.yearSpan + 1)))).classed("data", true);
                        } else {
                            ageDivF.text("N/A");
                        }
                    }
                }
            });  
    }
}