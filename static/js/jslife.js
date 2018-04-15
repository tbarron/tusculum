/*
function month_header() {
    var rval = "<tr>";
    var btn;

    for (let idx = 0 ; idx < 7 ; idx++) {
        btn = "<button id='btn" + idx + "'></button>";
        rval += "<th width='50'>" + btn + "</th>";
    }
    rval += "</tr>";
    return rval;
}

function month_row(day) {
    var rval = "<tr>";
    var pday;

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
