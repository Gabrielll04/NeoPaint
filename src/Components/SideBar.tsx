import EventEmitter from 'events'
import { emitter } from './Nodes/Square'
import { IndexEmitter } from '../pages/index'
import { useEffect, useState, Fragment } from 'react'
import { FaPenNib } from 'react-icons/fa'
import { BsTriangleFill } from 'react-icons/bs'
import { Menu, Transition } from '@headlessui/react'

import { addNode } from '@/utils/NodeUtils'
import { SideBarProps, SquareType } from '@/Models/Node'

export const SideBarEmitter = new EventEmitter()

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function MyDropdown(setNodes: Function) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-zinc-600 hover:bg-zinc-600'>
          <span>New Node</span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-10 w-56 origin-top my-1 mx-3 rounded-md bg-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => addNode(setNodes, 'circle')}
                  className={classNames(
                    active ? ' bg-zinc-600' : 'text-white',
                    'flex flex-col w-full items-center py-3 text-md space-x-1'
                  )}
                >
                  <div className='flex flex-col w-full h-20 items-center py-1 space-y-2'>
                    <div className='bg-zinc-500 w-10 h-12 rounded-full'></div>
                    <span>Circle</span>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => addNode(setNodes, 'square')}
                  className={classNames(
                    active ? ' bg-zinc-600' : 'text-white',
                    'flex flex-col w-full items-center py-3 text-md space-x-1'
                  )}
                >
                  <div className='flex flex-col w-full h-20 items-center py-1 space-y-2'>
                    <div className='bg-zinc-500 w-10 h-12 rounded-md'></div>
                    <span>Square</span>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? ' bg-zinc-600' : 'text-white',
                    'flex flex-col w-full items-center py-3 text-md space-x-1'
                  )}
                >
                  <div className='flex flex-col w-full h-20 items-center py-1 space-y-2'>
                    <BsTriangleFill className='w-14 h-14 text-zinc-500' />
                    <span>Triangle</span>
                  </div>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default function SideBar({ setNodes }: SideBarProps): JSX.Element {
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true)
  const [selectedNodes, setSelectedNodes] = useState<SquareType[]>([])

  function handleNodeClick(componentData: SquareType): void {
    setSelectedNodes((prevSelectedNodes): SquareType[] => {
      const nodeExists: boolean = prevSelectedNodes.some((node) => node.id === componentData.id)

      if (!nodeExists) {
        return [...prevSelectedNodes, componentData]
      } else {
        return prevSelectedNodes.filter((node) => node.id !== componentData.id)
      }
    })
  }

  function handleKeepDimensions() {
    setKeepAspectRatio(!keepAspectRatio)

    SideBarEmitter.emit('keepAspectRatio', keepAspectRatio)
  }

  function handleUnselectNodes(): void {
    setSelectedNodes([])
  }

  useEffect(() => {
    emitter.on('selectedNode', handleNodeClick)
    IndexEmitter.on('unselectNodes', handleUnselectNodes)
    return () => {
      emitter.removeListener('selectedNode', handleNodeClick)
      IndexEmitter.removeListener('unselectNodes', handleUnselectNodes)
    }
  }, [])

  function changeNodeColor(bgColor: string): void {
    selectedNodes.map((node) => {
      node.backgroundColorFunction(bgColor)
    })
  }

  function updateNodeLabel(label: string): void {
    selectedNodes.map((node) => {
      node.setNodeLabel(label)
    })
  }

  return (
    <div className='flex justify-center absolute right-0 w-64 h-full bg-zinc-800 shadow-md shadow-black drop-shadow-2xl text-white'>
      <div className='flex flex-col overflow-hidden p-1 space-y-2'>
        <span>Label</span>
        <input onChange={(e) => { updateNodeLabel(e.target.value) }} type='text' placeholder='Change label' name='nodeLabel' className='text-black' />
        <div className='flex justify-start flex-wrap gap-2 p-5'>
          <button onClick={() => changeNodeColor('#4ade80')} className='w-8 h-7 bg-green-400 rounded shadow active:bg-green-500'></button>
          <button onClick={() => changeNodeColor('#38bdf8')} className='w-8 h-7 bg-sky-400 rounded shadow active:bg-sky-500'></button>
          <button onClick={() => changeNodeColor('#818cf8')} className='w-8 h-7 bg-indigo-400 rounded shadow active:bg-indigo-500'></button>
          <button onClick={() => changeNodeColor('#fb7185')} className='w-8 h-7 bg-rose-400 rounded shadow active:bg-rose-500'></button>
          <button onClick={() => changeNodeColor('#60a5fa')} className='w-8 h-7 bg-blue-400 rounded shadow active:bg-blue-500'></button>
          <button onClick={() => changeNodeColor('#facc15')} className='w-8 h-7 bg-yellow-400 rounded shadow active:bg-yellow-500'></button>
          <button onClick={() => changeNodeColor('#525252')} className='w-8 h-7 bg-neutral-600 rounded shadow active:bg-neutral-700'></button>
          <button onClick={() => changeNodeColor('#34d399')} className='w-8 h-7 bg-emerald-400 rounded shadow active:bg-emerald-500'></button>
          <button onClick={() => changeNodeColor('#a3e635')} className='w-8 h-7 bg-lime-400 rounded shadow active:bg-lime-500'></button>
          <button className='flex items-center justify-center ml-2'>
            <input onChange={(e): void => changeNodeColor(e.target.value)} type='color' name='inputCustomColor' className='appearance-none border-none absolute w-9 h-10 cursor-pointer active:opacity-60 rounded' />
            <FaPenNib className='z-10' />
          </button>
        </div>
        {MyDropdown(setNodes)}
        {/* <button onClick={() => MyDropdown()} className='w-full h-11 font-bold bg-indigo-400 ring-1 ring-indigo-500 rounded-full hover:bg-indigo-500'>new node</button> */}
        <div className='flex flex-col items-center'>
          <input onClick={handleKeepDimensions} type='checkbox' className='w-7 h-7 rounded-lg cursor-pointer'
          />
          <span className='text-sm text-zinc-500'>Keep dimensions</span>
        </div>
        <span>Selected node id: {selectedNodes.map((node: SquareType): JSX.Element => (<span key={node.id}>{node.id} </span>))}</span>
      </div>
    </div>
  )
}