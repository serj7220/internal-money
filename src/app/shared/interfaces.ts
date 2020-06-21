export interface User {
  id?: number
  username?: string
  email?: string
  password?: string
  balance?: number
}

export interface UserResponse {
  user_info_token: {
    id: number
    name: string
    email: string
    balance: number
  }
}

export interface DbAuthResponse {
  id_token: string
}

export interface Transaction {
  id: number
  date: Date
  username: string
  amount: number
  balance: number
}

