// ----------------------------------------------------------------------------
// Set up constants -- team names and player names
//
// Team names
const nameWest = "West";
const nameEast = "East";

// Player names
const name_e = "e";
const name_E = "E";
const name_o = "o";
const name_O = "O";

// ----------------------------------------------------------------------------
// This class provides an interface to the JS canvas drawing machinery.
//
class Context {
    // ------------------------------------------------------------------------
    // Initialize our context object with an underlying JS canvas and
    // drawing context
    //
    constructor(canvas) {
        this.canvas = $(canvas).get(0);
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    // ------------------------------------------------------------------------
    // Forward beginPath() calls to the underlying graphic context
    //
    beginPath() {
        this.ctx.beginPath();
    }

    // ------------------------------------------------------------------------
    // Clear the whole canvas
    //
    clearField() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    // ------------------------------------------------------------------------
    // Forward closePath() calls to the underlying graphic context
    //
    closePath() {
        this.ctx.closePath();
    }

    // ------------------------------------------------------------------------
    // Draw a circle centered at (*cx*, *cy*) of radius *radius*
    // filled with *color* and labeled with the text *name*.
    //
    drawCircle(cx, cy, radius, name, color) {
        var previous = this.ctx.fillStyle;
        this.ctx.moveTo(cx + radius, cy);
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, 2*Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = previous;
        this.ctx.fillText(name, cx, cy+7);
        this.ctx.stroke();
    }

    // ------------------------------------------------------------------------
    // Draw a line from point (*start_x*, *start_y*) to point (*end_x*, *end_y*)
    //
    drawLine(start_x, start_y, end_x, end_y) {
        this.ctx.moveTo(start_x, start_y);
        this.ctx.lineTo(end_x, end_y);
    }

    // ------------------------------------------------------------------------
    // Forward fillText() calls to the underlying context
    //
    fillText(str, cx, cy) {
        this.ctx.fillText(str, cx, cy);
    }

    // ------------------------------------------------------------------------
    // Set the fill style for the underlying context
    //
    setFillStyle(color) {
        this.ctx.fillStyle = color;
    }

    // ------------------------------------------------------------------------
    // Set the font for the underlying context
    //
    setFont(font) {
        this.ctx.font = font;
    }

    // ------------------------------------------------------------------------
    // Set text alignment for the underlying context
    //
    setTextAlignment(value) {
        this.ctx.textAlign = value;
    }

    // ------------------------------------------------------------------------
    // Forward stroke calls to the underlying context
    //
    stroke() {
        this.ctx.stroke();
    }
}

// ----------------------------------------------------------------------------
// This class represents a player
//
class Player {
    // ------------------------------------------------------------------------
    // Initialize a player's name and position
    //
    constructor(name, pos_x, pos_y) {
        this.name = name;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
    }

    // ------------------------------------------------------------------------
    // Draw a player's representation, which is a circle containing the
    // player's name ('E', 'O', 'e', or 'o'). If the player is serving, the
    // circle is filled with light green. Otherwise, it's white.
    //
    draw(serving) {
        var ctx = context.getInstance();
        if (this.name == serving) {
            ctx.drawCircle(this.pos_x, this.pos_y, 25, this.name,
                           "LightGreen");
        } else {
            ctx.drawCircle(this.pos_x, this.pos_y, 25, this.name,
                           "white");
        }
    }
}

// ----------------------------------------------------------------------------
// This class tracks everything about the court -- players, the next
// message to explain what's going on, the score, who is serving, and
// whether we're on server 1 or 2, and methods for drawing the court,
// drawing players, testing which team is serving, etc.
//
class Court {
    // ------------------------------------------------------------------------
    // Set up the court
    //
    constructor() {
        this.lines = Array(Array(440, 0, 440, 400),
                           Array(300, 0, 300, 400),
                           Array(580, 0, 580, 400),
                           Array(0, 200, 300, 200),
                           Array(580, 200, 880, 200));

        this.players = Array(new Player("O", 75, 100),
                             new Player("E", 75, 300),
                             new Player("e", 805, 100),
                             new Player("o", 805, 300));

        this.nw = this.players[0].name;
        this.sw = this.players[1].name;
        this.ne = this.players[2].name;
        this.se = this.players[3].name;

        this.msg = this.sw + " is the first server because of being "
            + "on the right side";
        this.west_score = 0;
        this.east_score = 0;
        this.serving = this.sw;
        this.servnum = 2;
        this.game_over = 0;
    }

    // ------------------------------------------------------------------------
    // Check for end of game
    //
    checkGameEnd() {
        if ((10 < this.west_score)
            && (2 <= this.west_score - this.east_score)) {
            this.msg = this.msgGameOver(nameWest);
            this.game_over = 1;
        } else if ((10 < this.east_score)
                   && (2 <= this.east_score - this.west_score)) {
            this.msg = this.msgGameOver(nameEast);
            this.game_over = 1;
        }
    }

    // ------------------------------------------------------------------------
    // Draw the court
    //
    draw() {
        var ctx = context.getInstance();

        ctx.setFillStyle("black");
        ctx.setFont("20px Comic Sans MS");
        ctx.setTextAlignment("center");
        ctx.clearField();

        for (var pdx = 0 ; pdx < this.players.length ; pdx++) {
            this.players[pdx].draw(this.serving);
        }

        ctx.beginPath();
        for (var ldx = 0 ; ldx < this.lines.length ; ldx++) {
            var line = this.lines[ldx];
            ctx.drawLine(line[0], line[1], line[2], line[3]);
        }
        ctx.closePath();
        ctx.stroke();

        $("#ab_score").val(this.west_score);
        $("#cd_score").val(this.east_score);
        $("#server").val(this.serving);
        $("#servnum").val(this.servnum);
        $("#message").val(this.msg);
    }

