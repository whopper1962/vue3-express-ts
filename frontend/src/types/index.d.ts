export type AuthInfo = {
  userName: string;
  email: string;
  profileImage: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type SignInInfo = {
  email: string;
  password: string;
};

export type NewUser = {
  name: string;
  email: string;
  password: string;
  profileImage: string;
};
