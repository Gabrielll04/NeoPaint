import { emitter } from './Square'
import { IndexEmitter } from '../pages/index'
import { useEffect, useState } from "react"
import { FaPenNib } from 'react-icons/fa'

import { addNode, updateNodeLabel } from '@/utils/NodeUtils'

export default function SideBar({ setNodes }: any) {
  const [selectedNode, setSelectedNode] = useState<any>({})

  const handleNodeClick = (componentData: any) => {
    console.log()
    setSelectedNode(componentData)
  }

  const handleUnselectNodes = () => {
    setSelectedNode(null)
  }

  useEffect(() => {
    emitter.on('selectedNode', handleNodeClick)
    IndexEmitter.on('unselectNodes', handleUnselectNodes)
    return () => {
      emitter.removeListener('selectedNode', handleNodeClick)
      IndexEmitter.removeListener('unselectNodes', handleUnselectNodes)
    }
  }, [])

  function changeNodeColor(bgColor: string) {
    selectedNode.backgroundColorFunction(bgColor)
  }

  return (
    <div className="flex justify-center absolute right-0 w-64 h-full bg-zinc-700 shadow-md shadow-black drop-shadow-2xl text-white">
      <div className='flex flex-col overflow-hidden p-1'>
        <span>Label</span>
        <input onChange={(e) => { updateNodeLabel(e.target.value, selectedNode.setNodeLabel) }} type='text' placeholder='Change label' name='nodeLabel' className='text-black' />
        <div className='flex justify-start flex-wrap gap-2 p-5'>
          <button onClick={() => changeNodeColor('#4ade80')} className='w-8 h-7 bg-green-400 rounded shadow active:bg-green-500'></button>
          <button onClick={() => changeNodeColor('#38bdf8')} className='w-8 h-7 bg-sky-400 rounded shadow active:bg-sky-500'></button>
          <button onClick={() => changeNodeColor('#818cf8')} className='w-8 h-7 bg-indigo-400 rounded shadow active:bg-indigo-500'></button>
          <button onClick={() => changeNodeColor('#fb7185')} className='w-8 h-7 bg-rose-400 rounded shadow active:bg-rose-500'></button>
          <button onClick={() => changeNodeColor('#60a5fa')} className='w-8 h-7 bg-blue-400 rounded shadow active:bg-blue-500'></button>
          <button onClick={() => changeNodeColor('#facc15')} className='w-8 h-7 bg-yellow-400 rounded shadow active:bg-yellow-500'></button>
          <button onClick={() => changeNodeColor('#525252')} className='w-8 h-7 bg-neutral-600 rounded shadow active:bg-neutral-700'></button>
          <button onClick={() => changeNodeColor('#34d399')} className='w-8 h-7 bg-emerald-400 rounded shadow active:bg-emerald-500'></button>
          <button onClick={() => changeNodeColor('#a3e635')} className='w-8 h-7 bg-lime-400 rounded shadow active:bg-lime-500'></button>
          <button className='flex items-center justify-center ml-2'>
            <input onChange={(e) => changeNodeColor(e.target.value)} type='color' name='inputCustomColor' className='appearance-none border-none absolute w-9 h-10 cursor-pointer active:opacity-60 rounded' />
            <FaPenNib className='z-10' />
          </button>
        </div>
        <button onClick={() => addNode(setNodes)} className='w-full h-11 font-bold bg-indigo-400 ring-1 ring-indigo-500 rounded-full hover:bg-indigo-500'>new node</button>
        <span>Selected node id: {selectedNode?.id}</span>
      </div>
    </div>
  )
}