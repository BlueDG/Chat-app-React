import React, { Component } from "react";

export default class Form extends Component {
  state = {
    message: "",
    length: this.props.length
  };

  handleChange = event => {
    const message = event.target.value;
    const length = this.props.length - message.length;
    this.setState({ message, length });
  };

  createMessage = () => {
    const { addMessage, pseudo, length } = this.props;
    const message = {
      pseudo,
      message: this.state.message
    };
    addMessage(message);

    // TextArea Reset
    this.setState({ message: "", length });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.createMessage();
  };

  handleKeyUp = event => {
    if (event.key === "Enter") {
      this.createMessage();
    }
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <textarea
            required
            maxLength={this.props.length}
            onChange={this.handleChange}
            value={this.state.message}
            onKeyUp={this.handleKeyUp}
          />
          <div className="info">{this.state.length}</div>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
