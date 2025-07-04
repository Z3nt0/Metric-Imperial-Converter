const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('Whole number input', () => assert.strictEqual(convertHandler.getNum('32L'), 32));
  test('Decimal input', () => assert.strictEqual(convertHandler.getNum('3.1mi'), 3.1));
  test('Fractional input', () => assert.strictEqual(convertHandler.getNum('1/2km'), 0.5));
  test('Fractional input with decimal', () => assert.approximately(convertHandler.getNum('5.4/3lbs'), 1.8, 0.01));
  test('Double-fraction error', () => assert.strictEqual(convertHandler.getNum('3/2/3km'), 'invalid number'));
  test('Default to 1', () => assert.strictEqual(convertHandler.getNum('kg'), 1));
  test('Valid input units', () => {
    const units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    units.forEach(u => assert.notStrictEqual(convertHandler.getUnit(`3${u}`), 'invalid unit'));
  });
  test('Invalid input unit', () => assert.strictEqual(convertHandler.getUnit('3kilomegagram'), 'invalid unit'));
  test('Return correct return unit', () => {
    const mapping = { gal: 'L', L: 'gal', mi: 'km', km: 'mi', lbs: 'kg', kg: 'lbs' };
    Object.entries(mapping).forEach(([from, to]) => {
      assert.strictEqual(convertHandler.getReturnUnit(from), to);
    });
  });
  test('Return spelled-out unit', () => {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
  });
  test('Convert gal to L', () => assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001));
  test('Convert L to gal', () => assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001));
  test('Convert mi to km', () => assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001));
  test('Convert km to mi', () => assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001));
  test('Convert lbs to kg', () => assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001));
  test('Convert kg to lbs', () => assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001));
});
