import { Node } from 'reactflow'

import Square from '@/Components/Square'

export const NODE_TYPES = {
  square: Square,
}

export let ALL_NODES = [
  {
    id: '1',
    type: 'square',
    position: {
      x: 400,
      y: 200,
    },
    data: {
      label: 'HI!',
    },
  },
  {
    id: '2',
    type: 'square',
    position: {
      x: 600,
      y: 200,
    },
    data: {
      label: 'HELLOOOOOWOOWOOWOWOWOWO!',
    },
  },
]satisfies Node[]

export function addNode(setNodes: any) {
  const newNode: Node = {
    id: String(Math.floor(Math.random() * 1000)),
    type: 'square',
    position: {
      x: Math.floor(Math.random() * 1400),
      y: Math.floor(Math.random() * 900),
    },
    data: {
      label: 'New Node',
    },
  }
  // let newArray = [...ALL_NODES, newNode]
  // setNodes(newArray)
  setNodes((nds: Node[]) => nds.concat(newNode))
  return
}

export function updateNodeLabel(label: any, setNodeLabel: any) {
  setNodeLabel(label)
}

export function unSelectNodes(setSelectedNodes: any) {
  setSelectedNodes()
}