export type TResponse<TData> = {
  data: TData | undefined;
  message: string;
  statusCode: 200;
};

export type TUserData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: 'user' | 'admin' | 'agent';
  accountStatus: 'active' | 'inactive';
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type TWallet = {
  walletOwnerId: string;
  walletStatus: 'active' | 'frozen';
  balance: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
