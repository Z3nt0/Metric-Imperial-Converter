// controllers/convertHandler.js

function ConvertHandler() {
  const units = {
    gal: { returnUnit: 'L', factor: 3.78541, spellOut: 'gallons' },
    L: { returnUnit: 'gal', factor: 1 / 3.78541, spellOut: 'liters' },
    lbs: { returnUnit: 'kg', factor: 0.453592, spellOut: 'pounds' },
    kg: { returnUnit: 'lbs', factor: 1 / 0.453592, spellOut: 'kilograms' },
    mi: { returnUnit: 'km', factor: 1.60934, spellOut: 'miles' },
    km: { returnUnit: 'mi', factor: 1 / 1.60934, spellOut: 'kilometers' }
  };

  this.getNum = function(input) {
    const result = input.match(/^[^a-zA-Z]+/);
    if (!result) return 1;
    const numStr = result[0];
    const parts = numStr.split('/');
    if (parts.length > 2) return 'invalid number';
    try {
      return eval(numStr);
    } catch (e) {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';
    let unit = result[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    if (!units[unit]) return 'invalid unit';
    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    return units[initUnit]?.returnUnit || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    return units[unit]?.spellOut || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    if (!units[initUnit]) return null;
    return parseFloat((initNum * units[initUnit].factor).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;