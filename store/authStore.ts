import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

import { IUser } from '../types'
import { BASE_URL } from '../utils'

const authStore = (set: any): AuthStore => ({
  userProfile: undefined,
  allUsers: [],
  addUser: (user: IUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`)
    set({ allUsers: response.data })
  }
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth'
  })
)

export interface AuthStore {
  userProfile?: IUser
  allUsers: IUser[]
  addUser: (user: IUser) => void
  removeUser: () => void
  fetchAllUsers: () => unknown
}

export default useAuthStore