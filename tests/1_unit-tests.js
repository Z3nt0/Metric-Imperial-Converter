const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  test('Whole number input', () => {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('Decimal input', () => {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('Fractional input', () => {
    assert.equal(convertHandler.getNum('3/4gal'), 0.75);
  });

  test('Fractional input with decimal', () => {
    assert.approximately(convertHandler.getNum('3.5/7L'), 0.5, 0.01);
  });

  test('Double fraction returns error', () => {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('Default to 1 when no number provided', () => {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Each valid unit recognized', () => {
    ['gal', 'L', 'mi', 'km', 'lbs', 'kg'].forEach(unit => {
      assert.equal(convertHandler.getUnit(`32${unit}`), unit);
    });
  });

  test('Invalid input unit returns error', () => {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Return correct return unit for each valid input unit', () => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('Correctly spelled-out string for each valid unit', () => {
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('Correctly convert gal to L', () => {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('Correctly convert L to gal', () => {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('Correctly convert mi to km', () => {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('Correctly convert km to mi', () => {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('Correctly convert lbs to kg', () => {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
  });

  test('Correctly convert kg to lbs', () => {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });
});
