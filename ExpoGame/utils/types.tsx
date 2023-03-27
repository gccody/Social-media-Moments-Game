export interface UID {
  uid: string
}

export type User = {
  username: string | undefined,
  uid: string,
  email: string,
}