import { PlusIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon, XCircleIcon, XIcon, RefreshIcon, SwitchHorizontalIcon, SparklesIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { ProgressPlugin } from 'webpack';
import TagData from '../tag/tag_data';
import WorkData from '../work/work_data';


interface WorkPreviewPopoutProps {
    idToTag: (id: string) => TagData | undefined
    works: WorkData[]
    startIndex: number
    onClose: () => void
}

export default function WorkPreviewPopout(props: WorkPreviewPopoutProps) {

    const [currentIndex, setCurrentIndex] = useState(props.startIndex)
    const [inputIndex, setInputIndex] = useState((props.startIndex + 1).toString())

    const [horizontalFlip, setHorizontalFlip] = useState(false)
    const [grayScale, setGrayScale] = useState(false)

    let imgStyle: React.CSSProperties = {}
    if (horizontalFlip) imgStyle.transform = "scale(-1, 1)"

    useEffect(() => {
        setInputIndex((currentIndex + 1).toString())
    }, [currentIndex])

    return (
        <div className='relative popout workpreview-popout popout-bg-col p-1 h-screen w-screen backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-70'>
            <div className='absolute top-2 left-2 bg-gray-300 hover:bg-gray-400 rounded-sm shadow h-7 w-7 p-0.5' onClick={() => props.onClose()}>
                <XIcon className="w-full h-full text-gray-800" />
            </div>
            <div className='flex h-full  gap-1'>
                <div className='flex-grow h-full flex flex-col gap-1 items-center'>
                    <div className='h-screen-90 w-full'>
                        <img style={imgStyle} className='object-contain h-full mx-auto ' src={props.works[currentIndex].image} onClick={() => props.onClose()} alt="t" />
                    </div>

                    <div className=' flex place-content-center gap-2 rounded-sm h-10 bg-gray-900 p-1.5 w-min'>
                        <div className='flex px-1 gap-1 '>
                            <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-6 h-6'
                                onClick={() => {
                                    setCurrentIndex((currentIndex - 1 + props.works.length) % props.works.length)
                                }}>
                                <ArrowCircleLeftIcon className=" text-gray-800" />
                            </div>
                            <div className='bg-gray-300 rounded-sm p-0.5 h-6 flex gap-0.5'>
                                <input
                                    type="text"
                                    className='w-min bg-gray-700 rounded-sm p-0.5 text-white'
                                    value={inputIndex}
                                    onChange={(e) => setInputIndex(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key == 'Enter') setCurrentIndex(parseInt(inputIndex) - 1)
                                    }}
                                />
                                <p>/{props.works.length}</p>
                            </div>
                            <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-6 h-6'
                                onClick={() => {
                                    setCurrentIndex((currentIndex + 1) % props.works.length)
                                }}>
                                <ArrowCircleRightIcon className=" text-gray-800" />
                            </div>
                            <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-6 h-6'
                                onClick={() => {
                                    setCurrentIndex(Math.floor(Math.random() * (props.works.length - 1)))
                                }}>
                                <SparklesIcon className=" text-gray-800" />
                            </div>
                        </div>

                        <div className='flex px-1 gap-1'>
                            <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-6 h-6'
                                onClick={() => setHorizontalFlip(!horizontalFlip)}>
                                <SwitchHorizontalIcon className=" text-gray-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
