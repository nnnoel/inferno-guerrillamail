class GuerrillaAPIService {
  private readonly baseUrl = 'https://api.guerrillamail.com/ajax.php?';
  private sessionToken = localStorage.getItem('APISessionID');

  getEmailAddress() {
    const queryUrl = this.sessionToken ? `${this.baseUrl}f=get_email_address&sid_token=${this.sessionToken}` : `${this.baseUrl}f=get_email_address`
    return fetch(queryUrl).then( res => res.json() ).then( res => {
      if(!this.sessionToken && res.sid_token) localStorage.setItem('APISessionID', res.sid_token);
      return res;
    });
  }
  // set_email_user -- email_user, sid_token
  setEmailUser() {

  }
  // check_email -- sid_token, seq (sequence number id of oldest email)
  checkEmail() {
    const queryUrl = `${this.baseUrl}f=check_email&seq=0&sid_token=${this.sessionToken}`;
    return this.makeAPIRequest(queryUrl);
  }
  // get_email_list -- sid_token, offset (optional -- how many emails to start from skip. Starts from 0), seq (sequence id of the first email)
  getEmailList(token) {
    const sessionToken = this.sessionToken || token;
    const queryUrl = `${this.baseUrl}f=get_email_list&offset=0&sid_token=${sessionToken}`;
    return this.makeAPIRequest(queryUrl);
  }
  // fetch_email -- sid_token, email_id
  fetchEmail(emailID) {
    const queryUrl = `${this.baseUrl}f=fetch_email&&email_id=${emailID}&sid_token=${this.sessionToken}`;
    return this.makeAPIRequest(queryUrl);
  }
  // forget_me -- sid_token, email_addr
  forgetMe() {

  }
  // del_email -- sid_token, email_ids (array (( email_ids[]=425&email_ids[]=426&email_ids[]=427 )) or integer)
  deleteEmail() {

  }
  // get_older_list -- sid_token, seq, limit (integer how maby emails tofetch max)
  getOlderList() {

  }

  private makeAPIRequest(queryUrl) {
    return fetch(queryUrl).then( res => res.json() );
  }
}

export default GuerrillaAPIService;