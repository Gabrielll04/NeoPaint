import { emitter } from './Square'
import { useEffect, useState } from "react"

import {  addNode, updateNodeLabel } from '@/utils/NodeUtils'

export default function SideBar({nodes, setNodes}: any) {
  const [selectedNode, setSelectedNode] = useState<any>({})

  const handleNodeClick = (componentData: any) => {
    setSelectedNode(componentData)
  }

  useEffect(() => {
    emitter.on('selectedNode', handleNodeClick)

    return () => {
      emitter.removeListener('selectedNode', handleNodeClick)
    }
  }, [])

  function changeNodeColor(bgColor: string) {
    selectedNode.backgroundColorFunction(bgColor)
  }

  return (
    <div className="flex justify-center absolute right-0 w-64 h-full bg-zinc-700 shadow-md shadow-black drop-shadow-2xl text-white">
      {selectedNode && (
        <div className='flex flex-col overflow-hidden p-1'>
          <input onChange={(e) => { updateNodeLabel(e.target.value, selectedNode.setNodeLabel) }} type='text' placeholder='Change label' name='nodeLabel' className='text-black' />
          <div className='flex space-x-3 p-5'>
            <button onClick={() => changeNodeColor('#4ade80')} className='w-20 h-10 bg-green-400 rounded shadow active:bg-green-500'></button>
            <button onClick={() => changeNodeColor('#38bdf8')} className='w-20 h-10 bg-sky-400 rounded shadow active:bg-sky-500'></button>
            <input onChange={(e) => changeNodeColor(e.target.value)} type='color' name='inputCustomColor' className='w-20 h-10 cursor-pointer active:opacity-60'/>
          </div>
          <button onClick={() => addNode(setNodes)} className='w-full h-11 font-bold bg-indigo-400 ring-1 ring-indigo-500 rounded-full hover:bg-indigo-500'>new node</button>
          <span>Selected node id: {selectedNode.id}</span>
        </div>
      )}
    </div>
  )
}