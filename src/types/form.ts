export type Login = {
  email: string;
  password: string;
  token: string;
};

export type Create = {
  userId: string;
  text: string;
};

export type Invitation = {
  userId: string;
  title: string;
  event_date: string;
  place: string;
  comment: string;
  file: string;
};
