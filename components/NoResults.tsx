import { NextPage } from 'next'
import React from 'react'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
  type: 'video' | 'comment'
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
  }
]

const NoResults: NextPage<IProps> = ({ type }) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      {items.filter(item => item.type === type).map(item => (
        <React.Fragment key={item.type}>
          <p className='text-8xl'>
            {item.icon}
          </p>
          <p className='text-2xl text-center'>
            {item.label}
          </p>
        </React.Fragment>
      ))}

    </div>
  )
}

export default NoResults