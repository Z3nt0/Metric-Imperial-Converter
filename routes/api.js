'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.json({ error: 'invalid number and unit' });
    }
    if (initNum === 'invalid number') {
      return res.json({ error: 'invalid number' });
    }
    if (initUnit === 'invalid unit') {
      return res.json({ error: 'invalid unit' });
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const initUnitString = convertHandler.spellOutUnit(initUnit);
    const returnUnitString = convertHandler.spellOutUnit(returnUnit);

    const result = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`
    };

    res.json(result);
  });
};
