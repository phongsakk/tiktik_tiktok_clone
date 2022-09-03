import { NextPage } from 'next'
import React from 'react'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
  type: 'video' | 'comment' | 'user'
  text?: string
}

const items = [
  {
    type: 'video',
    icon: <MdOutlineVideocamOff />,
    label: 'No video here.'
  },
  {
    type: 'comment',
    icon: <BiCommentX />,
    label: 'No comments yet! Be the first one to add a comment.'
  },
  {
    type: 'user',
    icon: <BiCommentX />,
    label: 'No users.'
  }
]

const NoResults: NextPage<IProps> = ({ type, text }) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      {items.filter(item => item.type === type).map(item => (
        <React.Fragment key={item.type}>
          <p className='text-8xl'>
            {item.icon}
          </p>
          <p className='text-2xl text-center'>
            {text || item.label}
          </p>
        </React.Fragment>
      ))}

    </div>
  )
}

export default NoResults