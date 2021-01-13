function type (x) {
  return Object.prototype.toString.call(x).slice(8, -1)
}

function standardDeviation (n, chance) {
  return Math.sqrt(n * chance * (1 - chance))
}

function weightCheck (weights) {
  return weights.values().reduce((acc, w) => acc + w) > 1
}

function processProbabilty (weights) {
  let num = Math.random()

  if (weightCheck(weights)) {
    throw new Error('Weights exceed 1 (100%)')
  }

  for (const [item, prob] of weights) {
    num = num - prob

    if (num < 0) {
      return item
    }
  }
}

function probability (weights) {
  switch (type(weights)) {
    case 'Object':
      return processProbabilty(new Map(Object.entries(weights)))
    case 'Map':
      return processProbabilty(weights)
    default:
      throw new TypeError('Provided weights must be in Object or Map format')
  }
}

module.exports = {
  standardDeviation,
  probability
}
