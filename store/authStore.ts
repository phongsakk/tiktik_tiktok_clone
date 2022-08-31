import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { IUser } from '../types'

const authStore = (set: any): AuthStore => ({
  userProfile: null,
  addUser: (user: IUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth'
  })
)

export interface AuthStore {
  userProfile: IUser | null
  addUser: (user: IUser) => void
  removeUser: () => void
}

export default useAuthStore