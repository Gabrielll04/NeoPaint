import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Controls,
  Background,
  useEdgesState,
  useNodesState,
  ConnectionMode,
  Connection,
  addEdge,
  ReactFlowProvider
} from 'reactflow'
import 'reactflow/dist/style.css'
import EventEmitter from 'events'

import SideBar from '../Components/SideBar'
import { ALL_NODES, NODE_TYPES, ALL_EDGES } from '@/utils/NodeUtils'
export const IndexEmitter = new EventEmitter()

export default function App(): JSX.Element {
  const [rfInstance, setRfInstance] = useState<any>(null)

  // useEffect(() => {
  //   const Instance = localStorage.getItem(flowKey)
  //   if (Instance) {
  //     const parsedInstance = JSON.parse(Instance)
  //     parsedInstance.nodes.map((node: any) => {
  //       nodes.dragging?d 
  //       3
        
  //       = true
  //     })
  //     setNodes(parsedInstance.nodes)
  //     setEdges(parsedInstance.edges)
  //   }
  // })

  const [nodes, setNodes, onNodesChange] = useNodesState(ALL_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState(ALL_EDGES)

  const flowKey = 'example-flow'

  function onPaneClick(): void {
    IndexEmitter.emit('unselectNodes')
  }

  const onConnect = useCallback((connection: Connection): void => {
    setEdges((edges) => addEdge(connection, edges))
  }, [])

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  return (
    <div className="flex w-screen h-screen relative">
      <button onClick={onSave}>salvar projeto</button>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onInit={setRfInstance}
      >
        <Controls />
        <Background className="bg-zinc-700" color="#303030" gap={11} size={1} />
      </ReactFlow>
      <SideBar setNodes={setNodes} />
    </div >
  )
}