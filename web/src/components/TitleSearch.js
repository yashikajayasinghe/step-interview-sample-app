import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Form, Input, Button} from "reactstrap";

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

class TitleSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            validate: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (rx_live.test(event.target.value)) {
            this.setState({value: event.target.value});
        }
    }

    handleSubmit(event) {
        //Handle Empty form submition
        if (this.state.value) {
            this.props.history.push(`/titles/${this.state.value}`);
        }

    }

    render() {
        return (
            <div style={{display: "inline-block"}}>
                <Form inline onSubmit={this.handleSubmit}>
                    <Input type="text" value={this.state.value} pattern="^[0-9]*$" onChange={this.handleChange}
                           placeholder="Enter a title number"/>
                    &nbsp;
                    <Button color="primary" type="submit" value="Submit">Go</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(TitleSearch);