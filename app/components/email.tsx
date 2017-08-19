import { linkEvent } from 'inferno';
import Component from 'inferno-component';

class Email extends Component<any, any> {
  private onClickCheckbox(data, event) {
    event.stopPropagation();
    data.props.onClickCheckbox(data.props, event.target.checked);
  }

  private onClickEmail(data, event) {
    data.props.onClickEmail(data.props);
  }

  private onClickSave(data, event) {
    event.stopPropagation();
    if(data.state && data.state.saved) return;
    data.setState({ saved: true });
  }

  render() {
    return (
      <tr
        onClick={ linkEvent(this, this.onClickEmail) }
        className={ this.props.mailRead ? "inbox__message" : "inbox__message--new" }
      >
        <td>
          <input type="checkbox" onClick={ linkEvent(this, this.onClickCheckbox) } checked={ this.props.isChecked }/>
        </td>
        <td>
          { this.props.mailFrom }
        </td>
        <td>
          { this.props.mailSubject }
        </td>
        <td>
          <button onClick={ linkEvent(this, this.onClickSave) }>Save</button>
        </td>
        { this.state && this.state.saved && <td> Saved </td> }
      </tr>
    );
  }
}

export default Email;