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

// --- Data
var rows = 20;
var cols = 80;
var first_time = 1;
var colors = ["white", "black"];
var milliseconds = 0;
var tmo;
var running = false;
var cur, next;
var rxc;
var step_count = 0;
var where = new Loc(0, 0);

// --- Event handlers
// Handle sclabel mouseover, mouseout
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

// What to do with a click on a matrix cell
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

// Handle clicks on the Clear button
function clear_click() {
    for (r = 0 ; r < rows ; r++) {
        for (c = 0 ; c < cols ; c++) {
            var cell = new Loc(r, c);
            cur[r][c] = 0;
            cell.mark(colors[cur[r][c]]);
        }
    }
}

function apply_start() {
    which = $("#starts").val()
    r = Math.floor(rows / 2);
    c = Math.floor(cols / 2);
    if (which == "rpent") {
        offsets = [new Offset(0, 0),   new Offset(-1, 0),   new Offset(1, 0),
                   new Offset(-1, -1), new Offset(0, 1)];
    } else if (which == "acorn") {
        offsets = [new Offset(0, 0),   new Offset(0, 1),    new Offset(-2, 1),
                   new Offset(-1, 3),  new Offset(0, 4),    new Offset(0, 5),
                   new Offset(0, 6)];
    } else if (which == "diehard") {
        offsets = [new Offset(0, 0),   new Offset(0, -1),   new Offset(1, 0),
                   new Offset(1, 4),   new Offset(1, 5),    new Offset(-1, 5),
                   new Offset(1, 6)];
    } else if (which == "glider") {
        r = 5;
        c = 5;
        offsets = [new Offset(0, 0),   new Offset(0, 1),    new Offset(0, 2),
                   new Offset(-1, 2),  new Offset(-2, 1)];
    } else if (which == "gun") {
        r = 5;
        c = 5;
        offsets = [new Offset(0, 0), new Offset(0, 1), new Offset(1, 0), new Offset(1, 1),
                   new Offset(0, 10), new Offset(1, 10), new Offset(2, 10),
                   new Offset(-1, 11), new Offset(3, 11),
                   new Offset(-2, 12), new Offset(4, 12),
                   new Offset(-2, 13), new Offset(4, 13),
                   new Offset(1, 14),
                   new Offset(-1, 15), new Offset(3, 15),
                   new Offset(0, 16),  new Offset(1, 16), new Offset(2, 16),
                   new Offset(1, 17),
                   new Offset(0, 20),  new Offset(-1, 20),  new Offset(-2, 20), 
                   new Offset(0, 21),  new Offset(-1, 21),  new Offset(-2, 21), 
                   new Offset(1, 22),  new Offset(-3, 22),
                   new Offset(1, 24),  new Offset(2, 24), new Offset(-3, 24), new Offset(-4, 24),
                   new Offset(-1, 34), new Offset(-2, 34), new Offset(-1, 35), new Offset(-2, 35)
                  ];
    } else if (which == 'ship') {
        c = 5;
        offsets = [new Offset(0, 0), new Offset(0, 1), new Offset(0, 2),
                   new Offset(0, 3), new Offset(1, 3), new Offset(2, 3),
                   new Offset(1, -1), new Offset(3, -1), new Offset(3, 2)];
    }
    for (idx in offsets) {
        set_cell(cur, r + offsets[idx].roff, c + offsets[idx].coff, 1);
    }
}

/*
// Handle clicks on the Start Over button
function restart_click() {
    main();
}
*/

// Handle clicks on the Step button
function step_click() {
    step();
}

// Handle updates in the interval field
function interval_set() {
    milliseconds = parseInt($("#interval").val());
}

    }
}

    }
}


