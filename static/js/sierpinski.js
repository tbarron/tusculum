/*
Next steps
 - see DODO (not in git)

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

// ----------------------------------------------------------------------------
// *** Classes
// The Loc class holds the row and column for a location in the grid/matrix
/*
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
*/

/*
// Offset holds a delta for row and col
class Offset {
    constructor(roff, coff) {
        this.roff = roff;
        this.coff = coff;
    }
}
*/

/*
// ----------------------------------------------------------------------------
// *** Data
var rows = 20;
var cols = 80;
var first_time = 1;
var colors = ["white", "black"];
var milliseconds = 0;
var tmo;
var running = false;
var cur, next;
var rxc;
var rxc_idx = 0;
var rxc_list;
var step_count = 0;
var where = new Loc(0, 0);

// ----------------------------------------------------------------------------
// *** Event handlers
// Handle sclabel mouseover, mouseout
/*
function sc_mouseover() {
    $("#sclabel").html("Reset");
}
function sc_mouseout() {
    $("#sclabel").html("Steps:");
}
function sc_click() {
    step_count = 0;
    $("#stepcount").val(step_count);
}
*/

// What to do with a click on a matrix cell
/*
function cell_click() {
    var rgx = /r(\d+)c(\d+)/;
    var rowcol = rgx.exec($(this).attr('id'));
    var cell = new Loc(parseInt(rowcol[1]), parseInt(rowcol[2]));
    if (cur[cell.row][cell.col] == undefined) {
        cur[cell.row][cell.col] = 0;
    }
    cur[cell.row][cell.col] = 1 - cur[cell.row][cell.col];
    cell.mark(colors[cur[cell.row][cell.col]]);
}

// Handle clicks on the Stop/Go button
function stopgo_click() {
    if ($("#stopgo").html() == "Stop") {
        $("#stopgo").html("Run");
        clearTimeout(tmo);
    } else {
        $("#stopgo").html("Stop");
        tmo = setTimeout(run_it, milliseconds);
    }
}

// Handle clicks on the Step button
function step_click() {
    step();
}

// Handle updates in the interval field
function interval_set() {
    milliseconds = parseInt($("#interval").val());
}

// ----------------------------------------------------------------------------
// *** Configuration setup functions
// Apply a list of offsets
function apply_list(row, col, offset_list, val) {
    for (idx in offset_list) {
        set_cell(cur,
                 row + offset_list[idx].roff,
                 col + offset_list[idx].coff,
                 val);
    }
}

var setter_up = {
    // clear the grid
    'clear': function() {
        clear_grid(cur);
    },

    // acorn
    'acorn': function() {
        var r = Math.floor(rows/2);
        var c = Math.floor(cols/2);
        var offl = [new Offset(0, 0),   new Offset(0, 1),    new Offset(-2, 1),
                    new Offset(-1, 3),  new Offset(0, 4),    new Offset(0, 5),
                    new Offset(0, 6)];
        apply_list(r, c, offl, 1);
    },

    // diehard
    'diehard': function() {
        var r = Math.floor(rows/2);
        var c = Math.floor(cols/2);
        var offl = [new Offset(0, 0),   new Offset(0, -1),   new Offset(1, 0),
                    new Offset(1, 4),   new Offset(1, 5),    new Offset(-1, 5),
                    new Offset(1, 6)];
        apply_list(r, c, offl, 1);
    },

    // glider
    'glider': function() {
        var r = 5;
        var c = 5;
        var offl = [new Offset(0, 0),   new Offset(0, 1),    new Offset(0, 2),
                    new Offset(-1, 2),  new Offset(-2, 1)];
        apply_list(r, c, offl, 1);
    },

    // glider gun
    'gun': function() {
        var r = 5;
        var c = 5;
        var offl = [new Offset(0, 0), new Offset(0, 1), new Offset(1, 0),
                    new Offset(1, 1),
                    new Offset(0, 10), new Offset(1, 10), new Offset(2, 10),
                    new Offset(-1, 11), new Offset(3, 11),
                    new Offset(-2, 12), new Offset(4, 12),
                    new Offset(-2, 13), new Offset(4, 13),
                    new Offset(1, 14),
                    new Offset(-1, 15), new Offset(3, 15),
                    new Offset(0, 16),  new Offset(1, 16), new Offset(2, 16),
                    new Offset(1, 17),
                    new Offset(0, 20),  new Offset(-1, 20), new Offset(-2, 20),
                    new Offset(0, 21),  new Offset(-1, 21), new Offset(-2, 21),
                    new Offset(1, 22),  new Offset(-3, 22),
                    new Offset(1, 24),  new Offset(2, 24), new Offset(-3, 24),
                    new Offset(-4, 24),
                    new Offset(-1, 34), new Offset(-2, 34), new Offset(-1, 35),
                    new Offset(-2, 35)];
        apply_list(r, c, offl, 1);
    },

    // dragon egg
    'puff': function() {
        var r = Math.floor(rows/2);
        var c = Math.floor(cols/2);
        var offl = [new Offset(0, 0), new Offset(-1, 0), new Offset(1, 0),
                    new Offset(-1, 1), new Offset(1, 1),
                    new Offset(-1,2), new Offset(1,2)];
        apply_list(r, c, offl, 1);
    },

    // random
    'random': function() {
        for (r = 0 ; r < rows ; r++) {
            for (c = 0 ; c < cols ; c++) {
                n = neighbors(r, c);
                t = threshold(n);
                set_cell(cur, r, c, (Math.random() < t) ? 1 : 0);
            }
        }
    },

    // r-pentomino
    'rpent': function() {
        var r = Math.floor(rows/2);
        var c = Math.floor(cols/2);
        var offl = [new Offset(0, 0),   new Offset(-1, 0),   new Offset(1, 0),
                    new Offset(-1, -1), new Offset(0, 1)];
        apply_list(r, c, offl, 1);
    },

    // spaceship
    'ship': function() {
        r = Math.floor(rows/2);
        c = 5;
        offl = [new Offset(0, 0), new Offset(0, 1), new Offset(0, 2),
                new Offset(0, 3), new Offset(1, 3), new Offset(2, 3),
                new Offset(1, -1), new Offset(3, -1), new Offset(3, 2)];
        apply_list(r, c, offl, 1);
    },
};

// Apply the setup function corresponding to the "#starts" selection
function apply_start() {
    which = $("#starts").val()
    if (which in setter_up) {
        setter_up[which]();
    } else {
        alert("'" + which + "' not found in setter_up");
    }
}

// ----------------------------------------------------------------------------
// *** Initializers, launcher, utilities, etc.
// Create the two dim array of cells
function create_array(length) {
    var arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = create_array.apply(this, args);
    }
    return arr;
}

// Initialize the matrix to all zeroes
function make_matrix(rows, cols) {
    var arr = create_array(rows, cols);
    for (r = 0 ; r < rows ; r++) {
        for (c = 0 ; c < cols ; c++) {
            arr[r][c] = 0;
        }
    }
    return arr;
}

// Returns a random integer in the range [low, high)
function random_int(low, high) {
    return Math.floor((high - low) * Math.random() + low);
}
*/

