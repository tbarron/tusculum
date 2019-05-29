// =============================================================================
// This code is used by speed.html. It provides conversions among
// speeds expressed in various units: meters/sec, miles/hour,
// feet/second, kilometers/hour, furlongs/fortnight
//
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
}

// =============================================================================
}

// =============================================================================
}

// =============================================================================
}

// =============================================================================
}

// =============================================================================
}

// =============================================================================
}

// =============================================================================
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

