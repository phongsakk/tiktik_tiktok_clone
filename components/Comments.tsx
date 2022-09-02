import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'

interface IProps {
  comment: string
  comments: IComment[]
  isPostingComment: boolean
  setComment: React.Dispatch<React.SetStateAction<string>>
  addComment: (e: React.FormEvent) => void
}

interface IComment {
  comment: string
  _key: string
  postedBy: {
    _ref: string
    _id: string
  }
}

const Comments = ({
  comment, comments, isPostingComment, setComment, addComment
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore()
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[320px] xl:h-[420px]'>
        {comments?.length
          ? comments.map((item, idx) => (
            <>
              {allUsers.map(user => (
                user._id === (item.postedBy._id || item.postedBy._ref) && (
                  <div className='p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`} >
                      <div className='flex items-start gap-3'>
                        <div className='w-8 h-8'>
                          <Image
                            src={user.image}
                            width={34}
                            height={34}
                            className='rounded-full'
                            alt={'Profile image ' + user.userName}
                            layout='responsive'
                          />
                        </div>

                        <div className='hidden xl:block'>
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

                    <div>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
          : (
            <NoResults type='comment' />
          )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form
            onSubmit={addComment}
            className='flex gap-4'
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Add comment....'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button className='text-md text-gray-400' onClick={addComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
