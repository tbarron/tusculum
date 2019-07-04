function cal_by_weight(cal_p_unit, unit_mult) {
    return(cal_p_unit * unit_mult);
}

function clear_elements(elist) {
    var ename;
    var idx;
    for (idx = 0 ; idx < elist.length ; idx++) {
        ename = elist[idx];
        $(ename).val("");
    }
}

function decide(cps, cpw) {
    if (isNaN(cps) && isNaN(cpw)) {
        return 0;
    } else if (!isNaN(cps)) {
        return 1;
    } else if (!isNaN(cpw)) {
        return 2;
    } else {
        return 3;
    }
}

function instruct() {
    msg = "Please fill in the first three fields or"
        + " the cal per ounce/gram field";
    alert(msg);
}

function request_spp() {
    alert("Please fill in servings per package");
}

function request_wpp() {
    alert("Please fill in ounces/grams per package");
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
        var cps = parseFloat($("#cps").val());
        var cpw = parseFloat($("#cpw").val());
        var spp = parseFloat($("#spp").val());
        var wpp = parseFloat($("#wpp").val());
        var cpw = parseFloat($("#cpw").val());
        var unit_pp = parseFloat($("#unit_pp").val());
        var cp_unit = parseFloat($("#cp_unit").val());

        switch (decide(cps, cpw)) {
          case 0:
            instruct();
            break;
          case 1:
            pkg_calculation(cps, spp, wpp, unit_pp, "#cpp");  
            break;
          case 2:
            wgt_calculation(cpw, cp_unit, "#cpp");
            break;
          case 3:
            hell_frozen();
            break;
        }
    });
}
