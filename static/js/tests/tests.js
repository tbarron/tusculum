/* ------------------------------------------------------------------------- */
QUnit.module("cal_by_weight");
QUnit.test( "cal_by_weight", function( assert ) {
    assert.equal(cal_by_weight(3, 4), 12, "Expecting product of arguments");
});

/* ------------------------------------------------------------------------- */
QUnit.module("clear_elements");
QUnit.test( "clear_elements 1", function( assert ) {
    var fixture = $("#qunit-fixture");
    fixture.append("<input type='text' id='aardvark' value='xyzzy'>");
    clear_elements(['#aardvark']);
    assert.equal($("#aardvark").val(), "", "after clear, field should be empty");
});

QUnit.test( "clear_elements some", function( assert ) {
    var fixture = $("#qunit-fixture");
    fixture.append("<input type='text' id='aardvark' value='xyzzy'>");
    fixture.append("<input type='text' id='zebra' value='rootabaga'>");
    clear_elements(['#aardvark']);
    assert.equal($("#aardvark").val(), "", "aardvark cleared");
    assert.equal($("#zebra").val(), "rootabaga", "zebra not cleared");
});

QUnit.test( "clear_elements all", function( assert ) {
    var fixture = $("#qunit-fixture");
    fixture.append("<input type='text' id='aardvark' value='xyzzy'>");
    fixture.append("<input type='text' id='zebra' value='rootabaga'>");
    clear_elements(['#aardvark', '#zebra']);
    assert.equal($("#aardvark").val(), "", "aardvark cleared");
    assert.equal($("#zebra").val(), "", "zebra cleared");
});

/* ------------------------------------------------------------------------- */
QUnit.module("decide");
QUnit.test( "decide 0", function( assert ) {
    assert.equal(decide("abc", "frobble"), 0, "Both args not a number");
});

QUnit.test( "decide 1", function( assert ) {
    assert.equal(decide("17", "figaro"), 1, "First arg is a number");
});

QUnit.test( "decide 2", function( assert ) {
    assert.equal(decide("bleah", "-72"), 2, "second arg is a number");
});

QUnit.test( "decide both", function( assert ) {
    assert.equal(decide("19", "-72"), 1, "if both args numeric, return 1");
});

/* NOTE: There's no way to get decide() to return 3 */

/* ------------------------------------------------------------------------- */
QUnit.module("instruct");
QUnit.test( "instruct", function( assert ) {
    assert.ok(false, 'construction');
});

/* ------------------------------------------------------------------------- */
QUnit.module("request_spp");
QUnit.test( "request_spp", function( assert ) {
    assert.ok(false, 'construction');
});

/* ------------------------------------------------------------------------- */
QUnit.module("request_wpp");
QUnit.test( "request_wpp", function( assert ) {
    assert.ok(false, 'construction');
});

/* ------------------------------------------------------------------------- */
QUnit.module("hell_frozen");
QUnit.test( "hell_frozen", function( assert ) {
    assert.ok(false, 'construction');
});

/* ------------------------------------------------------------------------- */
QUnit.module("pkg_calc");
QUnit.test( "pkg_calc", function( assert ) {
    assert.ok(false, 'construction');
});

/* ------------------------------------------------------------------------- */
QUnit.module("wgt_calc");
QUnit.test( "wgt_calc", function( assert ) {
    assert.ok(false, 'construction');
});

/* -------------------------------------------------------------------------
QUnit.test( "name", function( assert ) {
    assert....
});
*/
