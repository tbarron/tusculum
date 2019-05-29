// =============================================================================
// This code is used by speed.html. It provides conversions among
// speeds expressed in various units: meters/sec, miles/hour,
// feet/second, kilometers/hour, furlongs/fortnight
//
// X / Y
//                   feet      meters     furlong      kilometer          mile
// feet               1.0      3.2084         660        3280.84          5280
// meter           0.3048         1.0     201.168           1000      1609.344
// furlong       0.001515     0.00497         1.0           4.97           8.0
// kilometer     0.000305       0.001      0.2012            1.0         1.609
// mile          0.000189    0.000621       0.125         0.6215           1.0
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
// Convert miles per hour to meters per second
function mlph_mps(mlph) {
    mps = mlph * 1609.344 / 3600;
    return(mps);
}

// =============================================================================
// Convert feet per seconds to meters per second
function fps_mps(fps) {
    mps = fps / 3.28084;
    return(mps);
}

// =============================================================================
// Convert kilometers per hour to meters per second
function kmph_mps(kmph) {
    mps = kmph * 1000 / 3600;
    return(mps);
}

// =============================================================================
// Convert furlongs per fortnight to meters per second
function fpf_mps(fpf) {
    mps = fpf * 1609.344 * 8 / (3600 * 24 * 14);
    return(mps);
}

// =============================================================================
// Convert meters per second to miles per hour
function mps_mlph(mps) {
    mlph = mps * 3600 / 1609.344
    return(mlph);
}

// =============================================================================
// Convert meters per second to feet per seconds
function mps_fps(mps) {
    fps = mps * 3.28084;
    return(fps);
}

// =============================================================================
// Convert meters per second to kilometers per hour
function mps_kmph(mps) {
    kmph = mps * 3600 / 1000;
    return(kmph);
}

// =============================================================================
// Convert meters per second to furlongs per fortnight
function mps_fpf(mps) {
    // fpf = mps * 3600 * 24 * 14 / (1609.344 * 8);
    spf = 3600 * 24 * 14;
    fpf = mps * spf * 1609.344 / 8;
    return(mps);
}

// =============================================================================
// This function is fired by the calculate button for meters / second
function mps_calc() {
    mps_s = $("#mps").val();
    mps_f = parseFloat(mps_s);
    $("#fps").val(mps_fps(mps_f));
    $("#kph").val(mps_kmph(mps_f));
    $("#mph").val(mps_mlph(mps_f));
    $("#fpf").val(mps_fpf(mps_f));
}

// =============================================================================
// This function is fired by the calculate button for feet / second
function fps_calc() {
    fps_s = $("#fps").val();
    fps_f = parseFloat(fps_s);
    $("#mps").val(fps_mps(fps_f));
    $("#kph").val(mps_kmph(fps_mps(fps_f)));
    $("#mph").val(mps_mlph(fps_mps(fps_f)));
    $("#fpf").val(mps_fpf(fps_mps(fps_f)));
}

// =============================================================================
// This function is fired by the calculate button for km / hour
// mps, fps, kph, mph, fpf
function kph_calc() {
    kph_s = $("#kph").val();
    kph_f = parseFloat(kph_s);
    $("#mps").val(kmph_mps(kph_f));
    $("#fps").val(mps_fps(kmph_mps(kph_f)));
    $("#mph").val(mps_mlph(kmph_mps(kph_f)));
    $("#fpf").val(mps_fpf(kmph_mps(kph_f)));
}

// =============================================================================
// This function is fired by the calculate button for km / hour
// mps, fps, kph, mph, fpf
function mph_calc() {
    mlph_s = $("#mph").val();
    mlph_f = parseFloat(mlph_s);
    $("#mps").val(mlph_mps(mlph_f));
    $("#fps").val(mps_fps(mlph_mps(mlph_f)));
    $("#kph").val(mps_kmph(mlph_mps(mlph_f)));
    $("#fpf").val(mps_fpf(mlph_mps(mlph_f)));
}

// =============================================================================
// This function is fired by the calculate button for furlongs per fortnight
function fpf_calc() {
    fpf_s = $("#fpf").val();
    fpf_f = parseFloat(fpf_s);
    $("#mps").val(fpf_mps(fpf_f));
    $("#fps").val(mps_fps(fpf_mps(fpf_f)));
    $("#kph").val(mps_kmph(fpf_mps(fpf_f)));
    $("#mph").val(mps_mlph(fpf_mps(fpf_f)));
}

