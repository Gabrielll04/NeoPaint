import EventEmitter from 'events'
import { useState } from 'react'
import { NodeProps, Handle, Position } from 'reactflow'
import { NodeResizer } from '@reactflow/node-resizer'
import '@reactflow/node-resizer/dist/style.css'

export const emitter = new EventEmitter()

export default function Square(props: NodeProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>('#a78bfa')
  const [nodeLabel, setNodeLabel] = useState<string | null>(props?.data?.label)

  const componentData = {
    id: props.id,
    label: nodeLabel,
    backgroundColorFunction: setBackgroundColor,
    setNodeLabel: setNodeLabel,
  }

  function handleClick() {
    emitter.emit('selectedNode', componentData)
  }

  return (
    <button onClick={handleClick} style={{backgroundColor: `${backgroundColor}`}} className={`flex justify-center items-center rounded-sm min-w-[130px] w-full h-full transition-all hover:shadow-lg hover:ring-1 hover:ring-sky-500 overflow-hidden`}>
      <NodeResizer minWidth={130} minHeight={30} />
      <span className='font-bold text-white text-lg'>{nodeLabel}</span>
      <Handle
        id='right'
        type='source'
        position={Position.Right}
        className='!bg-teal-500 -right-4'
      />
      <Handle
        id='left'
        type='target'
        position={Position.Left}
        className="!bg-teal-500 -left-4"
      />
    </button>
  )
}