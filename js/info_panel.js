class InfoPanel {

    //constructor saves class variables and calls populate
    constructor(sdata, ydata, ykeys, cdata, cKeys, ageGroups) {
        this.yearData = ydata;
        this.yearKeys = ykeys;
        this.suicideData = sdata;
        this.countryData = cdata;
        this.countryKeys = cKeys;
        this.ageGroups = ageGroups;

        this.transitionTime = 100;

        this.initialPopulate();
    }

    //creates each core block in infopanel
    //fully creates storyblcok with exception of UI elements.
    //adds disclaimer info at bottom and calls other methods to populate the various sections.
    initialPopulate() {
        let StoryBlock = d3.select("#detail").append('p').classed("storyBlock", true);

        StoryBlock.append('br');

        StoryBlock.append("div").attr("id", "story_div").classed('story', true);

        StoryBlock.append('br');

        StoryBlock.append('div').text("Story: ").classed("story-title", true).attr('id', "title");

        StoryBlock.append('div').classed("story", true).attr('id', "story");

        StoryBlock.append('br');
        StoryBlock.append('br');


        let detailPanel = d3.select("#detail").append('div');

        detailPanel.classed("info-wrapper", true);


        let CountryBlock2 = detailPanel.append('p').attr('id', "country2");
        let CountryBlock1 = detailPanel.append('p').attr('id', "country1");

        this.initCountryBlock(CountryBlock1);
        this.initCountryBlock(CountryBlock2);


        let suiBreakdown2 = CountryBlock2.append('g');
        let suiBreakdown1 = CountryBlock1.append('g');

        let disclaimer = d3.select("#detail").append('div').classed("disclaimer", true);
        disclaimer.append("div").text("Disclaimer: suicides per 100k is calculated by finding percentage of total populus that committed suicide times 100k");
        disclaimer.append("div").text("Links to Data Sources:");
        disclaimer.append("div").html("<a href='https://www.kaggle.com/russellyates88/suicide-rates-overview-1985-to-2016'>Suicide, population & GDP data</a>");
        disclaimer.append("div").html("<a href='https://data.worldbank.org/'>Rest of data found here</a>");

        this.initPopSui(suiBreakdown1);
        this.initPopSui(suiBreakdown2);

    }

    //initializes all country information providing ID's classes and everything for easy loops.
    //sadly had to hard code this to ensure correct ordering.
    initCountryBlock(block) {
        block.append("div").text("Country: ").classed("cat", true)
            .append("div").text("curCountry").attr('id', "country").classed("data", true);

        let year = block.append('g');
        year.append("div").text("Year: ").attr('id', "yearlabel").classed("cat", true).style('display', 'inline');
        year.append("div").text("curYear").attr('id', "year").classed("data", true);

        block.append("div").text("Total Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "totalSui").classed("data", true);

        let pop = block.append('g');
        pop.append("div").text(`Population: `).attr('id', "popYear").classed("cat", true).style('display', 'inline');
        pop.append("div").text("curPop").attr('id', "totalPop").classed("data", true);

        block.append("div").text("Male/Female Ratio: ").classed("cat", true)
            .append("div").text("M/F").attr('id', "ratio").classed("data", true);

        block.append("div").text("Suicides per 100k: ").classed("cat", true)
            .append("div").text("spk").attr('id', "suipk").classed("data", true);

        block.append("div").text("GDP: ").classed("cat", true)
            .append("div").text("curGDP").attr('id', "gdp").classed("data", true);

        block.append("div").text("Unemployment: ").classed("cat", true)
            .append("div").text("unemployment").attr('id', "unemployment").classed("data", true);

        block.append("div").text("Pop density: ").classed("cat", true)
            .append("div").text("density").attr('id', "density").classed("data", true);

        block.append("div").text("Power Consumption: ").classed("cat", true)
            .append("div").text("I have the power").attr('id', "power").classed("data", true);

        block.append("div").text("Cellular Subscriptions: ").classed("cat", true)
            .append("div").text("This ain't my dad").attr('id', "cellphone").classed("data", true);

        block.append('br');
    }

    //sets up suicide breakdown sections handling everything that isn't shared.
    initPopSui(block) {
        block.classed("info-wrapper", true);

        let maleBlock = block.append('g').attr('id', "male");
        let femaleBlock = block.append('g').attr('id', "female");


        maleBlock.append("div").text("Male Breakdown: ").classed("cat", true)

        maleBlock.append("div").text("M Pop: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "malePop").classed("data", true);

        maleBlock.append("div").text("M Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "maleSui").classed("data", true);

        this.initAgeBlocks(maleBlock);



        femaleBlock.append("div").text("Female Breakdown: ").classed("cat", true)

        femaleBlock.append("div").text("F Pop: ").classed("cat", true)
            .append("div").text("curPop").attr('id', "femalePop").classed("data", true);

        femaleBlock.append("div").text("F Suicides: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "femaleSui").classed("data", true);

        this.initAgeBlocks(femaleBlock);

    }

    //again couldn't loop over ages as they are not in the correct order so hard coded location to be safe
    //sets up the various ages to be easily grabbed.
    initAgeBlocks(block) {
        block.append('br');

        block.append('div').text("Ages Groups:").classed("cat", true);


        block.append("div").text("5-14 : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_years").classed("data", true);

        block.append("div").text("Suicides/100k : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a5-14_yearsspk").classed("data", true);

        block.append('br');

        block.append("div").text("15-24: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_years").classed("data", true);

        block.append("div").text("Suicides/100k : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a15-24_yearsspk").classed("data", true);

        block.append('br');

        block.append("div").text("25-34: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_years").classed("data", true);

        block.append("div").text("Suicides/100k : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a25-34_yearsspk").classed("data", true);

        block.append('br');

        block.append("div").text("35-54: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_years").classed("data", true);

        block.append("div").text("Suicides/100k : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a35-54_yearsspk").classed("data", true);

        block.append('br');

        block.append("div").text("55-74: ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_years").classed("data", true);

        block.append("div").text("Suicides/100k : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a55-74_yearsspk").classed("data", true);

        block.append('br');

        block.append("div").text("75+ : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_years").classed("data", true);

        block.append("div").text("Suicides/100k : ").classed("cat", true)
            .append("div").text("curSuicides").attr('id', "a75_yearsspk").classed("data", true);

        block.append('br');
    }

    //now looking at update functions

    //hides/reveals data based on if we are comparing countries.
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

    //updates class members and calls update view methods
    UpdateCountry(countryID, panelNum) {
        if (!panelNum) {
            panelNum = 1;
        }
        if (panelNum == 1) {
            this.country1 = countryID;
        } else {
            this.country2 = countryID;
        }

        //only update what has changed.
        this.UpdateCountryInfo(panelNum);
    }

    //updates class members and calls update view methods
    UpdateYear(year) {
        this.year = parseInt(year);

        //calls for both countries
        this.UpdateYearInfo(1);
        this.UpdateYearInfo(2);
    }

    //updates country speific data then yearly data
    UpdateCountryInfo(panelNum) {
        let detailPanel = d3.select("#detail");

        if (panelNum == 1) {
            detailPanel.select("#country1").select("#country").text(this.country1);
        } else {
            detailPanel.select("#country2").select("#country").text(this.country2);
        }

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

        year.text(this.year);


        let totSui = 0;
        let totPop = 0;

        if (this.yearData[country] && this.yearData[country][this.year]) {

            //can't trust every key will exist for country using yearkeys instead
            this.yearKeys.forEach(key => {
                let unit = "";
                let fixVal = 0;

                //sets generic values based on key
                switch (key) {
                    case "totalSui":
                        totSui = this.yearData[country][this.year][key];
                        break;

                    case "totalPop":
                        totPop = this.yearData[country][this.year][key];
                        break;

                    case "power":
                        unit = " (kw/capita)";
                        fixVal = 1;
                        break;

                    case "density":
                        unit = " (people/km\u00B2)";
                        fixVal = 2;
                        break;

                    case "unemployment":
                        unit = "% of labor force";
                        break;

                    default:
                        break;
                }

                if (!this.yearData[country][this.year][key]) {
                    //just checked end year. if span is 0 this will be skipped.
                    panel.select(`#${key}`).text("N/A");

                } else {
                    if (key == "ratio") {
                        let male = this.yearData[country][this.year][key];
                        let female = (100 - male).toFixed(1);
                        panel.select(`#${key}`).text(`${male}% / ${female}%`);
                    } else {
                        panel.select(`#${key}`).text((new Intl.NumberFormat().format(parseFloat(this.yearData[country][this.year][key]).toFixed(fixVal))) + unit);
                    }
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
            panel.select("#suipk").text("N/A");
        } else {
            panel.select("#suipk").text(new Intl.NumberFormat().format(suipk));
        }

        this.UpdateAgeSuicides(panelNum);
    }

    //updates story text
    UpdateStory(storyNum) {
        let panel = d3.select("#detail");

        let title = panel.select("#title");
        let text = panel.select("#story");

        let titlebase = "Story: ";

        switch (parseInt(storyNum)) {
            case 0:
                title.text(titlebase + "Introduction");

                text.text("Suicides are problem in our world.  Our data set, which lacks many countries of the world, has 236,484 suicides worldwide in 2011. " +
                    "From 1985-2016 our data set has 6,748,420. Every year hundreds of thousands of people take their own life.  In regards to 2018 the NIH (National Institute of Mental Health) said the following.")
                text.append('div').text("-\"Suicide was the tenth leading cause of death overall in the United States.\"-")
                text.append('div').text("-\"Suicide was the second leading cause of death among individuals between ages 10 and 34 (in the US).\"-")
                text.append('div').text("-\"There were more than two and a half times as many suicides in the US as there were homicides.\"-")

                text.append('div').text("Over 48,000 suicides in 2018 in the US alone.  While the US is bad in terms of number of suicides it is far from the worst of the countries we have records for." +
                    "  So we encourage you to take a look. explore the data we've collected and find something interesting.  Take a look at what we found and take a moment to think about how we can solve this together.");
                text.append('div').html("<a href='https://www.nimh.nih.gov/health/statistics/suicide.shtml#:~:text=Suicide%20was%20the%20tenth%20leading,ages%20of%2035%20and%2054.'>NIH article</a>");
                break;

            case 1:
                title.text(titlebase + "Male to Female Ratio");
                text.text("Across aboard males consistently commit suicide more often than females." +
                    "  In our data set there are 7 instances where females match or exceed the number of male suicides." +
                    "  Of those non of them take place on the same year or in the same country and in all cases females have at most 1 more suicide than males." +
                    "  Japan 1989 has the smallest ratio of male to female suicides with atleast 10,000 total suicides, with males accounting for 61.1% of the suicides." +
                    "  There are many theories on what can cause this.  Suicides related to male dominated occupations and the ideal male behavior to name two.");
                text.append('div').html("<a href='https://www.researchgate.net/publication/259114970_Suicide_by_occupation_Systematic_review_and_meta-analysis'>Suicide by Occupation article</a>");
                break;

            case 2:
                title.text(titlebase + "Urbanization");
                text.text("Some might be inclined to think that greater population density would lead to more conflict which would lead to more suicides.  Well this doesn't actually track, atleast not entirely.  " +
                    "Population density can have varying affects on suicide rates pending on many factors.  Urban living actually means men are less likely to commit suicide especially when it comes to young men.  " +
                    "Contraversely women actually have a higher suicide rate in urban areas especially in the 24-35 and 65+ age ranges.  While its true on the whole high urban areas have more suicides its mostly correlation not causation.  " +
                    "Take a look at Israel and Cyprus and you'll see that despite the high density the suicides per 100,000 are ont that bad.  Its important to remember that population density and urbanization are similar but not equivalent.");
                text.append('div').html("<a href='https://academic.oup.com/ije/article/34/4/846/692901'>Urbanicity and Suicide</a>");
                break;

            case 3:
                title.text(titlebase + "Suicide, a First World Problem?");
                text.text("Looking at the data we have it seems like the answer is yes but there is a lot of grey area." +
                    "  First the definition of a \"First World Country\".  Originally the term was used in the cold war to describe countries aligned with NATO/USA " +
                    "and opposed the Soviet Union.  Now the definition has shifted to highly developed or politically stable countries, which is wildly subjective.  " +
                    "Now looking at the data we have even with this vague definition there are still countries that come to mind; US, Canada, South Korea, and England to name four.  " +
                    "We can also think of a few 3rd world countries; Guatemala, Thailand, Jamaica and Cuba, to name four more.  Looking at most of these the argument for suicide being " +
                    "a first world problem is strong however, lets look at Cuba and England.  These seem to be outliers to the rule.  Cuba in particular has a very bad suicide rate, doing worse than most of the mentioned first world countries," +
                    " but it's been steadily dropping over the years.  England is on the upper end of par compared to most 3rd world countries which is pretty good.  All of this is made moot by the fact that developing countries are notorious " +
                    "for under-reporting.  With this in mind along with the problems listed above its hard to truly say \"Suicide is a First World Problem\".");
                text.append('div').html("<a href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1414701/'>Suicide in Developing Countries</a>");
                break;

            case 4:
                title.text(titlebase + "Explore!");
                text.text("Press this button and you'll slide through the years until you reach 2015.  Go ahead and select different countries then " +
                    "reselect this story.  You'll be able to see the country's information throughout the years all at once.  Now go explore and find something interesting to break the ice at your next party.");
                break;

            default:
                title.text(titlebase + "Unimplemented");
                text.text("unimplemented story");
                break;
        }
    }

    //
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
            let ageID = `#${age.replace('+', '')}`;

            let ageDivM = male.select(ageID);
            let ageDivF = female.select(ageID);
            let ageSpKM = male.select(`${ageID}spk`);
            let ageSpKF = female.select(`${ageID}spk`);

            //checks if data doesn't exist
            if (!this.suicideData[country] || !this.suicideData[country]["male"][age] || !this.suicideData[country]["male"][age][this.year]) {  //May need to expand to check there is data for this year
                ageDivM.text("N/A");
                ageDivF.text("N/A");
                ageSpKM.text("N/A");
                ageSpKF.text("N/A");

            } else {
                //update all age groups. is so pretty.
                ageDivM.text(new Intl.NumberFormat().format(
                    this.suicideData[country]["male"][age][this.year]["suicides"]));
                ageSpKM.text(new Intl.NumberFormat().format(
                    this.suicideData[country]["male"][age][this.year]["popsuicides"]));
                ageDivF.text(new Intl.NumberFormat().format(
                    this.suicideData[country]["female"][age][this.year]["suicides"]));
                ageSpKF.text(new Intl.NumberFormat().format(
                    this.suicideData[country]["female"][age][this.year]["popsuicides"]));

            }
        });
    }
}