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
//
// fps * 0.3048 = mps          (ref)            TEST
// fps * 1832.7273 = fpf                        TEST
// fps * 1.09728 = kph         (ref)            TEST
// fps * 0.6818182 = mph       (ref)            TEST
// fps * 0.5924835 = knots     (ref)            TEST
//
// mps * 3.28084 = fps         (ref)            TEST
// mps * 6012.885 = fpf                         TEST
// mps * 3.6 = kph             (ref)            TEST
// mps * 2.236936 = mph        (ref)            TEST
// mps * 1.943844 = knots      (ref)            TEST
//
// fpf * 0.00054563 = fps                       TEST
// fpf * 0.00016631 = mps                       TEST
// fpf * 0.00059871 = kph                       TEST
// fpf * 0.00037202 = mph                       TEST
// fpf * 0.00042808 = knots                     TEST
//
// kph * 0.9113444 = fps       (ref)            TEST
// kph * 0.2777778 = mps       (ref)            TEST
// kph * 1670.246 = fpf                         TEST
// kph * 0.6213712 = mph       (ref)            TEST
// kph * 0.5399565 = knots     (ref)            TEST
//
// mph * 1.466667 = fps        (ref)            TEST
// mph * 0.44704 = mps         (ref)            TEST
// mph * 2688 = fpf                             TEST
// mph * 1.609344 = kph        (ref)            TEST
// mph * 0.86869758 = knots    (ref)            TEST
//
// knots * 1.687811 = fps      (ref)            TEST
// knots * 0.5144447 = mps     (ref)            TEST
// knots * 2336 = fpf                           TEST
// knots * 1.852001 = kph      (ref)            TEST
// knots * 1.15078 = mph       (ref)            TEST
// =============================================================================

// =============================================================================
// Convert feet per seconds to meters per second              FINAL
function fps_mps(fps) {
    mps = fps * 0.3048;
    return(mps);
}

// =============================================================================
// Convert feet per seconds to furlongs per fortnight         FINAL
function fps_fpf(fps) {
    fpf = fps * 1832.7273;
    return(fpf);
}

// =============================================================================
// Convert feet per seconds to kilometers per hour            FINAL
function fps_kph(fps) {
    kph = fps * 1.09728;
    return(kph);
}

// =============================================================================
// Convert feet per seconds to miles per hour                 FINAL
function fps_mph(fps) {
    mph = fps * 0.6818182;
    return(mph);
}

// =============================================================================
// Convert feet per seconds to knots                          FINAL
function fps_knt(fps) {
    knt = fps * 0.5924835;
    return(knt);
}

// =============================================================================
// Convert meters per second to feet per second               FINAL
function mps_fps(mps) {
    fps = mps * 3.28084;
    return(fps);
}

// =============================================================================
// Convert meters per second to furlongs per fortnight        FINAL
function mps_fpf(mps) {
    fpf = mps * 6012.885;
    return(fpf);
}

// =============================================================================
// Convert meters per second to kilometers per hour           FINAL
function mps_kph(mps) {
    kmph = mps * 3.6;
    return(kmph);
}

// =============================================================================
// Convert meters per second to miles per hour                FINAL
function mps_mph(mps) {
    mph = mps * 2.236936;
    return(mph);
}

// =============================================================================
// Convert meters per second to knots                         FINAL
function mps_knt(mps) {
    knt = mps * 1.943844;
    return(knt);
}

// =============================================================================
// Convert furlongs per fortnight to feet per second          FINAL
function fpf_fps(fpf) {
    fps = fpf * 0.00054563;
    return(fps);
}

// =============================================================================
// Convert furlongs per fortnight to meters per second        FINAL
function fpf_mps(fpf) {
    mps = fpf * 0.00016631;
    return(mps);
}

// =============================================================================
// Convert furlongs per fortnight to kilometers per hour      FINAL
function fpf_kph(fpf) {
    kph = fpf * 0.00059871;
    return(kph);
}

// =============================================================================
// Convert furlongs per fortnight to miles per hour           FINAL
function fpf_mph(fpf) {
    mph = fpf * 0.00037202;
    return(mph);
}

// =============================================================================
// Convert furlongs per fortnight to knots                    FINAL
function fpf_knt(fpf) {
    knt = fpf * 0.00042808;
    return(knt);
}

// =============================================================================
// Convert kilometers per hour to feet per second             FINAL
function kph_fps(kph) {
    fps = kph * 0.9113444;
    return(fps);
}

// =============================================================================
// Convert kilometers per hour to meters per second           FINAL
function kph_mps(kph) {
    mps = kph * 0.2777778;
    return(mps);
}

// =============================================================================
// Convert kilometers per hour to furlongs per fortnight      FINAL
function kph_fpf(kph) {
    fpf = kph * 1670.246;
    return(fpf);
}

// =============================================================================
// Convert kilometers per hour to miles per hour              FINAL
function kph_mph(kph) {
    mph = kph * 0.6213712;
    return(mph);
}

