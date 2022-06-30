export type UrlBreadcrumd = {
  link: string;
  name: string;
};

export type SpinerProps = {
  isFone?: boolean;
};

export type ContainerProps = {
  children: React.ReactNode;
};

export type UserItem = {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phoneNumebr: string;
  position: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AuthValidations = {
  email: {
    requiredMessage: string;
    invalidEmailMessage: string;
  };
  password: {
    requiredMessage: string;
    min: {
      value: number;
      invalidMessage: string;
    };
    max: {
      value: number;
      invalidMessage: string;
    };
    pattern: {
      regex: RegExp;
      invalidMessage: string;
    };
  };
  errorAnswer: string;
};

export type MenuItem = {
  text: string;
  icon: any;
  navigationLink: string;
};

export type UsersTable = {
  id: string;
  user: string;
};
