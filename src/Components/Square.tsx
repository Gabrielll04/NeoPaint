import EventEmitter from 'events'
import { useState, useEffect } from 'react'
import { NodeProps, Handle, Position } from 'reactflow'
import { NodeResizer } from '@reactflow/node-resizer'
import '@reactflow/node-resizer/dist/style.css'

import { SquareType } from '@/Models/Node'
import { IndexEmitter } from '@/pages'
import { SideBarEmitter } from './SideBar'

export const emitter: EventEmitter = new EventEmitter()

export default function Square(props: NodeProps): JSX.Element {
  const [backgroundColor, setBackgroundColor] = useState<string>('#a78bfa')
  const [nodeLabel, setNodeLabel] = useState<string | null>(props.data.label)
  const [selectedNode, setSelectedNode] = useState<boolean>(false)
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(false)

  const componentData = {
    id: props.id,
    label: nodeLabel,
    backgroundColorFunction: setBackgroundColor,
    setNodeLabel: setNodeLabel,
  } satisfies SquareType

  function handleClick(): void {
    setSelectedNode(!selectedNode)
    emitter.emit('selectedNode', componentData)
  }

  function unselectNodes(): void {
    setSelectedNode(false)
  }

  function setKeepDimensions(keepAspectRatio: boolean) {
    setKeepAspectRatio(keepAspectRatio)
  }

  useEffect(() => {
    IndexEmitter.on('unselectNodes', unselectNodes)
    SideBarEmitter.on('keepAspectRatio', setKeepDimensions)

    return () => {
      SideBarEmitter.removeListener('keepAspectRatio', setKeepDimensions)
      IndexEmitter.removeListener('unselectNodes', unselectNodes)
    }
  }, [])

  return (
    <>
      <button onClick={handleClick} style={{ backgroundColor: `${backgroundColor}` }} className={`flex justify-center items-center rounded-sm min-w-[30px] w-full h-full transition-all hover:shadow-lg hover:ring-1 hover:ring-sky-500 overflow-hidden`}>
        {selectedNode ? (
          <>
            <NodeResizer keepAspectRatio={keepAspectRatio} minWidth={30} minHeight={30} />
            <span className='font-bold text-white text-lg'>{nodeLabel}</span>
            {/* <Handle
              id='right'
              type='source'
              position={Position.Right}
              className='!bg-teal-500 -right-4'
            />
            <Handle
              id='left'
              type='target'
              position={Position.Left}
              className="!bg-teal-500"
            /> */}
          </>
        ) : (<><span className='font-bold text-white text-lg'>{nodeLabel}</span></>)}
      </button>
    </>
  )
}