// ----------------------------------------------------------------------------
// Set up constants -- team names, player names, HTML ids, text strings, etc.
//
// Attributes
const attr_DefaultInkColor = "black";
const attr_ServerColor = "yellow";
const attr_PlayerColor = "white";
const attr_WinColor = "green";
const attr_LoseColor = "red";
const attr_WinSize = "35px";
const attr_LoseSize = "20px";
const attr_PlayerFont = "20px Comic Sans MS";
const attr_CheerFont = "Comic Sans MS";
const attr_Empty = "";
const attr_PlayerAlign = "center";
const attr_Flat = "2d";

// CSS labels
const css_FontFamily = "font-family";
const css_FontSize = "font-size";
const css_Color = "color";

const js_FadeSpeed = "swing";

// Cheers
const cheer_Win = "Woohoo!";
const cheer_Lose = "Aww...";

// Team names
const nameWest = "West";
const nameEast = "East";

// Player names
const name_e = "e";
const name_E = "E";
const name_o = "o";
const name_O = "O";

// HTML id strings
const id_BtnHide = "#btn-hide";
const id_Description = "#description";
const id_EastCheer = "#east_cheer";
const id_Message = "#message";
const id_PBCourt = "#pbCourt";
const id_RcvScore = "#rt-score";
const id_Server = "#server";
const id_Servnum = "#srvnum";
const id_SrvScore = "#st-score";
const id_WestCheer = "#west_cheer";

// Text strings
const txt_Comma = ", ";
const txt_CommaOr = ", or ";
const txt_FirstSrv = " is the first server because of being on the right side " +
                    "of the court facing the net";
const txt_GameOver = "The game is over. Click Restart to play again.";
const txt_HideInst = "Hide Instructions";
const txt_ShowInst = "Show Instructions";
const txt_Invalid1 = "Invalid serving value : '";
const txt_Invalid2 = "' (should be '";
const txt_Random = "random";
const txt_Should = ") should be ";
const txt_Should12 = ") should be 1 or 2"
const txt_SQComma = "', '";
const txt_SQCommaOr = "', or '";
const txt_SQParen = "')";
const txt_SrvLoses1 = "serverLoses: with servnum = 1, (";
const txt_SrvLoses2 = "serverLoses: with servnum = 2, (";
const txt_SrvLoses3 = "serverLoses: this.servnum (";
const txt_SrvLoss = " win the rally; service passes to ";
const txt_SrvWin1 = " wins the rally and scores a point. They swap places and ";
const txt_SrvWin2 = " continues serving.";
const txt_Team = "Team ";
const txt_Win = " wins! Game over.";

var meetInterval;
var srvInterval;
var swapInterval;
var swapping = [0, 0];

