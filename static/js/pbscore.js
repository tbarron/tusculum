// ----------------------------------------------------------------------------
// This class provides an interface to the JS canvas drawing machinery.
class Context {
    // ------------------------------------------------------------------------
    constructor(canvas) {
        this.canvas = $(canvas).get(0);
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    // ------------------------------------------------------------------------
    beginPath() {
        this.ctx.beginPath();
    }

    // ------------------------------------------------------------------------
    clearField() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    // ------------------------------------------------------------------------
    closePath() {
        this.ctx.closePath();
    }

    // ------------------------------------------------------------------------
    drawCircle(cx, cy, radius, name) {
        this.ctx.moveTo(cx + radius, cy);
        this.ctx.arc(cx, cy, radius, 0, 2*Math.PI);
        this.ctx.stroke();
        this.ctx.fillText(name, cx, cy+7);
    }

    // ------------------------------------------------------------------------
    drawLine(start_x, start_y, end_x, end_y) {
        this.ctx.moveTo(start_x, start_y);
        this.ctx.lineTo(end_x, end_y);
    }

    // ------------------------------------------------------------------------
    fillCircle(cx, cy, radius, color) {
        var previous = this.ctx.fillStyle;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(cx + radius, cy);
        this.ctx.arc(cx, cy, radius, 0, 2*Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = previous;
    }

    // ------------------------------------------------------------------------
    fillText(str, cx, cy) {
        this.ctx.fillText(str, cx, cy);
    }

    // ------------------------------------------------------------------------
    setCTX(context) {
        this.ctx = context;
    }

    // ------------------------------------------------------------------------
    setFillStyle(color) {
        this.ctx.fillStyle = color;
    }

    // ------------------------------------------------------------------------
    setFont(font) {
        this.ctx.font = font;
    }

    // ------------------------------------------------------------------------
    setTextAlignment(value) {
        this.ctx.textAlign = value;
    }
}

// ----------------------------------------------------------------------------
// This class represents a player
class Player {
    // ------------------------------------------------------------------------
    constructor(name, pos_x, pos_y) {
        this.name = name;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
    }

    // ------------------------------------------------------------------------
    draw(ctx, serving) {
        if (this.name == serving) {
            ctx.fillCircle(this.pos_x, this.pos_y, 25, "LightGreen");
            ctx.fillText(this.name, this.pos_x, this.pos_y + 7);
        } else {
            ctx.drawCircle(this.pos_x, this.pos_y, 25, this.name);
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
            this.msg = "Team West wins! Game over";
            this.game_over = 1;
        } else if ((10 < this.east_score)
                   && (2 <= this.east_score - this.west_score)) {
            this.msg = "Team East wins! Game over";
            this.game_over = 1;
        }
    }

    // ------------------------------------------------------------------------
    // Draw the court
    //
    draw() {
        // var canvas = $("#pbCourt").get(0);
        // var ctx = canvas.getContext("2d");
        var ctx = new Context("#pbCourt");

        // ctx.fillStyle = "black";
        ctx.setFillStyle("black");

        // ctx.font = "20px Comic Sans MS";
        ctx.setFont("20px Comic Sans MS");

        // ctx.textAlign = "center";
        ctx.setTextAlignment("center");

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearField();
        for (var ldx = 0 ; ldx < this.lines.length ; ldx++) {
            var line = this.lines[ldx];
            ctx.drawLine(line[0], line[1], line[2], line[3]);
        }

        for (var pdx = 0 ; pdx < this.players.length ; pdx++) {
            this.players[pdx].draw(ctx, this.serving);
        }

        $("#ab_score").val(this.west_score);
        $("#cd_score").val(this.east_score);
        $("#server").val(this.serving);
        $("#servnum").val(this.servnum);
        $("#message").val(this.msg);
    }

    // ------------------------------------------------------------------------
    rally(winner) {
        if (this.game_over == 1) {
            this.msg += "\nGame over. Click Restart to play again.";
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
                this.msg = "Team East win the rally; service passes to "
                    + this.serving;
            } else if (this.serving == "O") {
                this.serving = "E";
                this.msg = "Team East win the rally; service passes to "
                    + this.serving;
            } else if (this.serving == "e") {
                this.serving = "o";
                this.msg = "Team West win the rally; service passes to "
                    + this.serving;
            } else if (this.serving == "o") {
                this.serving = "e";
                this.msg = "Team West win the rally; service passes to "
                    + this.serving;
            } else {
                alert("serverLoses: Court.serving (" +
                      this.serving +
                      ") should be A, B, C, or D");
            }
            this.servnum = 2;
        } else if (this.servnum == 2) {
            this.servnum = 1;
            if (this.servingTeam() == "west") {
                this.serving = this.ne;
                this.msg = "Team " + this.servingTeam()
                    + " win the rally; service passes to " + this.serving;
            } else if (this.servingTeam() == "east") {
                this.serving = this.sw;
                this.msg = "Team " + this.servingTeam()
                    + " win the rally; service passes to " + this.serving;
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
            this.msg = this.winMessage(this.servingTeam(), this.serving);
            // this.msg = "Team " + this.servingTeam() + " wins the rally "
            //     + " and scores a point. They swap places and " + court.serving
            //     + " continues serving.";
            [court.players[0].pos_y, court.players[1].pos_y] =
                [court.players[1].pos_y, court.players[0].pos_y];
        } else if (this.servingTeam() == "East") {
            this.east_score++;
            this.msg = this.winMessage(this.servingTeam(), this.serving);
            // this.msg = "Team East wins the rally and scores a point. They" +
            //     " swap places and " + court.serving + " continues serving.";
            [court.players[2].pos_y, court.players[3].pos_y] =
                [court.players[3].pos_y, court.players[2].pos_y];
        }
    }

    // ------------------------------------------------------------------------
    winMessage(team, player) {
        var rval = "Team " + team + " wins the rally and scores a point.  "
            + "They swap places and " + player + " continues serving.";

    }

    // ------------------------------------------------------------------------
    // Return "west" or "east" to indicate which team is serving
    //
    servingTeam() {
        if (this.serving == this.players[0].name) {
            return("West");
        } else if (this.serving == this.players[1].name) {
            return("West");
        } else if (this.serving == this.players[2].name) {
            return("East");
        } else if (this.serving == this.players[3].name) {
            return("East");
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
            return "West";
        } else {
            return "East";
        }
    }
}

// ----------------------------------------------------------------------------
// This function processes the next point based on the contents of the
// court structure
//
function advanceGame() {
    court.rally();
}

// ----------------------------------------------------------------------------
// Restart the game
//
function restartGame() {
    court = new Court();
    court.draw();
}

// ----------------------------------------------------------------------------
// Here we start: we draw the initial court at the start of the game
//
var court = new Court();

$(document).ready(function() {
    court.draw();
});
