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
// mph -> mps
//   mph * 0.44704 -> mps
//     10 mph = 4.4704 mps                 TEST
// fps -> mps
//   fps * 0.3048 -> mps
//     10 fps = 3.048 mps                 TEST
// fps -> fpf
//   fps * 1832.7273 -> fpf
//     10 fps = 18327.273 fpf                 TEST
// fps -> kph
//   fps * 1.09728 -> kph
//     10 fps = 10.9728 kph                 TEST
// fps -> mph
//   fps * 0.6818182 -> mph
//     10 fps = 6.8182 mph                 TEST
// mps -> fps
//   mps * 3.28084 -> fps
//     10 mps = 32.8084 fps                 TEST
// mps -> fpf
//   mps * 6012.89 -> fpf
//     10 mps = 60128.9 fpf
// mps -> kph
//   mps * 3.6 -> kph
//     10 mps = 36 kph                 TEST
// mps -> mph
//   mps * 2.236936 -> mph
//     1 mps = 2.236936 mph                 TEST
// fpf -> fps
//   fpf * 0.00054563 -> fps
//     10000 fpf = 5.4563 fps                 TEST
// fpf -> mps
//   fpf * 0.0001663095 -> mps
//     10000 fpf = 1.663095 mps                 TEST
// fpf -> kph
//   fpf * 0.0005986 -> kph
//     10000 fpf = 5.98714 kph                 TEST
// fpf -> mph
//   fpf * 0.0003720238 -> mph
//     1 fpf = 0.0003720238 mph                 TEST
// kph -> fps
//   kph * 0.91134442 -> fps
//     10 kph = 9.1134442 fps
// kph -> mps
//   kph * 0.2778 -> mps
//     10 kph = 2.777778 mps
// kph -> fpf
//   1670.565 * kph -> fpf
//     1 kph = 1670.25 fpf
// kph -> mph
//   0.6213712 * kph -> mph
//     100 kph = 62.13712 mph
// mph -> fps
//   fps = 1.466667 * mph
//     fph = 5280 * mph
//     fps = fph / 3600 = 5280 * mph / 3600
//     60 mph = 88 fps
// mph -> mps
//   mph * 0.44704 -> mps
//     60 mph = 26.8224 mps
// mph -> kph
//   1.609344 * mph -> kph
//     60 mph = 96.56 kph
// mph -> fpf
//   2688 * mph -> fpf
//     10 miles / hour => 80 furlongs / hour
//     In a fortnight, there are 24 * 14 = 336 hours
//     Traveling at 10 mph will cover 80 * 336 = 26880 furlongs in a fortnight
//     60 mph = 161280 fpf
// =============================================================================

// =============================================================================
// Convert miles per hour to meters per second
function mlph_mps(mlph) {
    mps = mlph * 1609.344 / 3600;
    return(mps);
}

// =============================================================================
// Convert miles per hour to meters per second
function mlph_kph(mlph) {
    mps = mlph * 1.609344;
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
// Convert knots to meters per second
function knt_mps(knt) {
    mps =  (1000 * knt) / (1.852 * 3600)
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
// Convert meters per second to knots
function mps_knt(mps) {
    knt = mps * 1.852 * 3600 / 1000;
    return(knt);
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
    // spf = 3600 * 24 * 14;
    // fpf = mps * spf * 1609.344 / 8;
    fpf = 6012.885 * mps;
    return(fpf);
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
    $("#knt").val(mps_knt(mps_f));
}

// =============================================================================
// This function is fired by the calculate button for feet / second
function fps_calc() {
    fps_s = $("#fps").val();
    fps_f = parseFloat(fps_s);
    mps = fps_mps(fps_f);
    $("#mps").val(mps);
    $("#kph").val(mps_kmph(mps));
    $("#mph").val(mps_mlph(mps));
    $("#fpf").val(mps_fpf(mps));
    $("#knt").val(mps_knt(mps));
}

// =============================================================================
// This function is fired by the calculate button for km / hour
// mps, fps, kph, mph, fpf
function kph_calc() {
    kph_s = $("#kph").val();
    kph_f = parseFloat(kph_s);
    mps = kmph_mps(kph_f);
    $("#mps").val(mps);
    $("#fps").val(mps_fps(mps));
    $("#mph").val(mps_mlph(mps));
    $("#fpf").val(mps_fpf(mps));
    $("#knt").val(mps_knt(mps));
}

// =============================================================================
// This function is fired by the calculate button for knots
function knt_calc() {
    knt_s = $("#kph").val();
    knt_f = parseFloat(knt_s);
    mps = knt_mps(knt_f);
    $("#mps").val(mps);
    $("#fps").val(mps_fps(mps));
    $("#mph").val(mps_mlph(mps));
    $("#fpf").val(mps_fpf(mps));
    $("#kph").val(mps_kmph(mps));
}

// =============================================================================
// This function is fired by the calculate button for km / hour
// mps, fps, kph, mph, fpf
function mph_calc() {
    mlph_s = $("#mph").val();
    mlph_f = parseFloat(mlph_s);
    mps = mlph_mps(mlph_f);
    $("#mps").val(mps);
    $("#fps").val(mps_fps(mps));
    $("#kph").val(mps_kph(mps));
    $("#fpf").val(mps_fpf(mps));
    $("#knt").val(mps_knt(mps));
}

// =============================================================================
// This function is fired by the calculate button for furlongs per fortnight
function fpf_calc() {
    fpf_s = $("#fpf").val();
    fpf_f = parseFloat(fpf_s);
    mps = fpf_mps(fpf_f);
    $("#mps").val(mps);
    $("#fps").val(mps_fps(mps));
    $("#kph").val(mps_kmph(mps));
    $("#mph").val(mps_mlph(mps));
    $("#knt").val(mps_knt(mps));
}

