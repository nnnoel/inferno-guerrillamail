import Component from 'inferno-component';

import GuerrillaAPIService from '../services/guerilla-api';
import { parseJSONObject, parseJSONList } from '../utils';

import { Email } from '../interfaces/email.interface';
import { MailContainerState } from '../interfaces/mail-container.interface';

import EmailView from './email-view';
import Inbox from './inbox';
import TempAddresses from './temp-addresses';

class MailContainer extends Component<any, MailContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      emailAlias: '',
      emailList: [],
      emailView: false,
      emailCheckDuration: 10,
      selectedEmails: []
    };
    this.setupMailContainer();
  }

  private guerrillaAPI = new GuerrillaAPIService();
  private timerID;

  private setupMailContainer() {
    this.getEmailAddress().then(({ email_addr, alias, sid_token}) => {
      // temporary email address(es) finished loading..
      this.setState({ emailAddress: email_addr, emailAlias: alias }, () => {
        this.getEmailList(sid_token);
      });
    });
  }

  private startCheckEmailTimer() {
    this.timerID = setInterval(() => {
      this.checkEmailDuration();
    }, 1000);
  }

  private checkEmailDuration() {
    if(!this.state) return;
    const duration = this.state.emailCheckDuration;
    if(duration > 0) {
      this.setState((prevState) => ({ emailCheckDuration: prevState.emailCheckDuration - 1 }));
    } else {
      clearInterval(this.timerID);
      this.checkEmail();
    }
  }

  private checkEmail() {
    // email list is loading..
    return this.guerrillaAPI.checkEmail().then(({ list = [], count }) => {
      // TODO: Do something with count
      // email list finished loading..
      if(list.length) {
        this.setState((prevState) => ({
          emailList: parseJSONList(list),
          emailCheckDuration: 10
        }), () => {
          this.startCheckEmailTimer();
        });
      } else {
        this.setState({ emailCheckDuration: 10 }, () => {
          this.startCheckEmailTimer();
        });
      }
    });
  }

  private getEmailAddress() {
    // temporary email address(es) started loading..
    return this.guerrillaAPI.getEmailAddress();
  }

  private getEmailList(token) {
    // email list is loading..
    return this.guerrillaAPI.getEmailList(token).then(({ list }) => {
      // email list finished loading..
      this.setState({ emailList: parseJSONList(list), emailCheckDuration: 10 }, () => {
        this.startCheckEmailTimer();
      });
    });
  }

  private getEmail(emailID) {
    if(this.state && this.state.viewEmail && this.state.viewEmail.mail_id === emailID) {
      return this.setState( prevState => ({ emailView: true, selectedEmails: [] }));
    }

    return this.guerrillaAPI.fetchEmail(emailID).then( email => this.setState({ emailView: true, viewEmail: parseJSONObject(email), selectedEmails: [] }) );
  }

  private goBackToInbox() {
    this.setState( prevState => {
      const viewEmail = prevState.viewEmail;
      const emailList = prevState.emailList.reduce((newList, emailObj) => {
        return newList.concat(emailObj.mail_id === viewEmail.mail_id ? { ...emailObj, mail_read: 1 } : emailObj);
      }, []);
      return { emailView: false, emailList }
    });
  }

  private handleSelectedEmail(mailID, checked) {
    if(checked && this.state && !this.state.selectedEmails.includes(mailID)) {
      this.setState( prevState => ({
        selectedEmails: [ ...prevState.selectedEmails, mailID ]
      }));
    } else if(!checked && this.state && this.state.selectedEmails.includes(mailID)) {
      this.setState( prevState => ({
        selectedEmails: [ ...prevState.selectedEmails.filter(id => id !== mailID) ]
      }));
    }
  }

  private getViewNode(state) {
    const viewEmail = state.viewEmail;
    if(state.emailView) {
      return <EmailView
              onClickBack={ this.goBackToInbox.bind(this) }
              mailID={ viewEmail.mail_id }
              mailBody={ viewEmail.mail_body }
              mailDate={ viewEmail.mail_date }
              mailExcerpt={ viewEmail.mail_excerpt }
              mailFrom={ viewEmail.mail_from }
              mailRead={ viewEmail.mail_read }
              mailRecipient={ viewEmail.mail_recipient || state.emailAddress }
              mailSubject={ viewEmail.mail_subject }
              mailTimestamp={ viewEmail.mail_timestamp }
              mailRefMID={ viewEmail.ref_mid }
             />
    } else {
      return <Inbox
              onClickCheckbox={ this.handleSelectedEmail.bind(this) }
              onClickEmail={ this.getEmail.bind(this) }
              emailList={ state.emailList }
              nextUpdateMessage={ state.emailCheckDuration > 0 ? `Next update in: ${state.emailCheckDuration} sec.` : 'Checking..' }
              selectedEmails={ state.selectedEmails }
             />
    }
  }

  render(){
      if(!this.state) {
        return (
          <div class="container">
            <Inbox emailList={ [] }/>
            <TempAddresses isLoading="true"/>
          </div>
        ); 
      }

      let viewNode = this.getViewNode(this.state);

      return (
        <div class="container">
          { viewNode }
          <TempAddresses
            emailAddress={ this.state.emailAddress }
            emailAlias={ this.state.emailAlias }
          />
        </div>
      );
  }
}

export default MailContainer;