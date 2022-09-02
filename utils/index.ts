import axios from "axios"
import jwtDecode from "jwt-decode"
import { GoogleCredential, IUser } from "../types"

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createOrGetUser = async (response: any, addUser: (user: IUser) => any) => {
  const decoded: GoogleCredential = jwtDecode(response.credential)

  const { name, picture, sub } = decoded

  const user: IUser = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }

  addUser(user)

  await axios.post(`${BASE_URL}/api/auth`, user)
}