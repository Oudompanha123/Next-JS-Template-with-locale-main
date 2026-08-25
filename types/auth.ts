export interface AuthRequest {
  user_id: string;
  password: string;
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
