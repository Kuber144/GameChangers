import mongoose, { Schema } from "mongoose";

const testSchema = new Schema({
  title: { type: String, required: true },
  tests: [
    {
      description: { type: String },
      type: { type: String },
      selector: { type: String },
      property: { type: String },
      value: { type: String },
      comparisonType: { type: String },
      value2: { type: String },
      htmlOption: { type: String },
      htmlValue: { type: String },
      htmlCondition: { type: String },
      htmlValueToCompare: { type: String },
      htmlComparisonType: { type: String },
      functionName: { type: String },
      testType: { type: String },
      arguments: { type: [String] },
      expectedOutput: { type: String },
      selectorType: { type: String },
      cssElement: { type: String },
      cssProperty: { type: String },
      cssValue: { type: String },
    },
  ],
});

const TestData = mongoose.model("TestData", testSchema);

export { TestData };
