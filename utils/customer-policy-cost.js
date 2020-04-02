'use strict';
const policyData = require('./customer-policy-data-input');
const pPrices = require('./policy-prices');

module.exports.customerPolicyCost = async () => {
  const customerPolicyData = await policyData.customerPolicyDataInput()
  return getCustomerPolicyCost(customerPolicyData)
}

/**
 * getCustomerPolicyCost((json) policyDetails): 
 *   return the total company policy cost and the copay cost by worker
 */
const getCustomerPolicyCost = policyDetails => {
  const policyCost = {
    currency: 'UF',
    company_total_cost: 0,
    workers_copay: []
  };
  const companyPercentage = policyDetails.policy.company_percentage
  const has_dental_care = policyDetails.policy.has_dental_care
  let workerCost, companyCost // temporary worker and company cost

  policyDetails.policy.workers.map(worker => {
    const wDetails = {...worker}
    
    if (worker.age <= 65) {
      workerCost = getPolicyPrice(has_dental_care, worker.childs)
      companyCost = getCostByWorker(workerCost, companyPercentage)
      policyCost.company_total_cost += companyCost
      wDetails.has_coverage = true
      wDetails.copay_cost = formatNumber(getCopayByWorker(workerCost, companyCost))
    } else {
      wDetails.has_coverage = false
      wDetails.copay_cost = 0
    }
    policyCost.workers_copay.push(wDetails)
  })
  policyCost.company_total_cost = formatNumber(policyCost.company_total_cost)

  return policyCost
}

/**
 * getPolicyPrice(has_dental_care, childs): return the policy price for worker
 */
const getPolicyPrice = (has_dental_care, childs) => {
  const prices = pPrices.policyPrices
  return prices[has_dental_care][Math.round(Math.min(2, childs))]
}

/**
 * getCostByWorker(workerCost, companyPercentage): return the policy price by worker
 */
const getCostByWorker = (cost, percentage) => cost * percentage / 100

/**
 * getCopayByWorker(workerCost, company_cost): return the copay price for worker
 */
const getCopayByWorker = (wCost, cCost) => wCost - cCost

/**
 * formatNumber(number): return number format
 */
const formatNumber = (number) => Number(number.toFixed(5))