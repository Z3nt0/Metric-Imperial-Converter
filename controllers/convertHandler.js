function ConvertHandler() {
  const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
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

  this.getNum = function(input) {
    let result = input.match(/^[\d.\/]+/);
    if (!result) return 1;
    let num = result[0];
    if ((num.match(/\//g) || []).length > 1) return 'invalid number';
    try {
      return eval(num);
    } catch {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';
    let unit = result[0];
    return units.includes(unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase()) ? 
      (unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase()) : 
      'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    return convertMap[initUnit]?.to || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    return spellOut[unit] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const conversion = convertMap[initUnit];
    if (!conversion) return 'invalid unit';
    return parseFloat((initNum * conversion.factor).toFixed(5));
  };
}

module.exports = ConvertHandler;
