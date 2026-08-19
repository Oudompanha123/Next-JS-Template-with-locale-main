export type Role = "user" | "manager" | "admin";

export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    userInfo: {
        userId: string;
        usernam: string;
        email: string;
        fullName: string;
        role: Role;
    }
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export type RegisterResponse = {
    user_id: number;
    username: string;
    email: string;
    full_name: string;
    phone: string;
    status: string;
    email_verified: boolean;
  }
