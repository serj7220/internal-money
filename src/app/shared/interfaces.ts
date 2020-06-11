export interface User {
  username?: string
  email: string
  password: string
}

export interface DbAuthResponse {
  id_token: string
}
