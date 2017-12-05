describe("calendar", function() {
    it("weekday_list", function() {
        expect(weekday_list()).toEqual(["mon", "tue", "wed", "thu", "fri",
                                        "sat", "sun"]);
    })

    it("rotate 1", function() {
        wdl = weekday_list();
        rwdl = rotate(wdl, 1);
        expect(rwdl).toEqual(["sun", "mon", "tue", "wed",
                              "thu", "fri", "sat"]);
    })
});
