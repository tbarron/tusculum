describe("calorease", function() {
    it("cal_by_weight returns product of args", function() {
        expect(cal_by_weight(3,4)).toEqual(3*4);
    });

    describe("clear_elements", function() {
        var body;
        var zebra_val;
        var aardvark_val;

        beforeEach(function() {
            body = $("body");
            body.append("<div id='fixture'></div>");
            $("#fixture").append("<input type='text' id='aardvark' value='xyzzy'>");
            $("#fixture").append("<input type='text' id='zebra' value='rootabaga'>");
        });

        afterEach(function() {
            $("#aardvark").remove();
            $("#zebra").remove();
            $("#fixture").remove();
        });

        it("clearing aardvark should leave zebra populated", function() {
            clear_elements(["#aardvark"]);
            expect($("#zebra").val()).toEqual("rootabaga");
            expect($("#aardvark").val()).toEqual("");
        });

        it("clearing zebra should leave aardvark populated", function() {
            clear_elements(["#zebra"]);
            expect($("#zebra").val()).toEqual("");
            expect($("#aardvark").val()).toEqual("xyzzy");
        });

        it("clearing a list of elements should work", function() {
            clear_elements(["#aardvark", "#zebra"]);
            expect( $("#aardvark").val() ).toEqual("");
            expect( $("#zebra").val() ).toEqual("");
        });
    });

    describe("decide", function() {
        it("decide NaN NaN", function() {
            expect(decide("abc", "xyz")).toEqual(0);
        });

        it("decide NUM NaN", function() {
            expect(decide(17, "xyz")).toEqual(1);
        });

        it("decide NaN NUM", function() {
            expect(decide("abc", 25)).toEqual(2);
        });

        it("decide NUM NUM", function() {
            expect(decide(10, 25)).toEqual(1);
        });
    });

    describe("calculations", function() {
        beforeEach(function() {
            $("body").append("<div id='fixture'></div>");
            $("#fixture").append("<input type='text' id='target'>");
        });

        afterEach(function() {
            $("#fixture").remove()
        });

        it("verify the package calculation", function() {
            pkg_calculation(2, 4, 5, 16, "#target");
            var result = parseFloat($("#target").val());
            expect( result ).toEqual( (2*4)/(5/16) );
        });

        it("verify the weight calculation", function() {
            wgt_calculation(7, 15, "#target");
            var result = parseFloat($("#target").val());
            expect( result ).toEqual( 7*15 );
        });
    });

    describe("alert routines", function() {
        beforeEach(function() {
            spyOn(window, 'alert');
        });

        it("instruct", function() {
            instruct();
            var msg = "Please fill in the first three fields or"
                + " the cal per ounce/gram field";
            expect(window.alert).toHaveBeenCalledWith(msg);
        });

        it("request_spp", function() {
            request_spp();
            var msg = "Please fill in servings per package";
            expect(window.alert).toHaveBeenCalledWith(msg);
        });

        it("request_wpp", function() {
            request_wpp();
            var msg = "Please fill in ounces/grams per package";
            expect(window.alert).toHaveBeenCalledWith(msg);
        });

        it("hell_frozen", function() {
            hell_frozen();
            var msg = "Hell has frozen over";
            expect(window.alert).toHaveBeenCalledWith(msg);
        });
    });
});
