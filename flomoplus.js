"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.getErrorInfo = void 0;
const axios_1 = require("axios");

// the main sendToFlomo action
const sendToFlomo = async (input, options) => {
  // check if the apikey is set
  if (options.apikey === undefined || options.apikey === "") {
    popclip.showText("Please set the flomo API key in the PopClip extension settings.");
    return;
  }

  // create a new axios instance
  const req = axios_1.default.create({
    headers: { "Content-Type": "application/json" },
  });

  // check if the tag is set
  const tag = options.tag === undefined || options.tag === "" ? "#popclip" : `#${options.tag}`;

  try {
    const {
      data: { message },
    } = await req.post(`${options.apikey}`, {
      content: `${tag} \n ${input.text}`,
    });
    popclip.showText(message);
  } catch (e) {
    popclip.showText(getErrorInfo(e));
  }
};

function getErrorInfo(error) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = error.response;
    return `${response.data.message}`;
  } else {
    return String(error);
  }
}
exports.getErrorInfo = getErrorInfo;

// export the actions
exports.actions = [
  {
    title: "SendToFlomo",
    code: sendToFlomo,
  },
];
