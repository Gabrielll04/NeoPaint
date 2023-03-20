import React, { useCallback } from 'react'
import ReactFlow, {
  Controls,
  Background,
  useEdgesState,
  useNodesState,
  ConnectionMode,
  Connection,
  addEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import EventEmitter from 'events'

import SideBar from '../Components/SideBar'
import { ALL_NODES, NODE_TYPES } from '@/utils/NodeUtils'
export const IndexEmitter = new EventEmitter()

export default function App(): JSX.Element {
  const [nodes, setNodes, onNodesChange] = useNodesState(ALL_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  function onPaneClick(): void {
    IndexEmitter.emit('unselectNodes')
  }
  
  const onConnect = useCallback((connection: Connection): void => {
    setEdges((edges) => addEdge(connection, edges))
  }, [])

  return (
    <div className="flex w-screen h-screen relative">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
      >
        <Controls />
        <Background className="bg-zinc-700" color="#303030" gap={11} size={1}   />
      </ReactFlow>
      <SideBar setNodes={setNodes} />
    </div >
  )
}