// =============================================================================
// Convert kilometers per hour to knots                       FINAL
function kph_knt(kmph) {
    mps = kph * 0.5399565;
    return(mps);
}

// =============================================================================
// Convert miles per hour to feet per second                  FINAL
function mph_fps(kmph) {
    fps = mph * 1.466667;
    return(fps);
}

// =============================================================================
// Convert miles per hour to meters per second                FINAL
function mph_mps(mph) {
    mps = mph * 0.44704;
    return(mps);
}

// =============================================================================
// Convert miles per hour to furlongs per fortnight           FINAL
function mph_fpf(mph) {
    fpf = mph * 2688;
    return(fpf);
}

// =============================================================================
// Convert miles per hour to kilometers per hour              FINAL
function mph_kph(mph) {
    kph = mph * 1.609344;
    return(kph);
}

// =============================================================================
// Convert miles per hour to knots                            FINAL
function mph_knt(mph) {
    knt = mph * 0.86869758;
    return(knt);
}

// =============================================================================
// Convert knots to feet per second                           FINAL
function knt_fps(knt) {
    fps = knt * 1.687811;
    return(fps);
}

// =============================================================================
// Convert knots to meters per second                         FINAL
function knt_mps(knt) {
    mps = knt * 0.5144447;
    return(mps);
}

// =============================================================================
// Convert knots to furlongs per fortnight                    FINAL
function knt_fpf(knt) {
    fpf = knt * 2336;
    return(fpf);
}

// =============================================================================
// Convert knots to kilometers per hour                       FINAL
function knt_kph(knt) {
    kph = knt * 1.852001;
    return(kph);
}

// =============================================================================
// Convert knots to miles per hour                            FINAL
function knt_mph(knt) {
    mph = knt * 1.15078;
    return(mph);
}

// =============================================================================
// Clear the fields
function clear_fields() {
    $("#fps").val("");
    $("#mps").val("");
    $("#fpf").val("");
    $("#kph").val("");
    $("#mph").val("");
    $("#knt").val("");
}

// =============================================================================
// This function is fired by the calculate button for feet / second
function fps_calc() {
    fps_s = $("#fps").val();
    fps_f = parseFloat(fps_s);
    $("#mps").val(fps_mps(fps_f));
    $("#fpf").val(fps_fpf(fps_f));
    $("#kph").val(fps_kph(fps_f));
    $("#mph").val(fps_mph(fps_f));
    $("#knt").val(fps_knt(fps_f));
}

// =============================================================================
// This function is fired by the calculate button for meters / second
function mps_calc() {
    mps_s = $("#mps").val();
    mps_f = parseFloat(mps_s);
    $("#fps").val(mps_fps(mps_f));
    $("#fpf").val(mps_fpf(mps_f));
    $("#kph").val(mps_kph(mps_f));
    $("#mph").val(mps_mph(mps_f));
    $("#knt").val(mps_knt(mps_f));
}

// =============================================================================
// This function is fired by the calculate button for furlongs per fortnight
function fpf_calc() {
    fpf_s = $("#fpf").val();
    fpf_f = parseFloat(fpf_s);
    $("#fps").val(fpf_fps(fpf_f));
    $("#mps").val(fpf_mps(fpf_f));
    $("#kph").val(fpf_kph(fpf_f));
    $("#mph").val(fpf_mph(fpf_f));
    $("#knt").val(fpf_knt(fpf_f));
}

// =============================================================================
// This function is fired by the calculate button for km / hour
// mps, fps, kph, mph, fpf
function kph_calc() {
    kph_s = $("#kph").val();
    kph_f = parseFloat(kph_s);
    $("#fps").val(kph_fps(kph_f));
    $("#mps").val(kph_mps(kph_f));
    $("#fpf").val(kph_fpf(kph_f));
    $("#mph").val(kph_mph(kph_f));
    $("#knt").val(kph_knt(kph_f));
}

// =============================================================================
// This function is fired by the calculate button for km / hour
// mps, fps, kph, mph, fpf
function mph_calc() {
    mph_s = $("#mph").val();
    mph_f = parseFloat(mph_s);
    $("#fps").val(mph_fps(mph_f));
    $("#mps").val(mph_mps(mph_f));
    $("#fpf").val(mph_fpf(mph_f));
    $("#kph").val(mph_kph(mph_f));
    $("#knt").val(mph_knt(mph_f));
}

// =============================================================================
// This function is fired by the calculate button for knots
function knt_calc() {
    knt_s = $("#knt").val();
    knt_f = parseFloat(knt_s);
    $("#fps").val(knt_fps(knt_f));
    $("#mps").val(knt_mps(knt_f));
    $("#fpf").val(knt_fpf(knt_f));
    $("#kph").val(knt_kph(knt_f));
    $("#mph").val(knt_mph(knt_f));
}
