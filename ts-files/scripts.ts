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

const calcVP = (pixels: number): number => {
  const pixelsPerRemElement = findEle('[data-rem-value]') as HTMLInputElement;
  const pixelsPerRem: number = +pixelsPerRemElement.value;
  return pixels / pixelsPerRem;
};

const calcSlope = (sizeDif: number, vpDif: number): number => sizeDif / vpDif;

const calcYIntersect = (minVP: number, slope: number, minimum: number): number =>
  (0 - minVP) * slope + minimum;

const renderResult = (min: number, yInt: number, slope: number, max: number): string =>
  `clamp(${min}rem, ${yInt}rem + ${slope * 100}vw, ${max}rem)`;

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

  const maximumVPRem: number = calcVP(maximumVP);
  const minimumVPRem: number = calcVP(minimumVP);

  const sizeDif: number = maximumSize - minimumSize;
  const vpDif: number = maximumVPRem - minimumVPRem;

  const slope: number = calcSlope(sizeDif, vpDif);
  const yIntersect: number = calcYIntersect(minimumVPRem, slope, minimumSize);

  elements.result.textContent = renderResult(minimumSize, yIntersect, slope, maximumSize);
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