// ----------------------------------------------------------------------------
// This object represents a position on the canvas
//
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    x() {
        return this.x;
    }

    y() {
        return this.y;
    }
}

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
        this.ctx = this.canvas.getContext(attr_Flat);
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
    drawCircle(cx, cy, radius, name, color, just_fill) {
        // this.ctx.beginPath();
        var previous = this.ctx.fillStyle;
        this.ctx.moveTo(cx + radius, cy);
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, 2*Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = previous;
        this.ctx.fillText(name, cx, cy+7);
        if (!just_fill) {
            this.ctx.stroke();
        }
        // this.ctx.closePath();
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
// The instructions describe the pickleball scoring tutor and
// pickleball scoring
//
class Instructions {
    // ------------------------------------------------------------------------
    // If visible is false, initialize the instructions as hidden.
    // Otherwise, initialize them to show up.
    //
    constructor(visible) {
        if (visible == false) {
            this.hide();
        } else {
            this.show();
        }
    }

    // ------------------------------------------------------------------------
    // Toggle instruction display state
    //
    toggle() {
        var cur = $(id_BtnHide).html();
        if (cur == txt_HideInst) {
            this.hide();
        } else {
            this.show();
        }
    }

    // ------------------------------------------------------------------------
    // Make the instructions appear
    //
    show() {
        $(id_Description).fadeIn();
        $(id_BtnHide).html(txt_HideInst);
    }

    // ------------------------------------------------------------------------
    // Make the instructions disappear
    //
    hide() {
        $(id_Description).fadeOut();
        $(id_BtnHide).html(txt_ShowInst);
    }
}

// ----------------------------------------------------------------------------
// The cheers show up over the court under the description of the
// rally outcome
//
class Cheer {
    // ------------------------------------------------------------------------
    // A Cheer has a string (value), color, and size. "Woohoo" is big
    // and green while "Aww..." is small and red.
    //
    constructor(value, color, size) {
        this.value = value;
        this.color = color;
        this.size = size;
    }
}

// ----------------------------------------------------------------------------
// This class represents a player
//
class Player {
    // ------------------------------------------------------------------------
    // Initialize a player's name and position
    //
    constructor(name, pos_x, pos_y, phantom) {
        this.name = name;
        this.pos = new Point(pos_x, pos_y);
        this.serving = false;
        this.phantom = phantom;
        if (this.phantom) {
            this.visible = false;
        } else {
            this.visible = true;
        }
        this.path = new Array();
        this.path_idx = -1;
    }

    // ------------------------------------------------------------------------
    // Extend a step to the player's path
    //
    addStep(point) {
        this.path.push(point);
        this.path_idx = 0;
    }

    // ------------------------------------------------------------------------
    // Reset the player's path
    //
    resetPath() {
        this.path = new Array();
        this.path_idx = -1;
    }

    // ------------------------------------------------------------------------
    hide() {
        this.visible = false;
    }

    // ------------------------------------------------------------------------
    show() {
        this.visible = true;
    }

    // ------------------------------------------------------------------------
    // Return the x element of the player's position
    //
    pos_x() {
        return(this.pos.x);
    }

    // ------------------------------------------------------------------------
    // Return the y element of the player's position
    //
    pos_y() {
        return(this.pos.y);
    }

    // ------------------------------------------------------------------------
    // Move the player to the next position on the path if there are any left
    //
    takeStep() {
        if (this.path_idx < 0) {
            return(0);
        } else if (this.path.length <= this.path_idx) {
            this.resetPath();
            return(0);
        } else {
            this.pos = this.path[this.path_idx];
            this.path_idx += 1;
            return(1);
        }
    }

    // ------------------------------------------------------------------------
    // Draw a player's representation, which is a circle containing the
    // player's name ('E', 'O', 'e', or 'o'). If the player is serving, the
    // circle is filled with yellow. Otherwise, it's white.
    //
    draw(serving) {
        var ctx = context.getInstance();
        if (! this.visible) {
            return;
        } else if (this.name == serving) {
            ctx.drawCircle(this.pos.x, this.pos.y, 25, this.name,
                           attr_ServerColor);
            this.serving = true;
        } else if (this.phantom) {
            ctx.drawCircle(this.pos.x, this.pos.y, 25, this.name,
                           attr_ServerColor, true);
        } else {
            ctx.drawCircle(this.pos.x, this.pos.y, 25, this.name,
                           attr_PlayerColor);
            this.serving = false;
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
        this.lines = Array(Array(0, 0, 0, 400),
                           Array(0, 400, 880, 400),
                           Array(880, 400, 880, 0),
                           Array(880, 0, 0, 0),
                           Array(440, 0, 440, 400),
                           Array(300, 0, 300, 400),
                           Array(580, 0, 580, 400),
                           Array(0, 200, 300, 200),
                           Array(580, 200, 880, 200));

        this.players = Array(new Player(name_O, 75, 100),
                             new Player(name_E, 75, 300),
                             new Player(name_e, 805, 100),
                             new Player(name_o, 805, 300));
        this.service_phantom = new Player("", 200, 100, true);

        this.nw = this.players[0];
        this.sw = this.players[1];
        this.ne = this.players[2];
        this.se = this.players[3];

        this.msg = this.sw.name + txt_FirstSrv;
        this.west_score = 0;
        this.east_score = 0;
        this.serving = this.players[1];
        this.servnum = 2;
        this.game_over = false;

        this.win_cheer = new Cheer(cheer_Win, attr_WinColor, attr_WinSize);
        this.loss_cheer = new Cheer(cheer_Lose, attr_LoseColor, attr_LoseSize);
    }

    // ------------------------------------------------------------------------
    // Check for end of game caching but not returning the result
    //
    // checkGameEnd() {
    //     if ((10 < this.west_score)
    //         && (2 <= this.west_score - this.east_score)) {
    //         this.msg = this.msgGameOver(nameWest);
    //         this.game_over = 1;
    //     } else if ((10 < this.east_score)
    //                && (2 <= this.east_score - this.west_score)) {
    //         this.msg = this.msgGameOver(nameEast);
    //         this.game_over = 1;
    //     }
    // 
    //     if (this.game_over == 1) {
    //         this.animateMeetAtNet(true);
    //     }
    // }

    // ------------------------------------------------------------------------
    // Check for end of game, caching and returning the result
    //
    gameOver() {
        this.game_over = false;
        if ((10 < this.west_score)
            && (2 <= this.west_score - this.east_score)) {
            this.msg = this.msgGameOver(nameWest);
            this.game_over = true;
        } else if ((10 < this.east_score)
                   && (2 <= this.east_score - this.west_score)) {
            this.msg = this.msgGameOver(nameEast);
            this.game_over = true;
        }
        return(this.game_over);
    }

    // ------------------------------------------------------------------------
    // Animate a player swap for the winning team
    //
    animatePlayerSwap(p1, p2) {
        var done = false;
        if (p1 != undefined) {
            swapping[0] = p1;
            swapping[1] = p2;

            for (var p of swapping) {
                if ((p.pos.x < 400) && (p.pos.y < 200)) {
                    for (var yval = 110 ; yval <= 300 ; yval += 10) {
                        p.addStep(new Point(75, yval));
                    }
                } else if ((p.pos.x < 400) && (200 < p.pos.y)) {
                    for (var yval = 290 ; 100 <= yval ; yval -= 10) {
                        p.addStep(new Point(75, yval));
                    }
                } else if ((400 < p.pos.x) && (p.pos.y < 200)) {
                    for (var yval = 110 ; yval <= 300 ; yval += 10) {
                        p.addStep(new Point(805, yval));
                    }
                } else if ((400 < p.pos.x) && (200 < p.pos.y)) {
                    for (var yval = 290 ; 100 <= yval ; yval -= 10) {
                        p.addStep(new Point(805, yval));
                    }
                }
            }

            swapInterval = setInterval( function() {
                court.animatePlayerSwap();
            }, 20 );
        } else {
            this.draw();

            var moved = 0;
            for (var p of swapping) {
                moved += p.takeStep();
            }

            if (moved <= 0) {
                clearInterval(swapInterval);
            }
        }
    }

    // ------------------------------------------------------------------------
    // Move the players to net for the end of the game
    //
    animateMeetAtNet(start) {
        if (start) {
            for (var p of this.players) {
                p.resetPath();
                if ((p.pos.x < 400) && (p.pos.y < 200)) {
                    // northwest
                    var yv = p.pos.y + 2;
                    for (var xv = p.pos.x + 10 ; xv <= 405 ; xv += 10) {
                        p.addStep(new Point(xv, yv));
                        yv += 2;
                    }
                } else if ((p.pos.x < 400) && (200 < p.pos.y)) {
                    // southwest
                    var yv = p.pos.y - 2;
                    for (var xv = p.pos.x + 10 ; xv <= 405 ; xv += 10) {
                        p.addStep(new Point(xv, yv));
                        yv -= 2;
                    }
                } else if ((400 < p.pos.x) && (p.pos.y < 200)) {
                    // northeast
                    var yv = p.pos.y + 2;
                    for (var xv = p.pos.x - 10 ; 470 <= xv ; xv -= 10) {
                        p.addStep(new Point(xv, yv));
                        yv += 2;
                    }
                } else if ((400 < p.pos.x) && (200 < p.pos.y)) {
                    var yv = p.pos.y - 2;
                    for (var xv = p.pos.x - 10 ; 470 <= xv ; xv -= 10) {
                        p.addStep(new Point(xv, yv));
                        yv -= 2;
                    }
                }
            }

            meetInterval = setInterval(function() {
                court.animateMeetAtNet(false);
            }, 20);
        } else {
            this.draw();

            var moved = 0;
            for (var p of this.players) {
                moved += p.takeStep();
            }

            if (moved <= 0) {
                clearInterval(meetInterval);
            }
        }
    }

    // ------------------------------------------------------------------------
    // Draw the court
    //
    draw() {
        var ctx = context.getInstance();

        ctx.setFillStyle(attr_DefaultInkColor);
        ctx.setFont(attr_PlayerFont);
        ctx.setTextAlignment(attr_PlayerAlign);
        ctx.clearField();

        for (var pdx = 0 ; pdx < this.players.length ; pdx++) {
            this.players[pdx].draw(this.serving.name);
        }
        this.service_phantom.draw();
        
        ctx.beginPath();
        for (var ldx = 0 ; ldx < this.lines.length ; ldx++) {
            var line = this.lines[ldx];
            ctx.drawLine(line[0], line[1], line[2], line[3]);
        }
        ctx.closePath();
        ctx.stroke();

        if (this.servingTeam() == nameWest) {
            $(id_SrvScore).val(this.west_score);
            $(id_RcvScore).val(this.east_score);
        } else {
            $(id_SrvScore).val(this.east_score);
            $(id_RcvScore).val(this.west_score);
        }

        $(id_Server).val(this.serving.name);
        $(id_Servnum).val(this.servnum);
        $(id_Message).val(this.msg);
    }

    // ------------------------------------------------------------------------
    // Generate a message about which team won the game
    //
    msgGameOver(team) {
        var rval = txt_Team + team + txt_Win;
        return rval;
    }

    // ------------------------------------------------------------------------
    // Generate a message about the serving team losing a rally
    //
    msgRally(team, player) {
        var rval = txt_Team + team + txt_SrvLoss + player;
        return rval;
    }

    // ------------------------------------------------------------------------
    // Generate a message about the serving team winning a rally.
    //
    msgWin(team, player) {
        var rval = txt_Team + team + txt_SrvWin1 + player + txt_SrvWin2;
        return rval;
    }

    // ------------------------------------------------------------------------
    // Process a rally. If game is over and user has clicked a button,
    // update the message to remind the user that the game is over and
    // to prompt a correct behavior on the user's part. If the user
    // has picked a winner for the rally, we land on the last branch
    // of the if-else. Otherwise, if winner is to be randomized, we
    // take the middle branch.
    //
    rally(winner) {
        if (1 <= this.game_over) {
            if (this.game_over < 2) {
                this.msg = txt_GameOver;
                this.game_over++;
            }
        } else if (winner == txt_Random) {
            if (this.servingTeam() == this.winningTeam()) {
                this.serverWins();
            } else {
                this.serverLoses();
            }
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
            if (this.serving.name == name_E) {
                startServerTransition(this.players[1].pos,
                                      this.players[0].pos);
                // this.serving = name_O;
                this.serving = this.players[0];
                this.msg = this.msgRally(nameEast, this.serving);
                this.setCheers(this.loss_cheer, this.win_cheer);
            } else if (this.serving == name_O) {
                startServerTransition(this.players[0].pos,
                                      this.players[1].pos);
                // this.serving = name_E;
                this.serving = this.players[1];
                this.msg = this.msgRally(nameEast, this.serving);
                this.setCheers(this.loss_cheer, this.win_cheer);
            } else if (this.serving == name_e) {
                startServerTransition(this.players[2].pos,
                                      this.players[3].pos);
                // this.serving = name_o;
                this.serving = this.players[3];
                this.msg = this.msgRally(nameWest, this.serving);
                this.setCheers(this.win_cheer, this.loss_cheer);
            } else if (this.serving == name_o) {
                startServerTransition(court.players[3].pos,
                                      court.players[2].pos);
                //this.serving = name_e;
                this.serving = this.players[2];
                this.msg = this.msgRally(nameWest, this.serving);
                this.setCheers(this.win_cheer, this.loss_cheer);
            } else {
                alert(txt_SrvLoses1 + this.serving
                      + txt_Should + name_E
                      + txt_Comma + name_O
                      + txt_Comma + name_e
                      + txt_CommaOr + name_o);
            }
            this.servnum = 2;
        } else if (this.servnum == 2) {
            this.servnum = 1;
            if (this.servingTeam() == nameWest) {
                startServerTransition(this.serving.pos, this.ne.pos);
                this.serving = this.ne;
                this.msg = this.msgRally(this.servingTeam(), this.serving);
                this.setCheers(this.loss_cheer, this.win_cheer);
            } else if (this.servingTeam() == nameEast) {
                startServerTransition(this.serving.pos, this.sw.pos);
                this.serving = this.sw;
                this.msg = this.msgRally(this.servingTeam(), this.serving);
                this.setCheers(this.win_cheer, this.loss_cheer);
            } else {
                alert(txt_SrvLoses2 + this.servingTeam()
                      + txt_Should + nameEast
                      + txt_Or + nameWest);
            }
        } else {
            alert(txt_SrvLoses3 + this.servnum + txt_Should12);
        }
    }

    // ------------------------------------------------------------------------
    // Update the court to reflect the serving team winning a rally
    //
    serverWins() {
        if (this.servingTeam() == nameWest) {
            this.west_score++;
            this.setCheers(this.win_cheer, this.loss_cheer);
            this.msg = this.msgWin(this.servingTeam(), this.serving);
            if (this.gameOver()) {
                this.animateMeetAtNet(true);
            } else {
                this.swapPosition(this.players[0],
                                  this.players[1],
                                  this.servingTeam());
            }
        } else if (this.servingTeam() == nameEast) {
            this.east_score++;
            this.setCheers(this.loss_cheer, this.win_cheer);
            this.msg = this.msgWin(this.servingTeam(), this.serving);
            if (this.gameOver()) {
                this.animateMeetAtNet(true);
            } else {
                this.swapPosition(this.players[2],
                                  this.players[3],
                                  this.servingTeam());
            }
        }
    }

    // ------------------------------------------------------------------------
    // Return "West" or "East" to indicate which team is serving
    //
    servingTeam() {
        if (this.serving == this.players[0]) {
            return(nameWest);
        } else if (this.serving == this.players[1]) {
            return(nameWest);
        } else if (this.serving == this.players[2]) {
            return(nameEast);
        } else if (this.serving == this.players[3]) {
            return(nameEast);
        } else {
            alert(txt_Invalid1 + this.serving
                  + txt_Invalid2 + name_e
                  + txt_SQComma + name_o
                  + txt_SQComma + name_E
                  + txt_SQCommaOr + name_O
                  + txt_SQParen);
        }
    }

    // ------------------------------------------------------------------------
    // Set cheers for the point. *west* and *east* are Cheer objects, one that
    // says "Woohoo!" and other the saying "Aww..."
    //
    setCheers(west, east) {
        this.doCheer(id_WestCheer, west);
        this.doCheer(id_EastCheer, east);
    }

    // ------------------------------------------------------------------------
    // For each cheer, we set the font, size, and color, then display the text
    // value. Next, we fade it out over the course of a second with a callback
    // to clear the text content and reset the field to visible after the fade
    // out completes.
    //
    doCheer(name, chobj) {
        $(name).stop(true, true);
        $(name).css(css_FontFamily, attr_CheerFont);
        $(name).css(css_FontSize, chobj.size);
        $(name).css(css_Color, chobj.color);

        $(name).val(chobj.value);
        $(name).fadeOut(1000, js_FadeSpeed,
                        function() {
                            $(name).val(attr_Empty);
                            $(name).show();
                        });
    }

    // ------------------------------------------------------------------------
    // Swap the positions of the two players on a team
    //
    swapPosition(player1, player2, team) {
        this.animatePlayerSwap(player1, player2);
        [player1.pos, player2.pos] = [player2.pos, player1.pos];
        if (team == nameWest) {
            [this.nw, this.sw] = [this.sw, this.nw];
        } else {
            [this.ne, this.se] = [this.se, this.ne];
        }
    }

    // ------------------------------------------------------------------------
    // Return "West" or "East" to indicate which team wins rally based
    // on a virtual coin flip
    //
    winningTeam() {
        if (Math.random() < 0.50) {
            return(nameWest);
        } else {
            return(nameEast);
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

// ------------------------------------------------------------------------
// Animate a service transition, moving the yellow ball from point 1 (p1)
// to point 2 (p2)
//
var stInterval;
function startServerTransition(p1, p2) {
    delta_x = Math.abs(p1.x - p2.x) / 10;
    delta_y = Math.abs(p1.y - p2.y) / 10;
    base_x = Math.min(p1.x, p2.x);
    base_y = Math.min(p1.y, p2.y);
    for (var step = 0 ; step < 10 ; step++) {
        step_x = base_x + step*delta_x;
        step_y = base_y + step*delta_y;
        court.service_phantom.addStep(new Point(step_x, step_y));
    }
    court.serving = "";
    court.service_phantom.show();
    court.draw();
    
    stInterval = setInterval(function() {
        stepServerTransition();
    }, 20);
}
    
// ----------------------------------------------------------------------------
// Take a step for the service transition
//
function stepServerTransition() {
    var moved = 0;
    moved = court.service_phantom.takeStep();
    court.draw();
    if (moved <= 0) {
        clearInterval(stInterval);
    }
}

// ----------------------------------------------------------------------------
// Singleton object for instructions
//
var instr = (function () {
    var i_inst;

    return {
        getInstance: function () {
            if (!i_inst) {
                i_inst = new Instructions(false);
            }
            return i_inst;
        }
    };
})();

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
                instance = new Context(id_PBCourt);
            }
            return instance;
        }
    };
})();

// ----------------------------------------------------------------------------
// Top level control for hiding/showing instructions
//
function toggle_instructions() {
    var instruct = instr.getInstance();
    instruct.toggle();
}

// ----------------------------------------------------------------------------
// Here we start: we draw the initial court at the start of the game
//
var court = new Court();
$(document).ready(function() {
    var instruct = instr.getInstance();
    court.draw();
});