// Create the grid of cells in the table with id 'grid'
/*
function make_grid(rows, cols) {
    if (first_time) {
        first_time = 0;
    } else {
        $("#grid-container").removeChild($("#grid"));
        $("#grid-container").append("<table id='grid' border=1 width='100%'></table>");
    }
    var t = $("#grid");
    for (row = 0 ; row < rows ; row++) {
        t.append("<tr>");
        for (col = 0 ; col < cols ; col++) {
            var cell = new Loc(row, col);
            var txt = "<td height='6px' width='7px' id='" + cell.id() + "'></td>";
            t.append(txt);
            $(cell.jqid()).click(cell_click);
        }
        t.append("</tr>");
    }
}

// Map a number of neighbors to a probability
// neighbors      probability of life
//    < 2, 5           0.1
//      2, 4           0.2
//      3              0.3
//      5 <            0.0
function threshold(n) {
    if ((n < 2) || (n == 5)) {
        rval = 0.1;
    } else if ((n == 2) || (n == 4)) {
        rval = 0.2;
    } else if (n == 3) {
        rval = 0.3
    } else {
        rval = 0
    }
    return rval;
}

// Update the visible table from the invisible matrix
function update_grid(mtx) {
    for (rdx = 0 ; rdx < cur.length ; rdx++)  {
        for (cdx = 0 ; cdx < cur[rdx].length ; cdx++) {
            var loc = new Loc(rdx, cdx);
            loc.mark(colors[cur[rdx][cdx]]);
        }
    }
}
*/

