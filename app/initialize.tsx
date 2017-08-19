import { render } from 'inferno';
import Component from 'inferno-component';

import MailContainer from './components/mail-container';

const app = document.getElementById('app');

class App<P, S> extends Component<P, S> {
  render() {
    return <MailContainer />;
  }
}

if(app) render( <App />, app);