// ActionProvider starter code
import { Redirect } from "react-router";
import React, { Component } from "react";
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.state = {
      redirect: null,
    };
    this.createCustomMessage = createCustomMessage;
  }

  helloHandler = () => {
    const message = this.createChatBotMessage("How may I help you?", {
      widget: "chatOptions",
    });
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  chatWithServiceProviderHandler = () => {
    this.setState({
      redirect: <Redirect to="/messenger" />,
    });
    return this.state.redirect;
  };

  setChatBotMessage = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}
export default ActionProvider;
