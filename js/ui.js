class UI {

    constructor(data){

        d3.select("#ui").append("svg"); 
    }

//     <form>
//   <label for="fname">First name:</label><br>
//   <input type="text" id="fname" name="fname"><br>
//   <label for="lname">Last name:</label><br>
//   <input type="text" id="lname" name="lname">
// </form>




    // /**
    //  * Draws the year bar and hooks up the events of a year change
    //  */
    // drawYearBar() {

    //     // ******* TODO: PART 2 *******
    //     //The drop-down boxes are set up for you, but you have to set the slider to updatePlot() on activeYear change

    //     // Create the x scale for the activeYear;
    //     // hint: the domain should be max and min of the years (1800 - 2020); it's OK to set it as numbers
    //     // the plot needs to update on move of the slider

    //     /* ******* TODO: PART 3 *******
    //     You will need to call the updateYear() function passed from script.js in your activeYear slider
    //     */
    //     let that = this;

    //     //Slider to change the activeYear of the data
    //     let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 730]);

    //     let yearSlider = d3.select('#activeYear-bar')
    //         .append('div').classed('slider-wrap', true)
    //         .append('input').classed('slider', true)
    //         .attr('type', 'range')
    //         .attr('min', 1800)
    //         .attr('max', 2020)
    //         .attr('value', this.activeYear);

    //     let sliderLabel = d3.select('.slider-wrap')
    //         .append('div').classed('slider-label', true)
    //         .append('svg');

    //     let sliderText = sliderLabel.append('text').text(this.activeYear);

    //     sliderText.attr('x', yearScale(this.activeYear));
    //     sliderText.attr('y', 25);

    //     yearSlider.on('input', function () {
    //         sliderText.text(this.value);
    //         sliderText.attr("x", yearScale(this.value));
    //         //TODO - your code goes here -
    //         let c_content = d3.select('.dropdown-wrapper').select('#dropdown_c').select('.dropdown-content').select('select').node().value;
    //         let x_content = d3.select('.dropdown-wrapper').select('#dropdown_x').select('.dropdown-content').select('select').node().value;
    //         let y_content = d3.select('.dropdown-wrapper').select('#dropdown_y').select('.dropdown-content').select('select').node().value;
    //         that.updatePlot(this.value, x_content, y_content, c_content);
    //         that.updateYear(this.value);
    //         that.updateCountry(that.activeCountry);
    //     });
    // }


}