/*
Next steps
 - Remove reference to file jslife.css in jslife.html
 - Remove file jslife.css from git
 - Add a 'Clear' selection in the dropdown that will clear all cells
 - Remove the 'Clear' button
 - Add a Random initial state which gives each cell a 10% chance of
   being alive. If a cell has 2 neighbors, the chance of life
   increases to 20%. Three neighbors, 30%. Four, 20%. Five, 10%. Six
   or above, 0%.

 + Replace the Start Over button with a selection box offering
   different initial states
 + Should 'Clear' reset the step count to 0?
 + Remove the parenthesized height and width
 + Scale the number of rows to the height of the window
 + Turn off the border on the step count box and the rows x cols box
 + Move this to ~/prj/github/tusculum
 + Mark loc 0,0 black and init the program stopped with button set to 'Go'
 + Add a 'clear' button
 + A click on a cell should toggle its status from 0/white to 1/black or back
 + Clicking 'Clear' should set all cells to 0/white
 + Make the width of the stop/go button be constant, no matter what the text is
 + make the grid smaller so we can debug the code more easily
 + need cur and next matrixes
 + thoroughly debug neighbors()
 + change the id of the table from 'matrix' to 'grid' (or something) to prevent confusion
 + update run_it() to implement the life rules
 + add a 'Step' button
 + fix the width of the 'Step' button
 + fill in the right code for 'Step'
 + go back to the 20 by 80 grid
 + add an 'Interval' control to set the cycle interval
 + update 'stepcount' item with the step_count value
 + get millisecond value from 'interval' input
 + figure out how to speed up the calculation
 + how do I get the height of the window?
 + how do I get the width of the window?
 + Display the rows and cols in the form "<rows> x <cols>"
*/

// --- Classes
// The Loc class holds the row and column for a location in the grid/matrix
class Loc {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    // Returns the id for this location: "r<row>c<col>"
    id() {
        return("r" + this.row + "c" + this.col);
    }

    // Increment the location: col++ until the end of the row, then row++
    increment() {
        this.col = this.col + 1;
        if (cols <= this.col) {
            this.col = 0;
            this.row = this.row + 1;
        }
        if (rows <= this.row) {
            clearTimeout(tmo);
        }
    }

    // Returns the location id with '#' in front for jQuery
    jqid() {
        return "#" + this.id()
    }

    // Set the color of the cell at this location
    mark(color) {
        var cell_id = this.jqid(row, col);
        if ($(cell_id).css('background-color') != color) {
            $(cell_id).css('background-color', color);
        }
    }
}

// Offset holds a delta for row and col
class Offset {
    constructor(roff, coff) {
        this.roff = roff;
        this.coff = coff;
    }
}


    for (let idx = 0 ; idx < 7 ; idx++) {
        pday = (day <= 31) ? "" + day : "&nbsp;";
        rval += "<td>" + pday + "</td>";
        day++;
    }
    rval += "</tr>";
    return rval;
}

function month() {
    var day = 1;
    var rval = month_header();
    for (row = 0 ; row < 5 ; row++) {
        rval += month_row(day);
        day += 7;
    }
    return rval;
}

function weekday_list() {
    return(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
}

function rotate(list, count) {
    var rval = [];
    for (var idx = 0 ; idx < list.length ; idx++) {
        rval[count] = list[idx];
        count = (count+1) % list.length;
    }
    return rval;
}

function rd_table_row(year, wdl) {
    var aug01 = new Date(year, 7, 1, 0, 0, 0, 0);
    var day_name = wdl[aug01.getDay()];
    return "<tr><td>" + year + "<td>" + day_name + "</tr>";
}

function rd_by_year() {
    var now = new Date()
    var start_year = now.getYear() + 1900 - 5;
    var wdl = rotate(weekday_list(), 1);
    var rval = "";
    for (var year = start_year ; year < start_year + 20 ; year++) {
        rval = rval + rd_table_row(year, wdl);
    }
    return rval;
}

function set_weekdays(offset) {
    wdl = weekday_list();
    for (idx = 0 ; idx < 7 ; idx++) {
        bdx = (idx + offset) % 7
        sel = "#btn" + bdx;
        $(sel).text(wdl[idx]);
    }
}

$(document).ready(function() {
    var canvas = $(document).getElementById('JSlife');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);
});

alert('before');
var blarg = document.getElementById("JSlife");
var ctx = blarg.getContext("2d");
alert('after');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
ctx.stroke();
*/
