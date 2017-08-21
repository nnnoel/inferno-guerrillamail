import { Email } from './email.interface';

export interface MailContainerState {
  apiIsDown: boolean,
  emailAddress: string;
  emailAlias: string;
  emailList: Email[];
  emailView: boolean;
  viewEmail?: Email;
  emailCheckDuration: number;
  selectedEmails: number[];
};