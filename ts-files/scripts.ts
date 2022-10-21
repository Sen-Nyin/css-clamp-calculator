const findEle = (selector: string) => document.querySelector(selector) as HTMLElement;

interface Elements {
  calculate: HTMLButtonElement;
  result: HTMLElement;
  copy: HTMLButtonElement;
  reset: HTMLButtonElement;
}

const elements: Elements = Object.freeze({
  calculate: findEle('[data-btn-calculate]') as HTMLButtonElement,
  result: findEle('[data-result]') as HTMLElement,
  copy: findEle('[data-copy]') as HTMLButtonElement,
  reset: findEle('[data-btn-reset]') as HTMLButtonElement,
});

const subtract = (num1: number, num2: number): number => num1 - num2;
const divide = (num1: number, num2: number): number => num1 / num2;

const calcVP = (pixels: number): number => {
  const pixelsPerRemElement = findEle('[data-rem-value]') as HTMLInputElement;
  const pixelsPerRem: number = +pixelsPerRemElement.value;
  const rem: number = divide(pixels, pixelsPerRem);
  return rem;
};

const calcSlope = (sizeDif: number, vpDif: number): number => {
  const slope: number = divide(sizeDif, vpDif);
  return slope;
};

const calcYIntersect = (minVP: number, slope: number, minimum: number): number => {
  const yIntersect = (0 - minVP) * slope + minimum;
  return yIntersect;
};

const renderResult = (min: number, yInt: number, slope: number, max: number): void => {
  const result = `clamp(${min}rem, ${yInt}rem + ${slope * 100}vw, ${max}rem)`;
  elements.result.textContent = result;
};

const handleCopy = (e: Event) => {
  e.preventDefault();
  const copyText = elements.result.textContent;
  if (!copyText) return;
  navigator.clipboard.writeText(copyText);
};

const handleCalculate = (e: Event) => {
  e.preventDefault();

  const maxSizeInput = findEle('[data-size-max]') as HTMLInputElement;
  const minSizeInput = findEle('[data-size-min]') as HTMLInputElement;
  const maxVPInput = findEle('[data-vp-max]') as HTMLInputElement;
  const minVPInput = findEle('[data-vp-min]') as HTMLInputElement;

  const maximumSize: number = +maxSizeInput.value;
  const minimumSize: number = +minSizeInput.value;
  const maximumVP: number = +maxVPInput.value;
  const minimumVP: number = +minVPInput.value;

  const sizeDif: number = subtract(maximumSize, minimumSize);
  const vpDif: number = subtract(maximumVP, minimumVP);

  const slope: number = calcSlope(sizeDif, vpDif);
  const yIntersect: number = calcYIntersect(minimumVP, slope, minimumSize);

  renderResult(minimumSize, yIntersect, slope, maximumSize);
};

const handleReset = (e: Event) => {
  e.preventDefault();
  const form = findEle('[data-form]') as HTMLFormElement;
  form.reset();
  elements.result.textContent = '';
};

elements.calculate.addEventListener('click', handleCalculate);
elements.copy.addEventListener('click', handleCopy);
elements.reset.addEventListener('click', handleReset);