    // ------------------------------------------------------------------------
    // Generate a message about which team won the game
    //
    msgGameOver(team) {
        var rval = "Team " + team + " wins! Game over.";
        return rval;
    }

    // ------------------------------------------------------------------------
    // Generate a message about the serving team losing a rally
    //
    msgRally(team, player) {
        var rval = "Team " + team
            + " win the rally; service passes to " + player;
        return rval;
    }

    // ------------------------------------------------------------------------
    // Generate a message about the serving team winning a rally.
    //
    msgWin(team, player) {
        var rval = "Team " + team + " wins the rally and scores a point.  "
            + "They swap places and " + player + " continues serving.";
        return rval;
    }

    // ------------------------------------------------------------------------
    // Process a rally. If game is over and user has clicked a button,
    // expand the message to prompt a correct behavior on the user's
    // part. If the user has picked a winner, we land on the last
    // branch of the if-else. Otherwise, if winner is to be
    // randomized, we take the middle branch.
    //
    rally(winner) {
        if (1 <= this.game_over) {
            if (this.game_over < 2) {
                this.msg += "\nGame over. Click Restart to play again.";
                this.game_over++;
            }
        } else if (winner == 'random') {
            if (this.servingTeam() == this.winningTeam()) {
                this.serverWins();
            } else {
                this.serverLoses();
            }
            this.checkGameEnd();
        } else {
            if (this.servingTeam() == winner) {
                this.serverWins();
            } else {
                this.serverLoses();
            }
            this.checkGameEnd();
        }
        this.draw();
    }

    // ------------------------------------------------------------------------
    // The serving team has lost a rally. Update the court data appropriately
    //
    serverLoses() {
        if (this.servnum == 1) {
            if (this.serving == "E") {
                this.serving = "O";
                this.msg = msgRally(nameEast, this.serving);
            } else if (this.serving == "O") {
                this.serving = "E";
                this.msg = msgRally(nameEast, this.serving);
            } else if (this.serving == "e") {
                this.serving = "o";
                this.msg = msgRally(nameWest, this.serving);
            } else if (this.serving == "o") {
                this.serving = "e";
                this.msg = msgRally(nameEast, this.serving);
            } else {
                alert("serverLoses: Court.serving (" +
                      this.serving +
                      ") should be A, B, C, or D");
            }
            this.servnum = 2;
        } else if (this.servnum == 2) {
            this.servnum = 1;
            if (this.servingTeam() == nameWest) {
                this.serving = this.ne;
                this.msg = msgRally(this.servingTeam(), this.serving);
            } else if (this.servingTeam() == nameEast) {
                this.serving = this.sw;
                this.msg = msgRally(this.servingTeam(), this.serving);
            } else {
                alert("serverLoses: this.serving (" +
                      this.serving +
                      ") should be E, O, e, or o");
            }
        } else {
            alert("serverLoses: Court.servnum (" +
                  this.servnum +
                  ") should be 1 or 2");
        }
    }

    // ------------------------------------------------------------------------
    // Update the court to reflect the serving team winning a rally
    //
    serverWins() {
        if (this.servingTeam() == "West") {
            this.west_score++;
            this.msg = this.msgWin(this.servingTeam(), this.serving);
            [court.players[0].pos_y, court.players[1].pos_y] =
                [court.players[1].pos_y, court.players[0].pos_y];
        } else if (this.servingTeam() == nameEast) {
            this.east_score++;
            this.msg = this.msgWin(this.servingTeam(), this.serving);
            [court.players[2].pos_y, court.players[3].pos_y] =
                [court.players[3].pos_y, court.players[2].pos_y];
        }
    }

    // ------------------------------------------------------------------------
    // Return "west" or "east" to indicate which team is serving
    //
    servingTeam() {
        if (this.serving == this.players[0].name) {
            return(nameWest);
        } else if (this.serving == this.players[1].name) {
            return(nameWest);
        } else if (this.serving == this.players[2].name) {
            return(nameEast);
        } else if (this.serving == this.players[3].name) {
            return(nameEast);
        } else {
            alert("Invalid serving value : '" + this.serving + "'");
        }
    }

    // ------------------------------------------------------------------------
    // Return "west" or "east" to indicate which team wins rally based
    // on a virtual coin flip
    //
    winningTeam() {
        if (Math.random() < 0.50) {
            return nameWest;
        } else {
            return nameEast;
        }
    }
}

// ----------------------------------------------------------------------------
// Process a rally. User can specify which team should win ('West' or
// 'East') or if winner is 'random', the result will be randomized
//
function rally(winner) {
    court.rally(winner);
}

// ----------------------------------------------------------------------------
// Restart the game
//
function restartGame() {
    court = new Court();
    court.draw();
}

// ----------------------------------------------------------------------------
// Set up Context as a singleton object. The one instantiation is retrieved by
// doing
//
//       context.getInstance()
//
var context = (function () {
    var instance;

    return {
        getInstance: function () {
            if (!instance) {
                instance = new Context("#pbCourt");
            }
            return instance;
        }
    };
})();

// ----------------------------------------------------------------------------
// Here we start: we draw the initial court at the start of the game
//
var court = new Court();
$(document).ready(function() {
    court.draw();
});
