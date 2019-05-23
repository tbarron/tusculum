function isaFloat(str, msg) {
    var fval = parseFloat(str);
    var ival = parseInt(fval);
    if (fval - ival != 0) {
        alert(msg);
        return(true);
    } else {
        return(false);
    }
}

function calc_d() {
    var degrees_s = $("#d_deg").val();
    var degrees_f = parseFloat(degrees_s);

    $("#dm_deg").val(fd_to_dm_d(degrees_f));
    $("#dm_min").val(fd_to_dm_m(degrees_f));

    $("#dms_deg").val(fd_to_dms_d(degrees_f));
    $("#dms_min").val(fd_to_dms_m(degrees_f));
    $("#dms_sec").val(fd_to_dms_s(degrees_f));
}

function calc_dm() {
    var degrees_s = $("#dm_deg").val();
    var minutes_s = $("#dm_min").val();

    var degrees_f = parseFloat(degrees_s);
    var degrees_i = parseInt(degrees_f);

    if (isaFloat(degrees_s, "value " + degrees_s + " should be an int")) {
        return;
    }
    var minutes_f = parseFloat(minutes_s);
    if (60 <= minutes_f) {
        alert("minutes must be < 60");
        return;
    }

    $("#d_deg").val(dm_to_d_d(degrees_i, minutes_f));

    $("#dms_deg").val(dm_to_dms_d(degrees_i, minutes_f));
    $("#dms_min").val(dm_to_dms_m(degrees_i, minutes_f));
    $("#dms_sec").val(dm_to_dms_s(degrees_i, minutes_f));
}

function calc_dms() {
    var degrees_s = $("#dms_deg").val();
    var minutes_s = $("#dms_min").val();
    var seconds_s = $("#dms_sec").val();

    var degrees_i = parseInt(degrees_s);
    var minutes_i = parseInt(minutes_s);
    var seconds_f = parseFloat(seconds_s);

    if (isaFloat(degrees_s, "degrees may not be a float in this context")) {
        return;
    }
    if (isaFloat(minutes_s, "minutes may not be a float in this context")) {
        return;
    }

    $("#d_deg").val(dms_to_d_d(degrees_i, minutes_i, seconds_f));

    $("#dm_deg").val(dms_to_dm_d(degrees_i, minutes_i, seconds_f));
    $("#dm_min").val(dms_to_dm_m(degrees_i, minutes_i, seconds_f));
}

function fd_to_dms_d(fdegrees) {
    return(parseInt(fdegrees));
}

function fd_to_dms_m(fdegrees) {
    idegrees = parseInt(fdegrees);
    frac = fdegrees - idegrees;
    iminutes = parseInt(60 * frac);
    return iminutes;
}

function fd_to_dms_s(fdegrees) {
    idegrees = parseInt(fdegrees);
    frac = fdegrees - idegrees;
    fmins = 60 * frac;
    imins = parseInt(fmins);
    secs = 60 * (fmins - imins);
    return(secs);
}

function fd_to_dm_d(fdegrees) {
    return fd_to_dms_d(fdegrees);
}

function fd_to_dm_m(fdegrees) {
    idegrees = parseInt(fdegrees);
    frac = fdegrees - idegrees;
    return(60 * frac);
}

function dm_to_d_d(degrees, minutes) {
    return(degrees + (minutes / 60));
}

function dm_to_dms_d(degrees, minutes) {
    return(degrees);
}

function dm_to_dms_m(degrees, minutes) {
    return(parseInt(minutes));
}

function dm_to_dms_s(degrees, minutes) {
    imins = parseInt(minutes);
    secs = (minutes - imins) * 60;
    return(secs)
}

function dms_to_d_d(degrees, minutes, seconds) {
    sfrac = seconds / 60;
    result = degrees + (minutes + sfrac) / 60;
    return result;
}

function dms_to_dm_d(degrees, minutes, seconds) {
    return(degrees);
}

function dms_to_dm_m(degrees, minutes, seconds) {
    sfrac = seconds / 60;
    return(minutes + sfrac);
}
