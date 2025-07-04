function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/^[\d./]+/);
    if (!result) return 1;
    
    let numStr = result[0];
    
    // Check for double fraction (more than one '/')
    if ((numStr.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }
    
    // Handle fraction
    if (numStr.includes('/')) {
      let parts = numStr.split('/');
      if (parts.length !== 2) return 'invalid number';
      
      let numerator = parseFloat(parts[0]);
      let denominator = parseFloat(parts[1]);
      
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      
      return numerator / denominator;
    }
    
    // Handle decimal
    let num = parseFloat(numStr);
    if (isNaN(num)) return 'invalid number';
    
    return num;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';
    
    let unit = result[0].toLowerCase();
    
    // Valid units - return in correct case
    const validUnits = {
      'gal': 'gal',
      'l': 'L',
      'mi': 'mi', 
      'km': 'km',
      'lbs': 'lbs',
      'kg': 'kg'
    };
    
    if (validUnits.hasOwnProperty(unit)) {
      return validUnits[unit];
    }
    
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitNames[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return 'invalid unit';
    }
    
    // Round to 5 decimal places
    return Math.round(result * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;