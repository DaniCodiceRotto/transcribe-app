import React from 'react'

export default function FileDisplay(props) {
    const{handleAudioReset,file,audioStream,handleFormSubmission}=props
    return (
        <main className='flex-1  p-4 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 items-center pb-20 w-fit max-w-full mx-auto'>
             <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl text-peach-600'>Your <span className='text-blue-400'>File</span></h1>
           <div className='mx-auto flex flex-col text-left mb-4'>
            <h3 className='font-semibold '>Name</h3>
            <p>{file?file.name:'Custom Audio'}</p>
           </div>
           <div className='flex items-center justify-between gap-4'>
            <button  onClick={handleAudioReset} className='specialBtn px-4 py-2 rounded-lg  text-blue-400 specialBtn duration-200'>Reset</button>
            <button onClick={handleFormSubmission} className='specialBtn px-4 py-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium'> <p>Transcribe</p><i className="fa-solid fa-pencil"></i></button>
           </div>
            </main>
  )
}
