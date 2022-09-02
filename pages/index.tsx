import axios from 'axios'
import type { NextPage } from 'next'
import { NoResults, VideoCard } from '../components'
import { Video } from '../types'
import { BASE_URL } from '../utils'

interface IProps {
  videos: Video[]
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length? videos.map((video)=>(
        <VideoCard post={video} key={video._id} />
      )): (
        <NoResults type='video' />
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get(`${BASE_URL}/api/post`)

  return {
    props: { videos: response.data }
  }
}

export default Home
