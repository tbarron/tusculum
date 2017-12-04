function instruct() {
    msg = "Please fill in the first three fields or"
        + " the cal per ounce/gram field";
    alert(msg);
}

function pkg_calculation(cps, spp, wpp, unit_pp, cpp_id) {
    if (isNaN(spp)) {
        request_spp();
    } else if (isNaN(wpp)) {
        request_wpp();
    } else {
        var cal_p_pkg = cps * spp;
        var lb_p_pkg = wpp / unit_pp;
        $(cpp_id).val(cal_p_pkg / lb_p_pkg);
    }
}

function calorease_main() {
    $("#clear").click(function() {
        clear_elements(["#cps", "#spp", "#wpp", "#cpw", "#cpp"]);
    });

    $("#calc").click(function() {
        var cps = parseInt($("#cps").val());
        var cpw = parseInt($("#cpw").val());
        var spp = parseInt($("#spp").val());
        var wpp = parseInt($("#wpp").val());
        var cpw = parseInt($("#cpw").val());
        var unit_pp = parseFloat($("#unit_pp").val());
        var cp_unit = parseFloat($("#cp_unit").val());
                    
        if (isNaN(cps) && isNaN(cpw)) {
            instruct();
        } else if (!isNaN(cps)) {
            pkg_calculation(cps, spp, wpp, unit_pp, "#cpp");
        } else if (!isNaN(cpw)) {
            $("#cpp").val(cpw * cp_unit);
        } else {
            alert("Hell has frozen over");
        }


        if (cps != "") {
            var cps_i = parseInt(cps_s);

        } else if (cpw_s != "") {


                        var cps_i = parseInt(cps_s);
                        var spp = parseInt($("#spp").val());
                        var wpp = parseInt($("#wpp").val());
                        var cpw = parseInt($("#cpw").val());
                        var unit_pp = parseInt($("#unit_pp").val());
                        var cp_unit = parseInt($("#cp_unit").val());
                        var cal_per_pkg = cps * spp;
                        var lb_per_pkg = wpp / unit_pp;

                        if (isNaN(cps) && isNaN(cpw)) {
                            alert("Please fill in the firest");

                            alert("branch 1 - cps = " + cps);
                            $("#cpp").val(cal_per_pkg / lb_per_pkg);
                        } else if (cpw != 0) {
                            alert("branch 2");
                            $("#cpp").val(cpw * cp_unit);
                        }
                    }
            })                             
});
