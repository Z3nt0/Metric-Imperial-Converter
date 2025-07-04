function ConvertHandler() {

  this.getNum = function(input) {
  const match = input.match(/^[\d/.]+/);
  if (!match) return 1;

  const numStr = match[0];
  const parts = numStr.split('/');
  if (parts.length > 2) return 'invalid number';

  try {
    return eval(numStr);
  } catch {
    return 'invalid number';
  }
};

  this.getUnit = function(input) {
  const result = input.match(/[a-zA-Z]+$/);
  if (!result) return 'invalid unit';

  const unit = result[0].toLowerCase();
  const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
  return validUnits.includes(unit) ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
};

  this.getReturnUnit = function(initUnit) {
    const units = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const names = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };
    return names[unit];
  };

  this.convert = function(initNum, initUnit) {
  const conversions = {
    gal: 3.78541,
    L: 1 / 3.78541,
    lbs: 0.453592,
    kg: 1 / 0.453592,
    mi: 1.60934,
    km: 1 / 1.60934
  };

  return parseFloat((initNum * conversions[initUnit]).toFixed(5));
};
}

module.exports = ConvertHandler;
