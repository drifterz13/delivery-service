import './App.css'

import React, { useState } from 'react'
import GraphCreator from './GraphCreator.react'

import type { GraphNode, Link } from './types'

import VisualGraph from './VisualGraph.react'
import { data } from './data'
import CollapsibleSection from './CollapsibleSection.react'
import GraphInfo from './GraphInfo.react'

// Use `1` if you want to use sample data otherwise use `0` so you can create graph by yourself.
const DEVELOPMENT = 1

export default function App() {
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [links, setLinks] = useState<Link[]>([])

  const [sourceNode, setSourceNode] = useState('')
  const [targetNode, setTargetNode] = useState('')

  const clearSelectedNode = () => {
    setSourceNode('')
    setTargetNode('')
  }

  const selectNode = (node: string) => {
    if (sourceNode && targetNode) {
      return
    }

    if (!sourceNode) {
      setSourceNode(node)
      return
    }

    setTargetNode(node)
  }

  const createGraph = (source: string, target: string, value: number) => {
    const nodeSet = new Set(nodes.map((node) => node.id))
    if (!nodeSet.has(source)) {
      setNodes((prevState) => [...prevState, { id: source }])
    }

    if (!nodeSet.has(target)) {
      setNodes((prevState) => [...prevState, { id: target }])
    }

    setLinks((prevState) => [...prevState, { source, target, value }])
  }

  return (
    <div>
      <section>
        {DEVELOPMENT ? null : (
          <CollapsibleSection title="Build graph">
            <GraphCreator createGraph={createGraph} />
          </CollapsibleSection>
        )}
        <CollapsibleSection
          title={`Information nodes (${sourceNode}-${targetNode})`}
        >
          <GraphInfo
            links={DEVELOPMENT ? data.links : links}
            sourceNode={sourceNode}
            targetNode={targetNode}
            clearSelectedNode={clearSelectedNode}
          />
        </CollapsibleSection>
      </section>

      <VisualGraph
        nodes={(DEVELOPMENT ? data.nodes : nodes).map(
          (nodeData) => Object.create(nodeData) // Prevent d3 to mutate the data directly.
        )}
        links={(DEVELOPMENT ? data.links : links).map(
          (linkData) => Object.create(linkData) // Prevent d3 to mutate the data directly.
        )}
        selectNode={selectNode}
      />
    </div>
  )
}
