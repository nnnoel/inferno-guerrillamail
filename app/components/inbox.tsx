import { linkEvent } from 'inferno';
import Component from 'inferno-component';

import Email from './email';

class Inbox extends Component<any, any> {
  private onClickEmail(data, event) {
    this.props.onClickEmail(data.mailID);
  }

  private onClickCheckbox(data, checked) {
    this.props.onClickCheckbox(data.mailID, checked);
  }

  render() {
    return (
      <div class="container__grid inbox">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Inbox</h2>
          { this.props.nextUpdateMessage }
        </div>
        <table class="inbox__messages">
          <tbody>
            {
              this.props.emailList.length ?
              this.props.emailList.map( email =>
                (<Email
                  isChecked={ this.props.selectedEmails.includes(email.mail_id) }
                  onClickCheckbox={ this.onClickCheckbox.bind(this) }
                  onClickEmail={ this.onClickEmail.bind(this) }
                  mailID={email.mail_id}
                  mailFrom={email.mail_from}
                  mailSubject={email.mail_subject}
                  mailExcerpt={email.mail_excerpt}
                  mailTimestamp={email.mail_timestamp}
                  mailRead={email.mail_read}
                  mailData={email.mail_date}
                />)
              ) :
              <div>Loading..</div>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Inbox;