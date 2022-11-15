import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Redirect } from "react-router";
const ServiceProviderOptions = (props, { actionProvider }) => {
  //const [imageUrl, setImageUrl] = useState("");
  const [redirectVal, redirectValFn] = useState(null);
  const { setState } = props;

  //setState((state) => ({ ...state, options: data }));

  const handleOption = (option) => {
    option.preventDefault();
    const message = props.actionProvider.createClientMessage(
      option.target.innerHTML
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    if (option.target.innerHTML === "Chat with Service Provider") {
      props.actionProvider.chatWithServiceProviderHandler();
    } else if (option.target.innerHTML === "Post a review") {
      props.actionProvider.postReviewHandler();
    } else if (option.target.innerHTML === "Service History") {
      props.actionProvider.serviceHistoryHandler();
    } else if (option.target.innerHTML === "Upcoming Services") {
      props.actionProvider.serviceUpcomingHandler();
    }
  };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <div>
          {props.options.map((s) => (
            <Chip
              label={s}
              color="primary"
              onClick={(option) => handleOption(option)}
            />
          ))}
        </div>
      </Stack>
    </Stack>
  );
};

export default ServiceProviderOptions;
