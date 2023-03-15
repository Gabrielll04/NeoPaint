import React, { useCallback } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'
	
import 'reactflow/dist/style.css'

const initialNodes = [
  { id: 'Hello', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: 'Hi', position: { x: 0, y: 100 }, data: { label: '2' } },
]
const initialEdges = [{ id: 'e1-2', source: 'Hello', target: 'Hi' }]

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)//a callback when nodes change
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)// a callback when edges change

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges])// a callback when nodes are connected

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background gap={11} size={1} />
      </ReactFlow>
    </div>
  )
}