export interface SquareType {
  id: string,
  label: string | null,
  backgroundColorFunction: Function,
  setNodeLabel: Function
}

export interface SideBarProps {
  setNodes: Function
}