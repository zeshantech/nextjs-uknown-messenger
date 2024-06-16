export interface ISigninForm {
  identifier: string;
  password: string;
}

export interface ISignupForm {
  username: string;
  email: string;
  password: string;
}

export interface IVerifyEmailForm {
  email: string;
  OTP: string;
}
