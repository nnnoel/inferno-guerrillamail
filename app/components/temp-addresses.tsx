import Inferno from 'inferno';
import Component from 'inferno-component';


class TempAddresses extends Component<any, any> {
  render() {
    if(this.props.isLoading) {
      return (
        <div class="container__grid temp-addresses">
          <h2>Temp Addresses</h2>
          <div>Loading..</div>
        </div>
      );
    }
    return (
      <div class="container__grid temp-addresses">
        <h2>Temp Addresses</h2>
        <div>Email: { this.props.emailAddress }</div>
        <div>Alias: { this.props.emailAlias }</div>
        <button style={{ textAlign: "right" }}>Delete</button>
      </div>
    );
  }
}

export default TempAddresses;