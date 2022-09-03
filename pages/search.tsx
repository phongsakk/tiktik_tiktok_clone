import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { GoVerified } from 'react-icons/go'

import { NoResults, VideoCard } from '../components'
import useAuthStore from '../store/authStore'
import { Video } from '../types'
import { BASE_URL } from '../utils'

interface IProps {
  videos: Video[]
}

const Search = ({ videos }: IProps) => {
  const [showAccounts, setShowAccounts] = React.useState(false)
  const { query: { q: searchTerm } }: any = useRouter()
  const { allUsers } = useAuthStore()

  const isAccounts = showAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !showAccounts ? 'border-b-2 border-black' : 'text-gray-400'

  const searchAccounts = allUsers.filter(user => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='w-full'>
      <div className='flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full'>
        <p onClick={() => setShowAccounts(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}>Videos</p>

        <p onClick={() => setShowAccounts(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts}`}>Accounts</p>
      </div>

      {showAccounts ? (
        <div className='md:mt-16'>
          {searchAccounts.length ? (
            searchAccounts.map((user, idx) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className='flex gap-3 cursor-pointer p-2 font-semibold rounded border-b-2 border-gray-200 w-100 bg:white hover:bg-[#F51997] hover:bg-opacity-20'>
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className='rounded-full'
                      alt={'Profile image ' + user.userName}
                    />
                  </div>

                  <div className='flex flex-col gap-2 justify-center'>
                    <p className='flex gap-1 items-center text-md font-bold text-gray-700 lowercase'>
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults type='user' />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6'>
          {videos.length
            ? videos.map((post, idx) => (
              <VideoCard post={post} key={idx} />
            )) : (
              <NoResults type='video' text={`No video results for "${searchTerm}"`} />
            )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { q },
}: {
  query: { q: string }
}): Promise<{ props: { videos: Video[] } }> => {
  const { data } = await axios.get(`${BASE_URL}/api/search?q=${q}`)

  return {
    props: { videos: data as Video[] }
  }
}

export default Search
