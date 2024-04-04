export interface LoginRequestProps {
  email: string;
  password: string;
}

export interface ForgetPasswordProps {
  email: string;
}

export interface userInfoProps {
  id: string | null;
  token: string | null;
}
export interface cancelTicketProps {
  ticketId: string | null | undefined;
  userToken: string | null | undefined;
}
