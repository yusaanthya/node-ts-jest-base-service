import { User } from '../models/user.model'

export const getAllUsers = (): User[] => {
  return [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]
}
