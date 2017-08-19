export interface Email {
  mail_id: number;
  mail_body: string;
  mail_excerpt: string;
  mail_from: string;
  mail_read: number;
  mail_recipient: string | boolean;
  mail_subject: string;
  mail_timestamp: number;
  ref_mid: string;
}