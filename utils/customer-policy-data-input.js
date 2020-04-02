'use strict';

/**
 * customerPolicyDataInput(): 
 *  Get Company policy data
 */
module.exports.customerPolicyDataInput = async () => {
  const url = 'https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy'
  return (
    fetch(url)
      .then(response => response.json())
  )
}