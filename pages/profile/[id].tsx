import axios from 'axios'
import Image from 'next/image'
import React from 'react'

import { GoVerified } from 'react-icons/go'
import { NoResults, VideoCard } from '../../components'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'

interface IProps {
  data: {
    user: IUser
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}

const Profile = ({
  data: { user, userVideos, userLikedVideos }
}: IProps) => {
  const [showUserVideos, setShowUserVideos] = React.useState(true)
  const [videosList, setVideosList] = React.useState<Video[]>([])

  React.useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            src={user.image}
            width={120}
            height={120}
            className='rounded-full'
            alt={'Profile image ' + user.userName}
            layout='responsive'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-gray-700 lowercase'>
            {user.userName.replaceAll(' ', '')}
            <GoVerified className='text-blue-400' />
          </p>
          <p className='capitalize md:text-xl text-gray-400 text-xs'>
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className='flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full'>
          <p onClick={() => setShowUserVideos(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}>Videos</p>

          <p onClick={() => setShowUserVideos(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}>Liked</p>
        </div>

        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videosList.length > 0 ? (
            videosList.map((post, idx) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults type='video' />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`)
  return {
    props: { data }
  }
}

export default Profile
