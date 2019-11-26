import React, { Component, createRef } from "react";
import "./App.css";
import "./animations.css";
import Form from "./components/Form";
import Message from "./components/Message";

// Firebase
import base from "./base";

// Animations
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  };

  messagesRef = createRef();

  isUser = pseudo => pseudo === this.state.pseudo;

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

    // We only keep 10 messages on the app
    Object.keys(messages)
      .slice(0, -10)
      .forEach(key => {
        messages[key] = null;
      });
    this.setState({ messages });
  };

  render() {
    const messages = Object.keys(this.state.messages).map(key => (
      <CSSTransition key={key} timeout={200} classNames="fade">
        <Message
          isUser={this.isUser}
          message={this.state.messages[key].message}
          pseudo={this.state.messages[key].pseudo}
        />
      </CSSTransition>
    ));

    return (
      <div className="box">
        <div>
          <div className="messages" ref={this.messagesRef}>
            <TransitionGroup className="message">{messages}</TransitionGroup>
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
