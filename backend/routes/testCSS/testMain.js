import { JSDOM } from "jsdom";
/**
 * @param {CheerioStatic} $ The Cheerio instance representing the parsed HTML.
 * @param {object} test The test parameters containing CSS test conditions.
 * @returns {object} An object containing the pass status and reason for the test.
 */
export function testCSS(srcDoc, test) {
  const dom = new JSDOM(srcDoc);
  const {
    selectorType,
    cssElement,
    cssProperty,
    cssValue,
    comparisonType,
    value2,
  } = test;

  let elements;

  switch (selectorType) {
    case "id":
      elements = dom.window.document.getElementById(cssElement);
      break;
    case "class":
      elements = dom.window.document.getElementsByClassName(cssElement);
      break;
    case "tag":
      elements = dom.window.document.getElementsByTagName(cssElement);
      break;
    default:
      elements = dom.window.document.querySelectorAll(cssElement);
  }

  if (!elements || elements.length === 0) {
    return {
      pass: false,
      reason: `No elements found with ${selectorType} '${cssElement}'`,
    };
  }

  // Check condition for the element
  let pass = false;
  let reason = "";

  let computedValue;
  if (selectorType === "id") {
    computedValue = dom.window.getComputedStyle(elements)[cssProperty];
  } else {
    computedValue = dom.window.getComputedStyle(elements[0])[cssProperty];
  }

  switch (comparisonType) {
    case "equals":
      pass = computedValue === cssValue; //compare with the value we got
      break;
    case "below":
      pass = parseFloat(computedValue) < parseFloat(cssValue);
      break;
    case "above":
      pass = parseFloat(computedValue) > parseFloat(cssValue);
      break;
    case "between":
      pass =
        parseFloat(computedValue) >= parseFloat(cssValue) &&
        parseFloat(computedValue) <= parseFloat(value2);
      break;
    default:
      pass = false;
      reason = `Invalid comparison type: ${comparisonType}`;
      break;
  }

  if (!pass) {
    if (comparisonType === "between")
      reason = `Expected '${cssElement} to have '${cssProperty}' in between '${cssValue}' and '${value2}''`;
    else
      reason = `Expected '${computedValue}' for '${cssProperty}' of '${cssElement}' ${comparisonType} '${cssValue}'`;
  }

  // Return pass/fail and reason
  return { pass, reason };
}
