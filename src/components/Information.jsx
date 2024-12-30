import React, { useState,useEffect,useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
    const{output}=props
    console.log(output)
    const [tab, setTab] = useState('transcription')
    const [translation,setTranslation]=useState(null)
    const [translating,setTranslating]=useState(null)
    const[toLanguage,setToLanguage]=useState('Select language')
 
    const worker=useRef()


    useEffect(()=>{
        if(!worker.current){
            worker.current=new Worker(new URL('../utils/translate.worker.js',import.meta.url),{
             type:'module'
            }) 
           }
           const onMessageReceived=async (e)=>{
            switch(e.data.status){
              case'initiate':
             
              console.log('DOWNLOADING')
              break;
              case'progress':
              
              console.log('LOADING')
              break;
              case'update':
             
              setTranslation(e.data.results)
              console.log(e.data.results)
              break;
              case'complete':
              setTranslating(false)
              console.log('DONE')
              
              break;
            }
          }
      
          worker.current.addEventListener('message',
            onMessageReceived)
      
            return ()=>worker.current.removeEventListener('message',onMessageReceived)

    })

    function handleCopy(){
        navigator.clipboard.writeText()
    }
    function handleDownload(){
        const element= document.createElement('a')
        const file=new Blob([],{type:'text/plain'})
        element.href=URL.createObjectURL(file)
        element.download(`SpeakBridge_${(new Date()).toDateString()}.txt`)
        document.body.sppendChild(element)
        element.click()
    }
    function   generateTranslation(){
        if(translating ||toLanguage==='Select language'){
            return
        }
        setTranslating(true)
        worker.current.postMessage({
            text:output.map(val=>val.text),
            src_language:'eng_Latn',
            tgt_language:toLanguage
        })


    }
    const textElement=tab==='transcription'?output.map(val=>val.text):''

    return (
        <main className='flex-1  p-4 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 items-center pb-20 w-fit  max-w-prose w-full mx-auto '>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl text-peach-600 whitespace-nowrap'>Your <span className='text-blue-400'>Transcription</span></h1>
            <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center '>
                <button onClick={() => setTab('transcription')} className={'px-3 duration-200 py-1 font-medium ' + (tab === 'transcription' ? 'bg-peach-300 text-blue-400' : 'text-peach-600 hover:text-blue-600')}> Transcription </button>
                <button onClick={() => setTab('translation')} className={'px-3 duration-200 py-1 font-medium ' + (tab === 'translation' ? 'bg-blue-300 text-peach-600' : 'text-blue-400 hover:text-blue-600')}>Translation </button>
            </div>
            {tab === 'transcription' ? (
                <Transcription {...props} textElement={textElement}/>
            )
                : <Translation {...props} toLanguage={toLanguage} translating={translating} textElement={textElement} setTranslation={setTranslation} setTranslating={setTranslating} setToLanguage={setToLanguage} generateTranslation={generateTranslation}/>
            }
            <div className='flex items-center gap-4 mx-auto '>
                <button title="Copy" className='specialBtn text-blue-400 px-4 py-2 rounded-large  hover:text-blue-700 duration-200'><i className="fa-solid fa-copy"></i></button>
                <button title='Download' className='specialBtn text-blue-400 px-4 py-2 rounded-large hover:text-blue-600 duration-200'><i className="fa-solid fa-download"></i></button>
            </div>
        </main>
    )
}
