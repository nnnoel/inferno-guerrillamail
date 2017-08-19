import { Email } from './email.interface';

export interface MailContainerState {
  emailAddress: string;
  emailAlias: string;
  emailList: Email[];
  emailView: boolean;
  viewEmail?: Email;
  emailCheckDuration: number;
  selectedEmails: number[];
};