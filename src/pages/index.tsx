import React, { useCallback } from 'react'
import ReactFlow, {
<<<<<<< HEAD
  Controls,
  Background,
  useEdgesState,
  useNodesState,
  ConnectionMode,
  Connection,
  addEdge,
  Node,
  ReactFlowProvider
} from 'reactflow'
import 'reactflow/dist/style.css'

import SideBar from '../Components/SideBar'
import { ALL_NODES, NODE_TYPES } from '@/utils/NodeUtils'

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(ALL_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback((connection: Connection) => {
    setEdges((edges) => addEdge(connection, edges))
  }, [])

  return (
    <div className="flex w-screen h-screen relative">
      <ReactFlowProvider>
      <ReactFlow
        nodeTypes={NODE_TYPES}
=======
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
>>>>>>> e220d7e7dbfcecf82793dfaed007b1bae8071a23
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
<<<<<<< HEAD
        connectionMode={ConnectionMode.Loose}
=======
>>>>>>> e220d7e7dbfcecf82793dfaed007b1bae8071a23
        onConnect={onConnect}
      >
        <Controls />
        <Background gap={11} size={1} />
      </ReactFlow>
<<<<<<< HEAD
      </ReactFlowProvider>
      <SideBar nodes={nodes} setNodes={setNodes} />
=======
>>>>>>> e220d7e7dbfcecf82793dfaed007b1bae8071a23
    </div>
  )
}