import cheerio, { html } from "cheerio";

/**
 * Function to test a single HTML element based on the provided test parameters.
 * @param {CheerioStatic} $ The Cheerio instance representing the parsed HTML.
 * @param {object} test The test parameters containing HTML test conditions.
 * @returns {object} An object containing the pass status and reason for the test.
 */
export function testHTML($, test) {
  const {
    htmlOption,
    htmlValue,
    htmlCondition,
    htmlValueToCompare,
    htmlComparisonType,
  } = test;

  let elements;

  switch (htmlOption) {
    case "id":
      elements = $(`#${htmlValue}`);
      break;
    case "class":
      elements = $(`.${htmlValue}`);
      break;
    case "tag":
      elements = $(`${htmlValue}`);
      break;
    case "attribute":
      elements = $(`[${htmlValue}]`);
      break;
    case "attribute-value":
      elements = $(`[${htmlValue}]`);
      break;
    case "nth-child":
      elements = $(`:nth-child(${htmlValue})`);
      break;
    case "attribute-exists":
      elements = $(`[${htmlValue}]`);
      break;
    default:
      elements = $(`${htmlValue}`);
  }

  if (elements.length === 0) {
    //CHECK IF THE ELEMENT EXISTS
    return {
      pass: false,
      reason: `No elements found with ${htmlOption} '${htmlValue}'`,
    };
  }

  // Check condition for the element
  let value;
  switch (htmlComparisonType) {
    case "text":
      value = elements.first().text();
      break;
    case "id":
      value = elements.first().attr("id");
      break;
    case "class":
      value = elements.first().attr("class");
      break;
    case "tag":
      value = elements.first().prop("tagName").toLowerCase();
      break;
    case "attribute":
      value = elements.first().attr(htmlValueToCompare);
      break;
    case "attribute-value":
      value = elements.first().attr(htmlValueToCompare);
      break;
    case "nth-child":
      value = elements.first().index() + 1; // nth-child index starts from 1
      break;
    case "attribute-exists":
      value = elements.first().attr(htmlValueToCompare) !== undefined;
      break;
    case "value":
      value = elements.first().val();
      break;
    case "href":
      value = elements.first().attr("href");
      break;
    case "src":
      value = elements.first().attr("src");
      break;
    default:
      value = elements.first().attr(`${htmlComparisonType}`);
      break;
  }
  let pass = false;
  let reason = "";

  switch (htmlCondition) {
    case "equals":
      pass = value === htmlValueToCompare;
      break;
    case "contains":
      pass = value.includes(htmlValueToCompare);
      break;
    case "first":
      pass = elements.first().index() === 0;
      break;
    case "last":
      pass = elements.first().index() === elements.length - 1;
      break;
    case "exists":
      pass = elements.length > 0;
      break;
    case "justafter":
      pass =
        $(elements).prev().attr(`${htmlComparisonType}`) === htmlValueToCompare;
    case "justbefore":
      pass =
        $(elements).next().attr(`${htmlComparisonType}`) === htmlValueToCompare;
    default:
      pass = false;
      reason = `Invalid condition: ${htmlCondition}`;
  }

  if (!pass) {
    let conditionText;
    switch (htmlCondition) {
      case "equals":
        conditionText = "to be equal to";
        reason = `Expected '${value}' ${conditionText} '${htmlValueToCompare}'`;
        break;
      case "contains":
        conditionText = "to contain";
        reason = `Expected '${value}' ${conditionText} '${htmlValueToCompare}'`;
        break;
      case "first":
        conditionText = "to be the first element";
        reason = `Expected '${value}' ${conditionText}`;
        break;
      case "last":
        conditionText = "to be the last element";
        reason = `Expected '${value}' ${conditionText}`;
        break;
      case "exists":
        conditionText = "to exist";
        reason = `Expected '${value}' ${conditionText}`;
        break;
      case "justafter":
        conditionText = "to be just after";
        reason = `Expected '${value}' ${conditionText} '${htmlValueToCompare}'`;
        break;
      case "justbefore":
        conditionText = "to be just before";
        reason = `Expected '${value}' ${conditionText} '${htmlValueToCompare}'`;
        break;
      default:
        conditionText = "to meet the condition";
        reason = `Expected '${value}' ${conditionText} '${htmlValueToCompare}'`;
        break;
    }
  }

  // Return pass/fail and reason
  return { pass, reason };
}
