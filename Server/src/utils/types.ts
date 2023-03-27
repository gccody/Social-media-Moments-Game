export type User = {
  username: string | undefined,
  uid: string,
  email: string,
}

export type DBUser = User & {
  hashed: string,
  salt: string
}