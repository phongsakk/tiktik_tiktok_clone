import axios from 'axios'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import { MdOutlineCancel } from 'react-icons/md'

import useAuthStore from '../../store/authStore'
import { Video } from '../../types'
import { BASE_URL } from '../../utils'
import { Comments, LikeButton } from '../../components'

const Detail: NextPage<IProps> = ({ postDetails }) => {
  const [post, setPost] = React.useState(postDetails)
  const [playing, setPlaying] = React.useState(false)
  const [isVideoMuted, setIsVideoMuted] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const { userProfile } = useAuthStore()

  React.useEffect(() => {
    if (post && videoRef.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted, post])

  const handleLike = async (like: boolean) => {
    if (post && userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost(prev => ({ ...prev, likes: data.likes }))
    }
  }

  if (!post) return null

  const onVideoClicked = () => {
    if (playing) {
      videoRef.current?.pause()
      setPlaying(false)
    } else {
      videoRef.current?.play()
      setPlaying(true)
    }
  }

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>

        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              loop
              onClick={onVideoClicked}
              src={post.video.asset.url}
              className='h-full cursor-pointer'
            ></video>
          </div>

          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!playing && (
              <button onClick={onVideoClicked}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-3 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
              <Link href='/' >
                <>
                  <Image
                    width={62}
                    height={62}
                    className='rounded-full'
                    src={post.postedBy.image}
                    alt={'Profile: ' + post.postedBy.userName}
                    layout='responsive'
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href='/'>
                <div className='mt-3 flex flex-col gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName} {` `}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className='px-10 text-lg text-gray-600'>{post.caption}</p>

          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>

          <Comments

          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id }
}: {
  params: IPayload
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)
  return {
    props: {
      postDetails: data
    }
  }
}

interface IPayload {
  id: string
}

interface IProps {
  postDetails: Video
}

export default Detail