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
  phone_number: string;
  position: string;
  created_at?: Date;
  updated_at?: Date;
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
  phoneNumber: {
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

export type ConfirmDialogProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};
