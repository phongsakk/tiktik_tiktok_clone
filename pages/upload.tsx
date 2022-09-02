import React from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'

import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { topics } from '../utils/constants';
import { PostPayload } from '../types'

const Upload = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [wrongFileType, setWrongFileType] = React.useState(false)
  const [videoAsset, setVideoAsset] = React.useState<SanityAssetDocument>()
  const [post, setPost] = React.useState({
    caption: '',
    category: topics[0].name,
    isSaving: false
  })

  const { userProfile } = useAuthStore()
  const router = useRouter()

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

    setIsLoading(true)
    setWrongFileType(false)

    if (fileTypes.includes(selectedFile.type)) {
      client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name
      })
        .then((data) => {
          setVideoAsset(data)
          setIsLoading(false)
          console.log(data)
        })
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }
  }

  const handlePost = async () => {
    if (post.caption && videoAsset?._id && post.category) {
      setPost(prev => ({ ...prev, isSaving: true }))
      const document: PostPayload = {
        _type: 'post',
        caption: post.caption,
        category: post.category,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset._id
          }
        },
        userId: userProfile?._id || 'undefined',
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id || 'undefined'
        },
        topic: post.category
      }

      await axios.post('http://localhost:3000/api/post', document)
      
      router.push('/')
    }
  }

  const handleDiscard = () => { }

  return (
    <div className='flex w-full h-hull absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] w-[76%] flex gap-6 flex-wrap justify-center lg:justify-around items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className='rounded-xl h-[450px] mt-16 bg-black'
                    >

                    </video>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold text-gray-600' >
                          Upload video
                        </p>
                      </div>
                      <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload_video'
                      className='w-0 h-0'
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                please select a video file
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label htmlFor='caption' className='text-md font-medium'>Caption</label>
          <input
            type='text'
            name='caption'
            value={post.caption}
            onChange={(e) => setPost(prev => ({ ...prev, caption: e.target.value }))}
            className='rounded outline-none text-md border-2 border-gray-200 lg:p-4 p-2'
          />
          <label htmlFor='category' className='text-md font-medium'>Choose a Category</label>
          <select
            name='category'
            value={post.category}
            onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
            className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
          >
            {topics.map((topic) => (
              <option
                value={topic.name}
                key={topic.name}
                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
              >
                {topic.name}
              </option>
            )
            )}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              onClick={handleDiscard}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload