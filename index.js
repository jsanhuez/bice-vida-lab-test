'use strict';
const policyCost = require('./utils/customer-policy-cost');

module.exports.policy = async event => {
  const details = await policyCost.customerPolicyCost()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        policy_price: details
      },
      null,
      2
    ),
  };
};