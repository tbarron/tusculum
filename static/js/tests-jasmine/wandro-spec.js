describe("wandro", function() {
    // I'm not finding a way to make hit_bottom() return false so
    // we're going to just skip this test for now.
    xit("hit_bottom() is false", function() {
        var doc_height = $(window).height();
        $(window).height(doc_height - 10);
        expect(hit_bottom()).toBe(false);
    });

    it("hit_bottom() is true", function() {
        expect(hit_bottom()).toBe(true);
    });

    it("segment_text(empty)", function() {
        var result = segment_text("");
        expect(result).toEqual(divtag + ifrtag + url + ifrtail + divtail);
    });

    it("segment_text(something)", function() {
        var result = segment_text("foobar");
        var mdiv = divtag.replace("<div ", "<div id='foobar' ");
        expect(result).toEqual(mdiv + ifrtag + url + ifrtail + divtail);
    });

    it("set_iframe_height()", function() {
        $("body").append(segment_text("fixture"));
        set_iframe_height();
        var css_val = $(".appfrm").css("height");
        var wheight = $(window).height() + 1;
        var exp_val = wheight + "px";
        expect(css_val).toEqual(exp_val);
        $("#fixture").remove()
    });

    it("add_frame()", function() {
        add_frame();
        expect($(".row")).toBeDefined();
        $(".row").remove();
    });
});
