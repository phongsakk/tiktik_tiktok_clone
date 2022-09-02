import React from 'react'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

import { Discover, Footer, SuggestedAccounts } from '.'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = React.useState(true)

  const normalLink = 'flex item-center gap-3 hover:bg-primary p-3 justify-content xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded'

  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar(prev => !prev)}
      >
        {showSidebar ? (
          <ImCancelCircle />
        ) : (
          <AiOutlineMenu />
        )}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>For You</span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar