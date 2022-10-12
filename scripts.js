'use: strict';

const findEle = (selector) => document.querySelector(selector);

const calcVP = (value) => {
  const rem = findEle('[data-rem-value]').value;
  const result = value / rem;
  console.log(result);
  return result;
};

const elements = {
  calculate: findEle('[data-btn-calculate]'),
  result: findEle('[data-result]'),
  copy: findEle('[data-copy]'),
  reset: findEle('[data-btn-reset]'),
};

const calcSlope = (min, max, minVP, maxVP) => {
  const sizeGap = max - min;
  const vpGap = maxVP - minVP;
  const slope = sizeGap / vpGap;

  return slope;
};

const calcYIntersect = (minVP, slope, minimum) => {
  const yIntersect = (0 - minVP) * slope + minimum;
  return yIntersect;
};

const displayResult = (min, yInt, slope, max) => {
  const result = `clamp(${min}rem, ${yInt}rem + ${slope * 100}vw, ${max}rem)`;
  elements.result.textContent = result;
};

const handleCalculate = (e) => {
  e.preventDefault();
  const maximum = +findEle('[data-size-max]').value;
  const minimum = +findEle('[data-size-min]').value;
  const maximumVP = calcVP(+findEle('[data-vp-max]').value);
  const minimumVP = calcVP(+findEle('[data-vp-min]').value);
  console.log(maximumVP);
  const slope = calcSlope(minimum, maximum, minimumVP, maximumVP);
  const yIntersect = calcYIntersect(minimumVP, slope, minimum);
  displayResult(minimum, yIntersect, slope, maximum);
};

const handleCopy = (e) => {
  e.preventDefault();
  const copyText = elements.result.textContent;
  if (!copyText) return;
  navigator.clipboard.writeText(copyText);
};

const handleReset = (e) => {
  e.preventDefault();
  const form = findEle('[data-form]');
  form.reset();
};

elements.calculate.addEventListener('click', handleCalculate);
elements.copy.addEventListener('click', handleCopy);
elements.reset.addEventListener('click', handleReset);
