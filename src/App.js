import React, { Component, createRef } from "react";
import "./App.css";
import Form from "./components/Form";
import Message from "./components/Message";

// Firebase
import base from "./base";

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  };

  messagesRef = createRef();

  componentDidMount() {
    base.syncState("/", {
      context: this,
      state: "messages"
    });
  }

  componentDidUpdate() {
    const ref = this.messagesRef.current;
    ref.scrollTop = ref.scrollHeight;
  }

  addMessage = message => {
    const messages = { ...this.state.messages };
    messages[`message-${Date.now()}`] = message;
    this.setState({ messages });
  };

  render() {
    const messages = Object.keys(this.state.messages).map(key => (
      <Message
        key={key}
        message={this.state.messages[key].message}
        pseudo={this.state.messages[key].pseudo}
      ></Message>
    ));

    return (
      <div className="box">
        <div>
          <div className="messages" ref={this.messagesRef}>
            <div className="message">{messages}</div>
          </div>
        </div>
        <Form
          length={140}
          addMessage={this.addMessage}
          pseudo={this.state.pseudo}
        />
      </div>
    );
  }
}

export default App;
