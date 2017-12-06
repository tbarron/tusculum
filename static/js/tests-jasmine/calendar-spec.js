function slicerate(list, count) {
    var n = list.length - count;
    return list.slice(n).concat(list.slice(0, n));
}

describe("calendar", function() {
    it("weekday_list", function() {
        expect(weekday_list()).toEqual(["mon", "tue", "wed", "thu", "fri",
                                        "sat", "sun"]);
    })

    it("rotate 1 .. 10", function() {
        mylist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (idx = 0 ; idx < mylist.length ; idx++) {
            result = rotate(mylist, idx);
            for (jdx = 0 ; jdx < idx ; jdx++) {
                expect(result).toEqual(slicerate(mylist, idx));
            }
        }
    });
});
