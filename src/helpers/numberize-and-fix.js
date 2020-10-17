function numberizeAndFix(num) {
  return Number(Number(num || 0).toFixed(1));
}

module.exports = numberizeAndFix;
