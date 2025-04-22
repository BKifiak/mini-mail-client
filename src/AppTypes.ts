export type Email = {
  body: string;
  id: string;
  sender: string;
  subject: string;
  date: string;
  avatar: string;
  email: string;
};

export type EmailApiResponse = {
  emails: Email[];
  totalCount: number;
};
