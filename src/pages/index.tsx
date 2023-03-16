import React, { useCallback } from 'react'
import ReactFlow, {
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
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        onConnect={onConnect}
      >
        <Controls />
        <Background gap={11} size={1} />
      </ReactFlow>
      </ReactFlowProvider>
      <SideBar nodes={nodes} setNodes={setNodes} />
    </div>
  )
}