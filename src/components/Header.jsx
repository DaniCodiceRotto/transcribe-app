import React from 'react'

export default function Header() {
  return (
    <header className='flex p-4 items-center justify-between gap-4'>
    <a href='/'><h1 className="text-peach-600 bold font-medium" >
      Speak <span className="text-blue-400">Bridge</span>
    </h1></a>
  <a href='/' className='flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400'>
      <p>New</p>
      <i className="fa-solid fa-plus"></i>
    </a>

  </header>
  )
}
