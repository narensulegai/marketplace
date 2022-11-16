import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import UserIcon from "@material-ui/icons/SupervisedUserCircle";
import PolicyIcon from "@material-ui/icons/";
import { formatTime } from "../../util";
import {
  currentUser as getCurrentUser,
  getChats,
  getUser,
  sendMessage,
} from "../../util/fetch/api";

let timeoutId = "";
class ChatPanel extends React.Component {
  constructor(props) {
    super();
    this.state = {
      chats: [],
      user: "",
      currentUser: "",
      selectedChatId: "",
      channels: [],
      text: "",
      user2: "",
      messages: [],
      companyId: "",
      userId: "",
    };
  }

  componentDidMount = () => {
    const companyId = window.location.href.split("/")[6];
    const userId = window.location.href.split("/")[5];
    this.setState({
      companyId,
      userId,
    });
    this.getLoggedInUser();
    this.subscribe();
    if (userId !== "undefined") {
      this.getUser2(userId);
    }
  };

  componentWillUnmount = () => {
    clearInterval(timeoutId);
  };

  getUser2 = async (id) => {
    const user = await getUser(id);
    let chats = this.state.chats;
    if (chats.filter((c) => c._id === user._id).length === 0) {
      chats.push({ name: user.name, _id: user._id, channel: user.name });
      this.setState({
        chats,
      });
    }
    this.selectedChat(chats.filter((c) => c._id === user._id)[0]);
  };

  getLoggedInUser = async () => {
    const user = await getCurrentUser();
    this.setState({
      user,
    });
  };

  subscribe = async () => {
    let response = [];
    if (this.state.user.user !== undefined) {
      response = await getChats(this.state.user.user._id);
    }

    if (response.status == 502) {
      // Status 502 is a connection timeout error,
      // may happen when the connection was pending for too long,
      // and the remote server or a proxy closed it
      // let's reconnect
      await this.subscribe();
    } else if (response.status != 200) {
      // An error - let's show it
      let channels = await response;

      let oldChannels = this.state.channels;
      for (let i = 0; i < channels.length; i++) {
        if (
          this.state.user.user._id !== channels[i].sender._id &&
          oldChannels.filter(
            (c) =>
              channels[i].sender.name === c.name &&
              channels[i].sender._id === c._id
          ).length == 0
        ) {
          oldChannels.push({
            name: channels[i].sender.name,
            _id: channels[i].sender._id,
            channel: channels[i].channel,
          });
        } else if (
          this.state.user.user._id !== channels[i].receiver._id &&
          oldChannels.filter(
            (c) =>
              channels[i].receiver.name === c.name &&
              channels[i].receiver._id === c._id
          ).length == 0
        ) {
          oldChannels.push({
            name: channels[i].receiver.name,
            _id: channels[i].receiver._id,
            channel: channels[i].channel,
          });
        }
      }
      this.setState({
        chats: oldChannels,
        messages: channels,
      });

      // Reconnect in one second
      await new Promise((resolve) => (timeoutId = setTimeout(resolve, 500)));
      await this.subscribe();
    } else {
      // Get and show the message
      let channels = await response;
      this.setState({
        chats: channels,
      });
      // Call subscribe() again to get the next message
      await this.subscribe();
    }
  };

  handleSendMessage = async () => {
    const message = {
      user1: {
        user: this.state.user.user._id,
        type: this.state.user.scope,
      },
      user2: {
        user: this.state.selectedChatId._id,
        type: this.state.user.scope === "company" ? "employee" : "company",
      },
      text: this.state.text,
      channel: this.state.selectedChatId.channel,
    };
    sendMessage(message).then((response) => {
      console.log(response);
      this.setState({
        text: "",
      });
    });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  selectedChat = async (id) => {
    this.setState({
      selectedChatId: id,
    });
    //this.scrollToBottom();
  };

  handleText = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    });
  };

  formatDate = () => {
    let currentTimestamp = Date.now();
    console.log(currentTimestamp); // get current timestamp
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  render() {
    // const classes = useStyles();
    const { chats } = this.state;
    return (
      <Box style={{ minWidth: "650" }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" className="header-message">
              Chat
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          component={Paper}
          style={{ width: "100%", height: "80vh" }}
        >
          <Grid
            item
            xs={3}
            style={{
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    this.state.user.user !== undefined
                      ? this.state.user.user.name
                      : ""
                  }
                ></ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              {this.state.chats.length > 0 &&
                this.state.chats.map((c) => {
                  return (
                    <>
                      <ListItem button key="RemySharp">
                        <ListItemIcon>
                          <Avatar alt={c.channel} />
                        </ListItemIcon>
                        <ListItemText
                          primary={c.name}
                          onClick={() => this.selectedChat(c)}
                        ></ListItemText>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
            </List>
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              height: " 100% ",
              overflowY: "auto",
            }}
          >
            <ListItemIcon>
              <Avatar alt={this.state.selectedChatId.name} />
              <h3 style={{ position: "sticky" }}>
                {" "}
                {this.state.selectedChatId.name}
              </h3>
            </ListItemIcon>
            <Divider />
            <List
              style={{
                width: "calc( 100% - 20px )",
                margin: 10,
                overflowY: "scroll",
                height: "calc( 100% - 130px )",
              }}
            >
              {this.state.messages
                .filter(
                  (c) =>
                    c.sender.name == this.state.selectedChatId.name ||
                    c.receiver.name == this.state.selectedChatId.name
                )
                .map((m) => {
                  return (
                    <ListItem key={m.name} border="1px solid">
                      <Grid container>
                        {this.state.user.user.name === m.sender.name ? (
                          <Grid item xs={12}>
                            <h5 align="right">{m.sender.name}</h5>
                            <ListItemText
                              align="right"
                              primary={m.text}
                              secondary={formatTime(m.createdAt)}
                            ></ListItemText>
                          </Grid>
                        ) : (
                          <Grid item xs={12}>
                            <h5 align="left"> {m.sender.name}</h5>
                            <ListItemText
                              align="left"
                              primary={m.text}
                              secondary={formatTime(m.createdAt)}
                            ></ListItemText>
                          </Grid>
                        )}
                      </Grid>
                    </ListItem>
                  );
                })}
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
            </List>
            <Divider />
            <Grid
              container
              style={{
                padding: "10px",
                "box-shadow": "none",
                position: "sticky",
              }}
            >
              <Grid item xs={10}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  size="lg"
                  style={{ "box-shadow": "none", background: "none" }}
                  onChange={this.handleText}
                  value={this.state.text}
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add">
                  <SendIcon onClick={this.handleSendMessage} />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default ChatPanel;
