import './App.css'

import React, { useMemo, useState } from 'react'
import GraphCreator from './GraphCreator.react'

import type { GraphNode, Link } from './types'

import VisualGraph from './VisualGraph.react'
import { data } from './data'
import CollapsibleSection from './CollapsibleSection.react'
import GraphInfo from './GraphInfo.react'

const DEVELOPMENT = 0

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
      <div>
        <CollapsibleSection title="Build graph">
          <GraphCreator createGraph={createGraph} />
        </CollapsibleSection>
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
      </div>

      <VisualGraph
        nodes={(DEVELOPMENT ? data.nodes : nodes).map((nodeData) =>
          Object.create(nodeData)
        )}
        links={(DEVELOPMENT ? data.links : links).map((linkData) =>
          Object.create(linkData)
        )}
        selectNode={selectNode}
      />
    </div>
  )
}
