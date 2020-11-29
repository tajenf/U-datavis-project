class InfoPanel {

    constructor(sdata, ydata, ykeys, cdata, cKeys, ageGroups) {
        this.yearData = ydata;
        this.yearKeys = ykeys;
        this.suicideData = sdata;
        this.countryData = cdata;
        this.countryKeys = cKeys;
        this.ageGroups = ageGroups;

        this.transitionTime = 100;

        this.yearSpan = 0;

        this.initialPopulate();

        this.UpdateYear(2011);
        this.UpdateCountry("World", 1);
        this.UpdateCountry("World", 2);
        this.UpdateStory(0);
        this.UpdateDualCountryView(false);
    }

    initialPopulate() {
        let StoryBlock = d3.select("#detail").append('g');

        StoryBlock.append('br');

        StoryBlock.append('div').text("Story: ").classed("story-title", true).attr('id', "title");

        StoryBlock.append('div').classed("story", true).attr('id', "story");

        StoryBlock.append('br');
        StoryBlock.append('br');


        let detailPanel = d3.select("#detail").append('div');

        detailPanel.classed("info-wrapper", true);


        let CountryBlock2 = detailPanel.append('g').attr('id', "country2");
        let CountryBlock1 = detailPanel.append('g').attr('id', "country1");

        this.initCountryBlock(CountryBlock1);
        this.initCountryBlock(CountryBlock2);


        let suiBreakdown2 = CountryBlock2.append('g');
        let suiBreakdown1 = CountryBlock1.append('g');

        d3.select("#detail").append("div").text("Disclaimer:\n* uses ending population.\n** uses an average.\nSuicides as % is calculated using total suicides / ending pop").classed("disclaimer", true);

        this.initPopSui(suiBreakdown1);
        this.initPopSui(suiBreakdown2);

    }

    initCountryBlock(block) {
        block.append("div").text("Country: ").classed("cat", true)
            .append("div").text("curCountry").attr('id', "country").classed("data", true);

        let year = block.append('g');
        year.append("div").text("year: ").attr('id', "yearlabel").classed("cat", true).style('display', 'inline');
        year.append("div").text("curYear").attr('id', "year").classed("data", true);

        block.append("div").text("Total Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "totalSui").classed("data", true);

        let pop = block.append('g');
        pop.append("div").text(`Population on ${this.year}: `).attr('id', "popYear").classed("cat", true)
        pop.append("div").text("curPop").attr('id', "totalPop").classed("data", true);

        block.append("div").text("Suicides per 100k: ").classed("cat", true)
            .append("div").text("spk").attr('id', "suipk").classed("data", true);

        block.append("div").text("Suicides as % of Pop*: ").classed("cat", true)
            .append("div").text("%").attr('id', "percent").classed("data", true);

        block.append("div").text("GDP**: ").classed("cat", true)
            .append("div").text("curGDP").attr('id', "gdp").classed("data", true);

        block.append("div").text("Pop density (pop/km\u00B2)**: ").classed("cat", true)
            .append("div").text("density").attr('id', "density").classed("data", true);

        block.append("div").text("Unemployment**: ").classed("cat", true)
            .append("div").text("unemployment").attr('id', "unemployment").classed("data", true);

        block.append("div").text("Power Consumption**: ").classed("cat", true)
            .append("div").text("I have the power").attr('id', "power").classed("data", true);

        block.append("div").text("CellPhone**: ").classed("cat", true)
            .append("div").text("This ain't my dad").attr('id', "cellphone").classed("data", true);

        //TODO add other data sets
    }

    initPopSui(block) {
        block.classed("info-wrapper", true);

        let maleBlock = block.append('g').attr('id', "male");
        let femaleBlock = block.append('g').attr('id', "female");

        maleBlock.append('br');

        maleBlock.append("div").text("Male Breakdown: ").classed("cat", true)

        maleBlock.append("div").text("M Pop: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "malePop").classed("data", true);

        maleBlock.append("div").text("M Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "maleSui").classed("data", true);

        maleBlock.append('br');

        maleBlock.append('div').text("Ages Groups:").classed("cat", true);

        maleBlock.append("div").text("5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        maleBlock.append('br');

        maleBlock.append("div").text("15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        maleBlock.append('br');

        maleBlock.append("div").text("25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        maleBlock.append('br');

        maleBlock.append("div").text("35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        maleBlock.append('br');

        maleBlock.append("div").text("55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        maleBlock.append('br');

        maleBlock.append("div").text("75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_years").classed("data", true);

        maleBlock.append('br');


        femaleBlock.append('br');

        femaleBlock.append("div").text("Female Breakdown: ").classed("cat", true)

        femaleBlock.append("div").text("F Pop: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "femalePop").classed("data", true);

        femaleBlock.append("div").text("F Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "femaleSui").classed("data", true);


        femaleBlock.append('br');

        femaleBlock.append('div').text("Age Groups:").classed("cat", true);

        femaleBlock.append("div").text("5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        femaleBlock.append('br');

        femaleBlock.append("div").text("15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        femaleBlock.append('br');

        femaleBlock.append("div").text("25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        femaleBlock.append('br');

        femaleBlock.append("div").text("35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        femaleBlock.append('br');

        femaleBlock.append("div").text("55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        femaleBlock.append('br');

        femaleBlock.append("div").text("75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_years").classed("data", true);

    }

    UpdateDualCountryView(display2countries) {
        let country2 = d3.select("#detail").select("#country2");
        let sui2 = d3.select("#detail").select("#sui2");

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

    UpdateCountry(countryID, panelNum) {
        if (!panelNum) {
            panelNum = 1;
        }
        if (panelNum == 1) {
            this.country1 = countryID;
        } else {
            this.country2 = countryID;
        }

        this.UpdateAllInfo(panelNum);
    }

    UpdateYear(year) {
        this.year = parseInt(year);

        this.UpdateYearInfo(1);
        this.UpdateYearInfo(2);
    }

    //updates country speific data then yearly data
    UpdateAllInfo(panelNum) {
        let detailPanel = d3.select("#detail");

        if (panelNum == 1) {
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
    UpdateYearInfo(panelNum) {
        let panel = d3.select("#detail").select(`#country${panelNum}`)
        let country;
        if (panelNum == 1) {
            country = this.country1;
        } else {
            country = this.country2;
        }

        let year = panel.select("#year");

        panel.select("#popYear").text(`Population on ${this.year}: `);

        year.text(this.year);


        let totSui = 0;
        let totPop = 0;

        if (this.yearData[country] && this.yearData[country][this.year]) {

            this.yearKeys.forEach(key => {

                if (key == "totalSui") {
                    totSui = this.yearData[country][this.year][key];
                }

                if (key == "totalPop") {
                    totPop = this.yearData[country][this.year][key];
                }
                //if the key doesn't need to sum over a span do the following

                if (!this.yearData[country][this.year][key]) {
                    //just checked end year. if span is 0 this will be skipped.
                    panel.select(`#${key}`).text("N/A");

                } else {
                    if (key == "totalPop") {
                        totPop = this.yearData[country][this.year][key];
                    }
                    panel.select(`#${key}`).text(new Intl.NumberFormat().format(this.yearData[country][this.year][key]));
                }

            });
        } else {
            this.yearKeys.forEach(key => {
                panel.select(`#${key}`).text("N/A");
            });
        }

        let percent = totSui / totPop;
        let suipk = (percent * 100000).toFixed(2);

        if (!totPop || totPop <= 0) {
            panel.select("#percent").text("N/A");
        } else {
            panel.select("#suipk").text(new Intl.NumberFormat().format(suipk));
            panel.select("#percent").text(`${(percent * 100).toFixed(3)}%`);
        }

        this.UpdateAgeSuicides(panelNum);
    }

    UpdateStory(storyNum) {
        let panel = d3.select("#detail");

        let title = panel.select("#title");
        let text = panel.select("#story");

        let titlebase = "Story: ";

        switch (parseInt(storyNum)) {
            case 0:
                title.text(titlebase + "Introduction");

                text.text("Suicides are problem in our world.  Our data set, which lacks many countries of the world, has 472,968 suicides worldwide in 2011. From 1985-2016 our data set has 13,496,840. Every year hundreds of thousands of people take their own life.  In regards to 2018 the NIH (National Institute of Mental Health) said the following.")
                text.append('div').text("-\"Suicide was the tenth leading cause of death overall in the United States.\"-")
                text.append('div').text("-\"Suicide was the second leading cause of death among individuals between ages 10 and 34 (in the US).\"-")
                text.append('div').text("-\"There were more than two and a half times as many suicides in the US as there were homicides.\"-")

                text.append('div').text("Over 48,000 suicides in 2018 in the US alone.  While the US is bad in terms of number of suicides it is far from the worst of the countries we have records for." +
                    "  So we encourage you to take a look. explore the data we've collected and find something interesting.  Take a look at what we found and take a moment to think about how we can solve this together.");
                text.append('div').text("https://www.nimh.nih.gov/health/statistics/suicide.shtml#:~:text=Suicide%20was%20the%20tenth%20leading,ages%20of%2035%20and%2054.");
                break;

            case 1:
                title.text(titlebase + "Introduction");
                text.text("unimplemented story");
                break;

            case 2:
                title.text(titlebase + "Unimplemented");
                text.text("unimplemented story");
                break;

            case 3:
                title.text(titlebase + "Unimplemented");
                text.text("unimplemented story");
                break;

            case 4:
                title.text(titlebase + "Unimplemented");
                text.text("unimplemented story");
                break;

            default:
                title.text(titlebase + "Unimplemented");
                text.text("unimplemented story");
                break;
        }
    }

    UpdateAgeSuicides(panelNum) {
        let panel = d3.select("#detail").select(`#country${panelNum}`);
        let male = panel.select("#male");
        let female = panel.select("#female");

        let country;
        if (panelNum == 1) {
            country = this.country1;
        } else {
            country = this.country2;
        }

        this.ageGroups.forEach(age => {
            let ageDivM = male.select(`#${age.replace('+', '')}`);
            let ageDivF = female.select(`#${age.replace('+', '')}`);

            if (!this.suicideData[country] || !this.suicideData[country]["male"][age] || !this.suicideData[country]["male"][age][this.year]) {  //May need to expand to check there is data for this year
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

                    for (let year = this.year; year <= this.year + this.yearSpan; year++) {
                        if (this.suicideData[country]["male"][age][year]) {
                            maleSui += this.suicideData[country]["male"][age][year]["suicides"];
                            maleRecordFound = true;
                        }
                        if (this.suicideData[country]["female"][age][year]) {
                            femaleSui += this.suicideData[country]["female"][age][year]["suicides"];
                            femaleRecordFound = true;
                        }
                    }

                    let avgCatString = `Avg/Yr: `;

                    if (maleRecordFound) {
                        ageDivM.text(new Intl.NumberFormat().format(maleSui));
                        ageDivM.append("div").text(avgCatString).classed("cat", true)
                            .append("div").text(new Intl.NumberFormat().format(
                                Math.round(maleSui / (this.yearSpan + 1)))).classed("data", true);
                    } else {
                        ageDivM.text("N/A");
                    }

                    if (femaleRecordFound) {
                        ageDivF.text(new Intl.NumberFormat().format(femaleSui));
                        ageDivF.append("div").text(avgCatString).classed("cat", true)
                            .append("div").text(new Intl.NumberFormat().format(
                                Math.round(femaleSui / (this.yearSpan + 1)))).classed("data", true);
                    } else {
                        ageDivF.text("N/A");
                    }
                }
            }
        });
    }
}