function month() {
    var day = 1;
    var rval = "";
    rval = rval + "<tr>";
    for (i = 0 ; i < 7 ; i++) {
        btnid = "btn" + i;
        btn = "<button id='" + btnid + "'></button>";
        rval = rval + "<th width='50'>" + btn + "</td>";
    }
    rval = rval + "</tr>";
    for (row = 0 ; row < 5 ; row++) {
        rval = rval + "<tr>";
        for (i = 0 ; i < 7 ; i++) {
            pday = (day <= 31) ? "" + day : "&nbsp;"
            rval = rval + "<td>" + pday + "</td>";
            day = day + 1;
        }
        rval = rval + "</tr>";
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
    var this_year = 1900 + now.getYear() - 5;
    var wdl = rotate(weekday_list(), 1);
    var rval = "";
    for (yr = 0 ; yr < 20 ; yr++) {
        year = this_year + yr;
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
    $("#month").append(month());
    set_weekdays(0);
    $("#btn0").click(function() { set_weekdays(0); })
    $("#btn1").click(function() { set_weekdays(1); })
    $("#btn2").click(function() { set_weekdays(2); })
    $("#btn3").click(function() { set_weekdays(3); })
    $("#btn4").click(function() { set_weekdays(4); })
    $("#btn5").click(function() { set_weekdays(5); })
    $("#btn6").click(function() { set_weekdays(6); })
    $("#byear").append(rd_by_year());
});
