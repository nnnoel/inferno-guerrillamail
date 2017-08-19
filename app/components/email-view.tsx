import { linkEvent, createVNode } from 'inferno';
import Component from 'inferno-component';

class EmailView extends Component<any, any> {
  private onClickBack(data, event) {
    data.props.onClickBack();
  }

  render() {
    // TODO: Handle mailBody differently
    return (
      <div class="container__grid email-view">
        <button onClick={ linkEvent(this, this.onClickBack) }>« Back to inbox</button>
        <div data-ref-mid={ this.props.mailRefMID }>
          <h3>{ this.props.mailSubject }</h3>
          <p>
            <strong>From: { this.props.mailFrom }</strong>,
            <strong> To: { this.props.mailRecipient }</strong>,
            <strong> Date: { this.props.mailDate }</strong>
          </p>
        </div>
        <div dangerouslySetInnerHTML={ { __html: this.props.mailBody } }>
        </div>
      </div>
    );
  }
}

export default EmailView;