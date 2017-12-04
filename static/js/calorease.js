function instruct() {
    msg = "Please fill in the first three fields or"
        + " the cal per ounce/gram field";
    alert(msg);
}

function hell_frozen() {
    alert("Hell has frozen over");
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

function wgt_calculation(cpw, cp_unit, cpp_id) {
    $(cpp_id).val(cpw * cp_unit);
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
            wgt_calculation(cpw, cp_unit, "#cpp");
        } else {
            hell_frozen();
        }
    })
}
