class InfoPanel {

    constructor(sdata, ydata, ykeys, cdata, cKeys, ageGroups)
    {
        this.yearData = ydata;
        this.yearKeys = ykeys;
        this.suicideData = sdata;
        this.countryData = cdata;
        this.countryKeys = cKeys;
        this.ageGroups = ageGroups;

        this.transitionTime = 100;

        this.initialPopulate();

        this.UpdateYear(1985, 2);
        this.UpdateCountry("World",1);
        this.UpdateCountry("World",2);
        this.UpdateStory(0);
        this.UpdateDualCountryView(false);
    }

    initialPopulate()
    {
        let StoryBlock = d3.select("#detail").append('g');

        
        StoryBlock.append('div').text("Story: ").classed("cat", true).attr('id', "title");

        StoryBlock.append('div').classed("story",true).attr('id', "story");

        StoryBlock.append('br');


        let detailPanel = d3.select("#detail").append('div');

        detailPanel.classed("info-wrapper", true);


        let CountryBlock2 = detailPanel.append('g').attr('id', "country2");
        let CountryBlock1 = detailPanel.append('g').attr('id', "country1");

        let suiBreakdown2 = detailPanel.append('g').attr('id', "sui2");
        let suiBreakdown1 = detailPanel.append('g').attr('id', "sui1");

        this.initPopSui(suiBreakdown1);
        this.initPopSui(suiBreakdown2);

        let maleBlock = detailPanel.append('g').attr('id', "male");
        let femaleBlock = detailPanel.append('g').attr('id', "female");

        CountryBlock1.append("div").text("Country: ").classed("cat", true)
            .append("div").text("curCountry").attr('id', "country").classed("data", true);

        //forloop of country specific information

        let year = CountryBlock1.append('g');
        year.append("div").text("year: ").attr('id', "yearlabel").classed("cat", true).style('display', 'inline');
        year.append("div").text("curYear").attr('id', "year").classed("data", true);

        CountryBlock1.append("div").text("Total Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "totalSui").classed("data", true);

        CountryBlock1.append("div").text("Population: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "totalPop").classed("data", true);

        CountryBlock1.append("div").text("Suicides per 100k: ").classed("cat", true)
            .append("div").text("spk").attr('id', "suipk").classed("data", true);


        CountryBlock1.append("div").text("GDP: ").classed("cat", true)
            .append("div").text("curGDP").attr('id', "gdp").classed("data", true);

        CountryBlock1.append("div").text("Disclaimer: values like population and GDP will use the last year if you are looking at a span of years but suicides uses the total number in the span.").classed("disclaimer", true);

        
    }

    initPopSui(block)
    {
        block.classed("info-wrapper", true);

        let maleBlock = block.append('g').attr('id', "male");
        let femaleBlock = block.append('g').attr('id', "female");

        maleBlock.append('br');

        maleBlock.append("div").text("Male Breakdown: ").classed("cat", true)

        maleBlock.append("div").text("Male Pop: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "malePop").classed("data", true);
            
        maleBlock.append("div").text("Male Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "maleSui").classed("data", true);

        maleBlock.append('div').text("Ages:").classed("cat", true);
            
        maleBlock.append("div").text("-5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);
            
        maleBlock.append('br');

        maleBlock.append("div").text("-15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        maleBlock.append("div").text("-25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        maleBlock.append("div").text("-35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        maleBlock.append("div").text("-55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        maleBlock.append("div").text("-75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_years").classed("data", true);

        
        femaleBlock.append('br');

        femaleBlock.append("div").text("Female Breakdown: ").classed("cat", true)

        femaleBlock.append("div").text("Female Pop: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "femalePop").classed("data", true);
            
        femaleBlock.append("div").text("Female Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "femaleSui").classed("data", true);

        femaleBlock.append("div").text("-5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        femaleBlock.append("div").text("-15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        femaleBlock.append("div").text("-25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        femaleBlock.append("div").text("-35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        femaleBlock.append("div").text("-55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        femaleBlock.append("div").text("-75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_years").classed("data", true);

    }

    UpdateDualCountryView(display2countries)
    {
        let country2 =  d3.select("#detail").select("#country2");
        let sui2 =  d3.select("#detail").select("#sui2");
        if (display2countries) {
            country2.transition()
                .style('opacity', 1)
                .duration(this.transitionTime);
            sui2.transition()
                .style('opacity', 1)
                .duration(this.transitionTime);
        } else {
            country2.transition()
                .style('opacity', 0)
                .duration(this.transitionTime);
            sui2.transition()
                .style('opacity', 0)
                .duration(this.transitionTime);
        }
    }

    UpdateCountry(countryID, panelNum)
    {
        if (!panelNum) {
            panelNum = 1;
        }
        if (panelNum == 1)
        {
            this.country1 = countryID;
        } else {
            this.country2 = countryID;
        }

        this.UpdateAllInfo(panelNum);
    }

    UpdateYear(year, span)
    {
        this.year = parseInt(year);
        this.yearSpan = parseInt(span);

        this.UpdateYearInfo(1);
        this.UpdateYearInfo(2);
    }

    //updates country speific data then yearly data
    UpdateAllInfo(panelNum)
    {
        let detailPanel = d3.select("#detail");

        if (panelNum == 1)
        {
            detailPanel.select("#country1").select("#country").text(this.country1);
        } else {
            detailPanel.select("#country2").select("#country").text(this.country2);
        }
        
        

        this.countryKeys.forEach(key => {
            //this.countryData[key];
        });

        this.UpdateYearInfo(panelNum);
    }

    //updates information altered by years specifically
    UpdateYearInfo(panelNum)
    {
        let panel = d3.select("#detail").select(`#country${panelNum}`)
        let country;
        if (panelNum == 1) {
            country = this.country1;
        } else {
            country = this.country2;
        }

        let yearlabel = panel.select("#yearlabel")
        let year = panel.select("#year");
        if (this.yearSpan == 0) {
            yearlabel.text("year: ");
            year.text(this.year);
        } else {
            yearlabel.text("years: ");
            year.text(`${this.year}-${ this.year + this.yearSpan}`)
        }

        let pop;
        let sui;

        if (this.yearData[country] && this.yearData[country][this.year + this.yearSpan])
        {
            if (this.yearData[country][this.year + this.yearSpan]["totalPop"]) {
                pop = this.yearData[country][this.year + this.yearSpan]["totalPop"];
            }
            if (this.yearData[country][this.year + this.yearSpan]["totalSui"]) {
                sui = this.yearData[country][this.year + this.yearSpan]["totalSui"];
            }

            this.yearKeys.forEach(key => {
                if (key == "totalSui" && this.yearSpan > 0)
                {
                    let valueFound = false;
                    let totSui = 0;

                    for (let year = this.year; year <= this.year + this.yearSpan; year++)
                    {
                        if (this.yearData[country][year][key]) {
                            valueFound = true;
                            
                            totSui += parseInt(this.yearData[country][year][key]);
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
                else if (!this.yearData[country][this.year][key]) 
                {
                    panel.select(`#${key}`).text("N/A");
                }
                else if (Number.isInteger(this.yearData[country][this.year][key])) 
                {
                    panel.select(`#${key}`).text(new Intl.NumberFormat().format(this.yearData[country][this.year + this.yearSpan][key]));
                } else {
                    panel.select(`#${key}`).text(this.yearData[country][this.year + this.yearSpan][key]);
                }
                
            });
        } else {
            this.yearKeys.forEach(key => {
                panel.select(`#${key}`).text("N/A");
            });
        }

        //TODO set suicides per 100k

        this.UpdateAgeSuicides(panelNum);
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

    UpdateAgeSuicides(panelNum)
    {
        let panel = d3.select("#detail").select(`#sui${panelNum}`);
        let male = panel.select("#male");
        let female = panel.select("#female");

        let country;
        if (panelNum == 1) {
            country = this.country1;
        } else {
            country = this.country2;
        }

        this.ageGroups.forEach( age =>
            {
                let ageDivM = male.select(`#${age.replace('+', '')}`);
                let ageDivF = female.select(`#${age.replace('+', '')}`);

                if (!this.suicideData[country] || this.yearSpan == 0 && !this.suicideData[country]["male"][age] || (this.yearSpan == 0 && !this.suicideData[country]["male"][age][this.year])) {  //May need to expand to check there is data for this year
                    ageDivM.text("N/A");
                    ageDivF.text("N/A");
                    
                } else {
                    if (this.yearSpan == 0) {
                        ageDivM.text(new Intl.NumberFormat().format(
                                this.suicideData[country]["male"][age][this.year]["suicides"]));
                        ageDivF.text(new Intl.NumberFormat().format(
                                this.suicideData[country]["female"][age][this.year]["suicides"]));
                    } else {
                        let maleRecordFound = false;
                        let femaleRecordFound = false;
                        let maleSui = 0;
                        let femaleSui = 0;

                        for (let year = this.year; year <= this.year + this.yearSpan ; year++) {
                            if (this.suicideData[country]["male"][age][year]) {
                                maleSui += this.suicideData[country]["male"][age][year]["suicides"];
                                maleRecordFound = true;
                            }
                            if (this.suicideData[country]["female"][age][year]) {
                                femaleSui += this.suicideData[country]["female"][age][year]["suicides"];
                                femaleRecordFound = true;
                            }
                        }

                        let avgCatString = `--Avg/Yr: `;

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