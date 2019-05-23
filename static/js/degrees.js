// =============================================================================
// This code is used by degrees.html. It provides conversions among
// the various forms of GPS coordinates. The various forms are:
//    d    fractional degrees                         ddd.ffff
//    dm   int degree + fractional min                ddd mm.fff
//    dms  int deg + int min + fractional sec         ddd mm ss.fff
//
// While writing this code, I learned that it's very helpful to do
// <opt><command>I in Chrome when loading javascript since this will
// show any syntax errors that will cause loading to fail and make the
// code unrunnable.
// =============================================================================

// =============================================================================
// If *str* represents a float value, raise an alert with *msg* then
// return true. Otherwise, return false.
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

// =============================================================================
// This function is fired by the first calculate button and computes
// dm and dms values from d values.
function calc_d() {
    var degrees_s = $("#d_deg").val();
    var degrees_f = parseFloat(degrees_s);

    $("#dm_deg").val(fd_to_dm_d(degrees_f));
    $("#dm_min").val(fd_to_dm_m(degrees_f));

    $("#dms_deg").val(fd_to_dms_d(degrees_f));
    $("#dms_min").val(fd_to_dms_m(degrees_f));
    $("#dms_sec").val(fd_to_dms_s(degrees_f));
}

// =============================================================================
// This function is fired by the second calculate button and computes
// d and dms values from dm values.
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

// =============================================================================
// This function is fired by the third calculate button and computes
// d and dm values from dms values.
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

// =============================================================================
// Given d value, return integer degrees
function fd_to_dms_d(fdegrees) {
    return(parseInt(fdegrees));
}

// =============================================================================
// Given d value, return integer minutes
function fd_to_dms_m(fdegrees) {
    idegrees = parseInt(fdegrees);
    frac = fdegrees - idegrees;
    iminutes = parseInt(60 * frac);
    return iminutes;
}

// =============================================================================
// Given d value, return fractional seconds
function fd_to_dms_s(fdegrees) {
    idegrees = parseInt(fdegrees);
    frac = fdegrees - idegrees;
    fmins = 60 * frac;
    imins = parseInt(fmins);
    secs = 60 * (fmins - imins);
    return(secs);
}

// =============================================================================
// Given d value, return integer degrees
function fd_to_dm_d(fdegrees) {
    return fd_to_dms_d(fdegrees);
}

// =============================================================================
// Given d value, return fractional minutes
function fd_to_dm_m(fdegrees) {
    idegrees = parseInt(fdegrees);
    frac = fdegrees - idegrees;
    return(60 * frac);
}

// =============================================================================
// Given dm value, return d value
function dm_to_d_d(degrees, minutes) {
    return(degrees + (minutes / 60));
}

// =============================================================================
// Given dm value, return integer degrees
function dm_to_dms_d(degrees, minutes) {
    return(degrees);
}

// =============================================================================
// Given dm value, return integer minutes
function dm_to_dms_m(degrees, minutes) {
    return(parseInt(minutes));
}

// =============================================================================
// Given dm value, return fractional seconds
function dm_to_dms_s(degrees, minutes) {
    imins = parseInt(minutes);
    secs = (minutes - imins) * 60;
    return(secs)
}

// =============================================================================
// Given dms value, return fractional degrees
function dms_to_d_d(degrees, minutes, seconds) {
    sfrac = seconds / 60;
    result = degrees + (minutes + sfrac) / 60;
    return result;
}

// =============================================================================
// Given dms value, return integer degrees
function dms_to_dm_d(degrees, minutes, seconds) {
    return(degrees);
}

// =============================================================================
// Given dms value, return fractional minutes
function dms_to_dm_m(degrees, minutes, seconds) {
    sfrac = seconds / 60;
    return(minutes + sfrac);
}
