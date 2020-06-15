export interface User {
  id?: number
  username?: string
  email: string
  password: string
  balance?: number
}

export interface DbAuthResponse {
  id_token: string
}
