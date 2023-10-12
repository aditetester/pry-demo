import { Operand } from "../types";

export const SUGGESTIONS: Operand[] = [
  {
    title: "Payroll Bonus COGS",
    subTitle: "Payroll bonus for COGS department",
    type: "currency",
    value: 1202,
    rightHandle: "x",
    rightInputWidth: 10
  },

  {
    title: "Payroll Bonus G&A",
    subTitle: "Payroll bonus for G&A department",
    type: "currency",
    value: 1230,
    rightHandle: "x",
    rightInputWidth: 10
  },

  {
    title: "Payroll Bonus R&D",
    subTitle: "Payroll bonus for R&D department",
    type: "currency",
    rightHandle: "x",

    value: 1202,
    rightInputWidth: 10
  },

  {
    title: "Payroll Bonus S&M",
    subTitle: "Payroll bonus for S&M department",
    type: "currency",
    value: 1230,
    rightHandle: "x",
    rightInputWidth: 10
  },
  {
    title: "Payroll COGS",
    subTitle: "Payroll bonus for COGS department",
    type: "currency",
    rightHandle: "x",

    value: 1202,
    rightInputWidth: 10
  },

  {
    title: "Payroll G&A",
    subTitle: "Payroll for G&A department",
    type: "currency",
    rightHandle: "x",

    value: 1230,
    rightInputWidth: 10
  },

  {
    title: "Payroll R&D",
    subTitle: "Payroll for R&D department",
    type: "currency",
    rightHandle: "x",

    value: 1202,
    rightInputWidth: 10
  },

  {
    title: "Payroll S&M",
    subTitle: "Payroll for S&M department",
    type: "currency",
    rightHandle: "x",
    value: 1230,
    rightInputWidth: 10
  },
  {
    title: "Payroll Tax",
    subTitle: null,
    type: "percentage",
    value: 1230,
    rightHandle: null,
    rightInputWidth: 10
  },
  {
    title: "SUM",
    subTitle: "Add a selected range of values.",
    type: "function",
    value: 1230,
    rightHandle: "x",
    rightInputWidth: 10
  },
  {
    title: "Bonus Payout Month",
    subTitle: "Month number for bonus calculation",
    type: "number",
    value: 1230,
    rightHandle: null,
    rightInputWidth: 10
  },
  {
    title: "Strip New Customers",
    subTitle: "Month number for bonus calculation",
    type: "number",
    value: 1230,
    rightHandle: null,
    rightInputWidth: 10
  },
  {
    title: "Strip Churned Customers",
    subTitle: "Month number for bonus calculation",
    type: "number",
    value: 1230,
    rightHandle: null,
    rightInputWidth: 10
  }
];

export const OPERATORS = ["+", "-", "*", "(", ")", "^", "/"];
