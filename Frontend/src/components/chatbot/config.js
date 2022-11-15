import React, { Component } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import ServiceProviderOptions from "../chatWidgets/ServiceProviderOptions";

const config = {
  initialMessages: [createChatBotMessage(`Hello there!`)],
  botName: "Liz",

  widgets: [
    {
      widgetName: "chatOptions",
      widgetFunc: (props) => <ServiceProviderOptions {...props} />,
      mapStateToProps: ["options"],
    },
  ],
  state: {
    options: [
      "Find a policy",
      "Find your quotations",
      "Chat with insurance provider",
    ],
  },
};

export default config;
