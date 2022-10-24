"use strict";
const findEle = (selector) => document.querySelector(selector);
const elements = Object.freeze({
    calculate: findEle('[data-btn-calculate]'),
    result: findEle('[data-result]'),
    copy: findEle('[data-copy]'),
    reset: findEle('[data-btn-reset]'),
});
const calcVP = (pixels) => {
    const pixelsPerRemElement = findEle('[data-rem-value]');
    const pixelsPerRem = +pixelsPerRemElement.value;
    return pixels / pixelsPerRem;
};
const calcSlope = (sizeDif, vpDif) => sizeDif / vpDif;
const calcYIntersect = (minVP, slope, minimum) => (0 - minVP) * slope + minimum;
const renderResult = (min, yInt, slope, max) => `clamp(${min}rem, ${yInt}rem + ${slope * 100}vw, ${max}rem)`;
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
    const sizeDif = maximumSize - minimumSize;
    const vpDif = maximumVPRem - minimumVPRem;
    const slope = calcSlope(sizeDif, vpDif);
    const yIntersect = calcYIntersect(minimumVPRem, slope, minimumSize);
    elements.result.textContent = renderResult(minimumSize, yIntersect, slope, maximumSize);
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