// rxc
/*
function rxc_click() {
    rxc_idx = 1 - rxc_idx;
    $("#rxc").val(rxc_list[rxc_idx]);
}

function rxc_set() {
    var wh = $(window).height();
    var ww = $(window).width();
    rows = Math.floor((wh / 7) - 6);
    cols = Math.floor(ww / 7);
    rxc_list = ["" + rows + " x " + cols,
                "" + rows + " x " + cols + " (" + wh + "/" + ww + ")"];
    $("#rxc").val(rxc_list[rxc_idx]);
}

// Set a cell
function set_cell(mtx, row, col, val) {
    console.log(row, col);
    mtx[row][col] = val;
    var loc = new Loc(row, col);
    loc.mark(colors[val]);
}

// Clear the grid
function clear_grid(mtx) {
    for (rdx = 0 ; rdx < cur.length ; rdx++)  {
        for (cdx = 0 ; cdx < cur[rdx].length ; cdx++) {
            set_cell(mtx, rdx, cdx, 0);
        }
    }
}

// Count the number of live neighbors for [r, c]
function neighbors(r, c) {
    var total = 0;
    for (ri = Math.max(r-1, 0) ; ri <= Math.min(r+1, rows-1) ; ri++) {
        for (ci = Math.max(c-1, 0) ; ci <= Math.min(c+1, cols-1) ; ci++) {
            total = total + cur[ri][ci];
        }
    }
    total = total - cur[r][c];
    // console.log("neighbors(" + r + ", " + c + ") => " + total);
    return(total);
}

// Take one step
function step() {
    var cell;
    var tmp;
    var colors = ["white", "black"];
    for (r = 0 ; r < rows ; r++) {
        for (c = 0 ; c < cols ; c++) {
            n = neighbors(r, c);
            if (n == 3) {
                next[r][c] = 1;
            } else if (n != 2) {
                next[r][c] = 0;
            } else {
                next[r][c] = cur[r][c];
            }
        }
    }

    tmp = cur;
    cur = next;
    next = tmp;

    for (r = 0 ; r < rows ; r++) {
        for (c = 0 ; c < cols ; c++) {
            cell = new Loc(r, c);
            var cdx = cur[r][c];
            cell.mark(colors[cdx]);
        }
    }

    $("#stepcount").val(step_count++);
}

// This winds up being our tick function
function run_it() {
    step();
    tmo = setTimeout("run_it()", milliseconds);
}

// Initializes '#starts', the drop-down selection that provides
// starting configs
function start_init() {
    $("#starts").append("<option value='clear'>Clear</option>")
    $("#starts").append("<option disabled>───────────</option>")
    $("#starts").append("<option value='acorn'>Acorn</option>")
    $("#starts").append("<option value='diehard'>Diehard</option>")
    $("#starts").append("<option value='puff'>Dragon Egg</option>")
    $("#starts").append("<option value='glider'>Glider</option>")
    $("#starts").append("<option value='gun'>Glider Gun</option>")
    $("#starts").append("<option value='rpent'>R-Pentomino</option>")
    $("#starts").append("<option value='random'>Random</option>")
    $("#starts").append("<option value='ship'>Spaceship</option>")
    // $("#starts").append("<option value='zippy'>Unknown</option>")
}

// Set the value of the grid-container height and width
function gchw_set() {
    $("#gchw").val("" + $("#grid-container").height()
                      + ", " + $("#grid-container").width());
}

// Set the value of the canvas height and width
function cvhw_set() {
    $("#cvhw").val("" + $("#fld").height()
                      + ", " + $("#fld").width());
}

// ----------------------------------------------------------------------------
// *** main and ready
function main() {
    css();
    gchw_set();
    cvhw_set();
    rxc_set();
    start_init();
    milliseconds = parseInt($("#interval").val());
    make_grid(rows, cols);
    cur = make_matrix(rows, cols);
    next = make_matrix(rows, cols);
}

// CSS
function css() {
    var gc_margin = $("#controls").height() + 30;
    $("#rxc").val("" + $(window).height() + ", " + $("#grid-container").height());
    var gc_height = $(window).height() - gc_margin;
    $("#grid-container").css("border", "2px solid blue");
    $("#fld").css("border", "1px solid black");
    $("#fld").css("height", "" + gc_height);
    $("#controls").css("font-family", "Arial, Helvetica, sans-serif");
    $("#controls").css("font-size", "13px");
    $("#stopgo").css("width", "100px");
    $("#step").css("width", "100px");
    $("#sclabel").css("width", "75px");
    $("#clear").css("width", "100px");
    $("#rxc").css("border", "none");
    $("#stepcount").css("border", "none");
    $("#grid").css({'border': "1",
                    'border-collapse': 'collapse'});
}

// start here
$( window ).ready(function() {
    $(window).onresize = function(event) {
        var new_width = $(window).width();
        var new_height = $(window).height() - 50;
        $("#fld").css("height", "" + new_height);
        $("#fld").css("width", "" + new_width);
        gchw_set();
        cvhw_set();
    }
});

$( document ).ready(function() {
    alert("here we are");
    main();
});
*/

// ----------------------------------------------------------------------------
// resize canvas div and canvas
function content_resize() {
    var $controls = $("#controls");
    var $cdiv = $("#cdiv");
    var $fld = $("#fld");
    $cdiv.height($(window).height() - 20 - $controls.height());
    $fld.height($cdiv.height());
    $fld.width($cdiv.width());
    reportHW("gchw", "cdiv");
    reportHW("cvhw", "fld");
    reportHW("cthw", "controls");
}

// ----------------------------------------------------------------------------
// Generalized height/weight reporting routine
function reportHW(hud, subject) {
    var $hud = $("#" + hud);
    var $subject = $("#" + subject);
    $hud.val("" + $subject.height() + ", " + $subject.width());
}

// ----------------------------------------------------------------------------
// document ready calls this
function main() {
    $("#fld").css("border", "1px solid black");

    var $window = $(window).on('resize', gc_resize).trigger('resize');
/*
    var $window = $(window).on('resize', function() {
        gc_resize();
    }).trigger('resize');
*/
}

// ----------------------------------------------------------------------------
// Kick things off
$(document).ready(function() {
    main();
});
