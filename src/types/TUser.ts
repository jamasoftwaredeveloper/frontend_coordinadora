export type User = {
  name: string;
  email: string;
  role?: string;
};

export type ResponseUser = {
  user: User;
  message: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type RegisterForm = Pick<User, "email" | "name"> & {
  password: string;
  password_confirmation: string;
};

export type RegisterResponse = {
  message: string;
  code: number;
};
