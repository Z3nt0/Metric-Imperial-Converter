function ConvertHandler() {
  const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
  const spellOut = {
    gal: 'gallons',
    L: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms',
  };

  const convertMap = {
    gal: { to: 'L', factor: 3.78541 },
    L: { to: 'gal', factor: 1 / 3.78541 },
    mi: { to: 'km', factor: 1.60934 },
    km: { to: 'mi', factor: 1 / 1.60934 },
    lbs: { to: 'kg', factor: 0.453592 },
    kg: { to: 'lbs', factor: 1 / 0.453592 },
  };

  this.getNum = function (input) {
    const result = input.match(/^[\d.\/]+/);
    if (!result) return 1;

    const num = result[0];
    if ((num.match(/\//g) || []).length > 1) return 'invalid number';

    try {
      return eval(num);
    } catch {
      return 'invalid number';
    }
  };

  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';

    let unit = result[0].toLowerCase();
    if (unit === 'l') unit = 'L';

    if (['gal', 'L', 'mi', 'km', 'lbs', 'kg'].includes(unit)) {
      return unit;
    }
    return 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
  const result = convertMap[initUnit]?.to;
  if (!result) return 'invalid unit';
  return result === 'L' ? 'L' : result.toLowerCase();
  };

  this.spellOutUnit = function (unit) {
    return spellOut[unit] || 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    if (initUnit === 'l') initUnit = 'L';
    const conversion = convertMap[initUnit];
    if (!conversion) return 'invalid unit';
    return parseFloat((initNum * conversion.factor).toFixed(5));
  };
}

module.exports = ConvertHandler;
