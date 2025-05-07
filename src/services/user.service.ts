import { User } from '../models/user.model'
import { mockUsers } from '../utils/mockUsers'

export const getAllUsers = (): User[] => {
  // could do some database calls here
  return mockUsers
}
