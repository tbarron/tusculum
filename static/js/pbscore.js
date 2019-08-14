// ----------------------------------------------------------------------------
// This structure tracks everything about the court -- the player
// names, positions, the next message to explain what's going on, the
// score, who is serving, and whether we're on server 1 or 2. It also
// contains a pointer to the function for drawing the court in an HTML
// canvas.
//
var Court = {
    draw : drawCourt,
    players : Array("A", "B", "C", "D"),
    nw : "A",
    sw : "B",
    ne : "C",
    se : "D",
    msg : "B is the first server because s/he's on the right side of the court",
    ab_score : 0,
    cd_score : 0,
    serving : "B",
    servnum : 2
};

// ----------------------------------------------------------------------------
// Draw a line in context *ctx* from point (*start_x*, *start_y*) to point
// (*end_x*, *end_y*)
//
function line(ctx, start_x, start_y, end_x, end_y) {
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(end_x, end_y);
}

// ----------------------------------------------------------------------------
// Draw a circle in context *ctx* centered at point (*cx*, *cy*) with radius
// *radius* and fill it with text *name*
//
function circle(ctx, cx, cy, radius, name) {
    ctx.moveTo(cx + radius, cy);
    ctx.arc(cx, cy, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillText(name, cx, cy+7);
}

// ----------------------------------------------------------------------------
// This is the function for drawing the court and updating score,
// server id, server number, and a message describing the current
// state of the game.
//
function drawCourt() {
    var canvas = $("#pbCourt").get(0);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.font = "20px Comic Sans MS";
    ctx.textAlign = "center";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line(ctx, 440, 0, 440, 400);
    line(ctx, 300, 0, 300, 400);
    line(ctx, 580, 0, 580, 400);
    line(ctx, 0, 200, 300, 200);
    line(ctx, 580, 200, 880, 200);

    circle(ctx, 75, 100, 25, Court.nw);
    circle(ctx, 75, 300, 25, Court.sw);
    circle(ctx, 880 - 75, 100, 25, Court.ne);
    circle(ctx, 880 - 75, 300, 25, Court.se);
    $("#ab_score").val(Court.ab_score);
    $("#cd_score").val(Court.cd_score);
    $("#server").val(Court.serving);
    $("#servnum").val(Court.servnum);
    $("#message").val(Court.msg);
    Court.msg_idx++;
}

// ----------------------------------------------------------------------------
// This function updates the court structure when the serving side
// wins a point
//
function serverWins() {
    if ((Court.serving == "A") || (Court.serving == "B")) {
        Court.ab_score++;
        Court.msg = "A & B win the rally and score a point. They swap places "
            + "and " + Court.serving + " continues serving";
        [Court.nw, Court.sw] = [Court.sw, Court.nw];
    } else if ((Court.serving == "C") || (Court.serving == "D")) {
        Court.cd_score++;
        Court.msg = "C & D win the point, so they swap places " +
            "and " + Court.serving + " continues serving";
        [Court.ne, Court.se] = [Court.se, Court.ne];
    } else {
        alert("Court.serving (" +
              Court.serving +
              ") should be A, B, C, or D");
    }
}

// ----------------------------------------------------------------------------
// This function updates the court structure when the serving side
// loses a point
//
function serverLoses() {
    if (Court.servnum == 1) {
        if (Court.serving == "A") {
            Court.serving = "B";
            Court.msg = "C & D win the point; service passes to "
                + Court.serving;
        } else if (Court.serving == "B") {
            Court.serving = "A";
            Court.msg = "C & D win the point; service passes to "
                + Court.serving;
        } else if (Court.serving == "C") {
            Court.serving = "D";
            Court.msg = "A & B win the point; service passes to "
                + Court.serving;
        } else if (Court.serving == "D") {
            Court.serving = "C";
            Court.msg = "A & B win the point; service passes to "
                + Court.serving;
        } else {
            alert("serverLoses: Court.serving (" +
                  Court.serving +
                  ") should be A, B, C, or D");
        }
        Court.servnum = 2;
    } else if (Court.servnum == 2) {
        Court.servnum = 1;
        if ((Court.serving == "A") || (Court.serving == "B")) {
            Court.serving = Court.ne;
            Court.msg = "C & D win the point; service passes to "
                + Court.serving;
        } else if ((Court.serving == "C") || (Court.serving == "D")) {
            Court.serving = Court.sw;
            Court.msg = "A & B win the point; service passes to "
                + Court.serving;
        } else {
            alert("serverLoses: Court.serving (" +
                  Court.serving +
                  ") should be A, B, C, or D");
        }
    } else {
        alert("serverLoses: Court.servnum (" +
              Court.servnum +
              ") should be 1 or 2");
    }
}

// ----------------------------------------------------------------------------
// Check for end of game
//
function checkGameEnd() {
    if ((10 < Court.ab_score) && (2 <= Court.ab_score - Court.cd_score)) {
        Court.msg = "A & B win! Game over";
    } else if ((10 < Court.cd_score) && (2 <= Court.cd_score - Court.ab_score)) {
        Court.msg = "C & D win! Game over";
    }
}

// ----------------------------------------------------------------------------
// This function processes the next point based on the contents of the
// court structure
//
function advanceGame() {
    if ((Court.serving == "A") || (Court.serving == "B")) {
        if (Math.random() < 0.50) {
            serverWins();
        } else {
            serverLoses();
        }
    } else if (Court.serving == "C" || Court.serving == "D") {
        if (0.50 <= Math.random()) {
            serverWins();
        } else {
            serverLoses();
        }
    }
    checkGameEnd();
    Court.draw();
}

// ----------------------------------------------------------------------------
// Restart the game
//
function restartGame() {
    Court.nw = "A";
    Court.sw = "B";
    Court.ne = "C";
    Court.se = "D";
    Court.msg = "B is the first server because s/he's on the right side of the court";
    Court.ab_score = 0;
    Court.cd_score = 0;
    Court.serving = "B";
    Court.servnum = 2;
    Court.draw();
}

// ----------------------------------------------------------------------------
// Here we start: we draw the initial court at the start of the game
//
$(document).ready(function() {
    Court.draw();
});
