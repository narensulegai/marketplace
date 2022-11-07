import React from "react";
import { withStyles } from "@material-ui/core/styles";
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
import {
  currentUser as getCurrentUser,
  getChats,
  sendMessage,
} from "../../util/fetch/api";

class ChatPanel extends React.Component {
  constructor(props) {
    super();
    this.state = {
      chats: [],
      user: "",
      currentUser: "",
      selectedChatId: "",
      text: "",
      user2: "",
    };
  }

  componentDidMount = () => {
    this.getUser();
    this.subscribe();
    const policy = window.location.href.split("/")[5];
    if (policy !== "undefined") {
      this.selectedChat(policy);
    }
  };

  getUser = async () => {
    const { user } = await getCurrentUser();
    this.setState({
      user,
    });
  };

  subscribe = async () => {
    let response = await getChats("123");

    if (response.status == 502) {
      // Status 502 is a connection timeout error,
      // may happen when the connection was pending for too long,
      // and the remote server or a proxy closed it
      // let's reconnect
      await this.subscribe();
    } else if (response.status != 200) {
      // An error - let's show it
      let channels = await response;
      this.setState({
        chats: channels,
      });

      // Reconnect in one second
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
      user1: this.state.user._id,
      user2: this.state.selectedChatId.user2,
      msg: this.state.text,
      channel: this.state.selectedChatId._id,
    };
    sendMessage(message).then((response) => {
      console.log(response);
      this.setState({
        text: "",
      });
    });
  };

  selectedChat = async (id) => {
    const chat = this.state.chats.filter((c) => c._id === id);

    if (
      this.state.selectedChatId._id === undefined ||
      id._id != this.state.selectedChatId._id
    ) {
      this.setState({
        selectedChatId: id,
      });
    }
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
                <ListItemText primary={this.state.user.name}></ListItemText>
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
              {chats.length > 0 &&
                chats.map((m) => {
                  return (
                    <>
                      <ListItem
                        button
                        key="RemySharp"
                        onClick={() => this.selectedChat(m)}
                      >
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://material-ui.com/static/images/avatar/1.jpg"
                          />
                        </ListItemIcon>
                        <ListItemText primary={m.channel}></ListItemText>
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
            <List
              style={{
                width: "calc( 100% - 20px )",
                margin: 10,
                overflowY: "scroll",
                height: "calc( 100% - 95px )",
              }}
            >
              {chats.length > 0 &&
              chats.filter((c) => c._id == this.state.selectedChatId._id)
                .length > 0 ? (
                chats
                  .filter((c) => c._id == this.state.selectedChatId._id)[0]
                  .messages.map((m) => {
                    return (
                      <ListItem key={m._id} border="1px solid">
                        <Grid container>
                          {this.state.user._id === m.user1 ? (
                            <Grid item xs={12}>
                              <h5 align="right">You</h5>

                              <ListItemText
                                align="right"
                                primary={m.msg}
                                secondary={m.createdAt}
                              ></ListItemText>
                            </Grid>
                          ) : (
                            <Grid item xs={12}>
                              {this.state.user.website !== undefined ? (
                                <h5 align="left">Buyer</h5>
                              ) : (
                                <h5 align="left">Seller</h5>
                              )}
                              <ListItemText
                                align="left"
                                primary={m.msg}
                                secondary={m.createdAt}
                              ></ListItemText>
                            </Grid>
                          )}
                        </Grid>
                      </ListItem>
                    );
                  })
              ) : (
                <ListItem key="1"></ListItem>
              )}
            </List>

            <Divider />
            <Grid container style={{ padding: "20px", "box-shadow": "none" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  size="lg"
                  style={{ "box-shadow": "none", background: "none" }}
                  onChange={this.handleText}
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
