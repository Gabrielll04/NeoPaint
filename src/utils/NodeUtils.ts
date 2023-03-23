import { Node, Edge } from 'reactflow'

import Square from '@/Components/Nodes/Square'
import Circle from '@/Components/Nodes/Circle'

export const NODE_TYPES = {
  square: Square,
  circle: Circle
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
]satisfies Node[]

export let ALL_EDGES = [
]

export function addNode(setNodes: Function, typeNode: string): void {
  const newNode: Node = {
    id: String(Math.floor(Math.random() * 1000)),
    type: typeNode,
    position: {
      x: Math.floor(Math.random() * 1200),
      y: Math.floor(Math.random() * 900),
    },
    data: {
      label: 'new node',
    },
  }
  // let newArray = [...ALL_NODES, newNode]
  // setNodes(newArray)
  setNodes((nds: Node[]) => nds.concat(newNode))
  return
}
// export function updateNodeLabel(label: string, selectedNodes: any) {
//   selectedNodes.map((node: any) => node.setNodeLabel(label))
// }