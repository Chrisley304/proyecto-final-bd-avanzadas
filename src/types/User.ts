export type Auth = {
    user: User | null;
    isLogged: boolean;
};

export type User = {
    id: number;
    bankInfo: BankInfo;
    email: string;
    lastName: string;
    name: string;
    password: string;
    profiles: Profile[] | [];
};

export type Profile = {
    id: number;
    userId: string;
    profileImage: string;
    profileNickname: string;
};

export type BankInfo = {
    id: number;
    expirationDate: string;
    cardFullName: string;
    cardNumber: string;
    cvv: string;
};
