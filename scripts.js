"use strict";
const findEle = (selector) => document.querySelector(selector);
const elements = Object.freeze({
    calculate: findEle('[data-btn-calculate]'),
    result: findEle('[data-result]'),
    copy: findEle('[data-copy]'),
    reset: findEle('[data-btn-reset]'),
});
const subtract = (num1, num2) => num1 - num2;
const divide = (num1, num2) => num1 / num2;
const calcVP = (pixels) => {
    const pixelsPerRemElement = findEle('[data-rem-value]');
    const pixelsPerRem = +pixelsPerRemElement.value;
    const rem = divide(pixels, pixelsPerRem);
    return rem;
};
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
const handleCopy = (e) => {
    e.preventDefault();
    const copyText = elements.result.textContent;
    if (!copyText)
        return;
    navigator.clipboard.writeText(copyText);
};
const handleCalculate = (e) => {
    e.preventDefault();
    const maxSizeInput = findEle('[data-size-max]');
    const minSizeInput = findEle('[data-size-min]');
    const maxVPInput = findEle('[data-vp-max]');
    const minVPInput = findEle('[data-vp-min]');
    const maximumSize = +maxSizeInput.value;
    const minimumSize = +minSizeInput.value;
    const maximumVP = +maxVPInput.value;
    const minimumVP = +minVPInput.value;
    const maximumVPRem = calcVP(maximumVP);
    const minimumVPRem = calcVP(minimumVP);
    const sizeDif = subtract(maximumSize, minimumSize);
    const vpDif = subtract(maximumVPRem, minimumVPRem);
    const slope = calcSlope(sizeDif, vpDif);
    const yIntersect = calcYIntersect(minimumVPRem, slope, minimumSize);
    renderResult(minimumSize, yIntersect, slope, maximumSize);
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
