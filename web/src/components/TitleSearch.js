import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";

class TitleSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      this.props.history.push(`/titles/${this.state.value}`);
    }
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
                Title Number:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  export default withRouter(TitleSearch);