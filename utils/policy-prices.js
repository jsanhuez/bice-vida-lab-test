'use strict';

/**
 * policyPrices: Stores Policy prices
 * 
 * Structure:
 * [dental insurance: false|true]: { // Policy have or not dental insurance added
 *   [children's number: 0|1|2 or more]: [price],
 * }
 */
module.exports.policyPrices = {
  false: {
    0: 0.279,
    1: 0.4396,
    2: 0.5599
  },
  true: {
    0: 0.279 + 0.12,
    1: 0.4396 + 0.1950,
    2: 0.5599 + 0.2480
  }
}