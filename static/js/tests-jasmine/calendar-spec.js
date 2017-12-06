function slicerate(list, count) {
    var n = list.length - count;
    return list.slice(n).concat(list.slice(0, n));
}

function yet_another_rotate(list, count) {
    var rval = list;
    for ( ; 0 < count ; count--) {
        rval = rval.unshift(rval.pop());
    }
    return rval;
}

describe("calendar", function() {
    it("weekday_list", function() {
        expect(weekday_list()).toEqual(["mon", "tue", "wed", "thu", "fri",
                                        "sat", "sun"]);
    });

    it("rotate 1 .. 10", function() {
        mylist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (idx = 0 ; idx < mylist.length ; idx++) {
            result = rotate(mylist, idx);
            for (jdx = 0 ; jdx < idx ; jdx++) {
                expect(result).toEqual(slicerate(mylist, idx));
            }
        }
    });

    it("rd_table_row", function() {
        var result = rd_table_row(2017, rotate(weekday_list(), 1));
        expect(result).toEqual("<tr><td>2017<td>tue</tr>")
    });

    it("rd_by_year", function() {
        var now = new Date();
        var start_year = now.getYear() + 1900 - 5;
        var rwdl = rotate(weekday_list(), 1);
        var rdtab = rd_by_year();
        var years = rdtab.match(/<td>(\d{4})<td>/g);
        var wdays = rdtab.match(/<td>(...)<\/tr>/g);
        expect(years.length).toEqual(wdays.length);
        for (idx = 0 ; idx < 20 ; idx++) {
            exp_yr = start_year + idx;
            yr = years[idx].replace(/<td>/g, "");
            wd = wdays[idx].replace(/<td>/, "").replace(/<\/tr>/, "");
            expect(yr).toEqual("" + exp_yr);
            apr04 = new Date(start_year+idx, 3, 4, 0, 0, 0, 0);
            expect(wd).toEqual(rwdl[apr04.getDay()]);
        }
    });

    it("set_weekdays -- construction", function() {
        expect(true).toBe(false)
    });

    function check_for(haystack, needle, exppos) {
        var rgx = new RegExp(needle);
        var rval = haystack.match(rgx);
        expect(rval).toContain(needle);
        if (0 <= exppos) {
            expect(rval['index']).toEqual(exppos);
        }
    }

    it("month_header", function() {
        var result = month_header();
        for (let idx = 0 ; idx < 7 ; idx++) {
            check_for(result,
                      "<th width='50'><button id='btn"
                      + idx
                      + "'></button></th>",
                      -1);
        }
        check_for(result, "<tr>", 0);
        check_for(result, "</tr>", result.length - 5);
    });

    it("month_row", function() {
        var result = month_row(5);
        check_for(result, "<tr>", 0);
        var pos = 4;
        for (let idx = 5 ; idx < 12 ; idx++) {
            var stridx = "" + idx;
            check_for(result, "<td>" + stridx + "</td>", pos);
            pos += 9 + stridx.length;
        }
        check_for(result, "</tr>", result.length - 5);
    });

    it("month", function() {
        var result = month();
        for (let day = 1 ; day <= 31 ; day++) {
            check_for(result, "<td>" + day + "</td>", -1);
        }
        for (let idx = 0 ; idx < 7 ; idx++) {
            check_for(result, "<button id='btn" + idx + "'></button>", -1);
        }
    });
});
