import './App.css'

import React, { useState } from 'react'
import GraphCreator from './GraphCreator.react'

import type { GraphNode, Link } from './types'

import VisualGraph from './VisualGraph.react'

export default function App() {
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [links, setLinks] = useState<Link[]>([])

  const createGraph = (source: string, target: string, value: number) => {
    const nodeSet = new Set(nodes.map((node) => node.id))
    if (!nodeSet.has(source)) {
      setNodes((prevState) => [...prevState, { id: source }])
    }

    if (!nodeSet.has(target)) {
      setNodes((prevState) => [...prevState, { id: target }])
    }

    // TODO: Ensure graph is directed.
    setLinks((prevState) => [...prevState, { source, target, value }])
  }

  console.log('debug', nodes, links)

  return (
    <div>
      <GraphCreator createGraph={createGraph} />
      <VisualGraph nodes={nodes} links={links} />
    </div>
  )
}
