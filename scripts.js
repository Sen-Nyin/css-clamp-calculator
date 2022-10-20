'use: strict';

(() => {
  const findEle = (selector) => document.querySelector(selector);

  const subtract = (num1, num2) => num1 - num2;
  const divide = (num1, num2) => num1 / num2;

  const calcVP = (pixels) => {
    const pixelsPerRem = findEle('[data-rem-value]').value || 16;
    const result = divide(pixels, pixelsPerRem);
    return result;
  };

  const elements = Object.freeze({
    calculate: findEle('[data-btn-calculate]'),
    result: findEle('[data-result]'),
    copy: findEle('[data-copy]'),
    reset: findEle('[data-btn-reset]'),
  });

  const calcSlope = (sizeDif, vpDif) => {
    const slope = divide(sizeDif, vpDif);
    return slope;
  };

  const calcYIntersect = (minVP, slope, minimum) => {
    const yIntersect = (0 - minVP) * slope + minimum;
    return yIntersect;
  };

  const renderResult = (min, yInt, slope, max) => {
    const result = `clamp(${min}rem, ${yInt}rem + ${slope * 100}vw, ${max}rem)`;
    elements.result.textContent = result;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const maximumSize = +findEle('[data-size-max]').value;
    const minimumSize = +findEle('[data-size-min]').value;
    const maximumVP = calcVP(+findEle('[data-vp-max]').value);
    const minimumVP = calcVP(+findEle('[data-vp-min]').value);

    const sizeDif = subtract(maximumSize, minimumSize);
    const vpDif = subtract(maximumVP, minimumVP);

    const slope = calcSlope(sizeDif, vpDif);
    const yIntersect = calcYIntersect(minimumVP, slope, minimumSize);

    renderResult(minimumSize, yIntersect, slope, maximumSize);
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
    elements.result.textContent = '';
  };

  elements.calculate.addEventListener('click', handleCalculate);
  elements.copy.addEventListener('click', handleCopy);
  elements.reset.addEventListener('click', handleReset);
})();
