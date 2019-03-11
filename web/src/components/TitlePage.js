import React, { Component } from "react";
class TitlePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: undefined
      }
      this.loadTitle = this.loadTitle.bind(this);
    }
    loadTitle() {
      var titleNo = this.props.match.params.titleNo;
      fetch(`/api/titles/${titleNo}`)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.setState({
            data: json,
          })
        });
    }
    componentDidMount() {
      this.loadTitle();
    }
    componentDidUpdate(newProps) {
      var titleNo = this.props.match.params.titleNo;
      if(this.state.data && this.state.data.id != titleNo) {
        this.loadTitle();
      }
    }
    render() {
      var titleNo = this.props.match.params.titleNo;
      var title = this.state.data;
      return (
        <div>
          <h3>Title #{titleNo}</h3>
          {this.state.data === undefined && <p>
            Loading...
          </p>}
          {this.state.data && <div>
            <table>
                <tbody>
                    <tr>
                        <th>Description</th>
                        <td>{title.description}</td>
                    </tr>
                    <tr>
                        <th>Current Owner</th>
                        <td>{title.ownerName}</td>
                    </tr>
                </tbody>
            </table>
          </div>}
        </div>
      );
    }
}

export default TitlePage;