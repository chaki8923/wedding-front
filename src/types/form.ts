export type Login = {
  email: string;
  password: string;
  token: string;
};

export type SignUp = {
  email: string;
  password: string;
  token: string;
};

export type Create = {
  userId: string;
  text: string;
};

export type Invitation = {
  id: string;
  userId: string;
  title: string;
  event_date: string;
  place: string;
  comment: string;
  file_url: string;
};

export type Delete = {
  id: string;
}

export type Invitee = {
  id: string;
  userId: string;
  family_kj: string;
  first_kj: string;
  family_kn: string;
  first_kn: string;
  email: string;
  zip_code: string;
  address_text: string;
  allergy: string;
  file_url: string;
  join_flag: boolean;
};

export type SendMail = {
  subject: string;
  to: string;
  from: string;
  body: string;
};

export type Upload = {
  comment: string;
  file_url: string;
};
