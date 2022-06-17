import { PlusIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import TagData from '../tag/tag_data';
import WorkData from '../work/work_data';


interface WorkPreviewPopoutProps {
    idToTag: (id: string) => TagData | undefined
    work: WorkData
    onClickPrev: (currentWorkId: string) => void
    onClickNext: (currentWorkId: string) => void
    onClose: () => void
}

export default function WorkPreviewPopout(props: WorkPreviewPopoutProps) {

    return (
        <div className='relative popout workpreview-popout popout-bg-col p-1 h-screen w-screen backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-70'>
            <div className='absolute top-1 left-1 bg-gray-300 hover:bg-gray-400 rounded-sm shadow h-6 w-6 p-0.5' onClick={() => props.onClose()}>
                <XIcon className="w-full h-full text-gray-800" />
            </div>
            <div className='flex h-full items-center gap-1'>
                <div className='flex-none bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-8 h-8' onClick={() => props.onClickPrev(props.work.id)}>
                    <ArrowCircleLeftIcon className=" text-gray-800" />
                </div>
                <div className='flex-grow h-full' onClick={() => props.onClose()}>
                    <img className='object-contain h-full mx-auto' src={props.work.image} alt="t" />
                </div>
                <div className='flex-none bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-8 h-8' onClick={() => props.onClickNext(props.work.id)}>
                    <ArrowCircleRightIcon className=" text-gray-800" />
                </div>
            </div>
            <div className=''>
                <div className='flex-none bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-8 h-8' onClick={() => props.onClickPrev(props.work.id)}>
                    <ArrowCircleLeftIcon className=" text-gray-800" />
                </div>
                <div className='flex-none bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-8 h-8' onClick={() => props.onClickNext(props.work.id)}>
                    <ArrowCircleRightIcon className=" text-gray-800" />
                </div>
                <div className='flex-none bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 w-8 h-8' onClick={() => props.onClickPrev(props.work.id)}>
                    <ArrowCircleLeftIcon className=" text-gray-800" />
                </div>

            </div>
        </div>
    )
}
