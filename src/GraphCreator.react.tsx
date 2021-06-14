import React, { useEffect, useRef, useState } from 'react'

type Props = {
  createGraph: (source: string, target: string, weight: number) => void
}

export default function GraphCreator(props: Props) {
  const sourceInputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    sourceInputRef.current.focus()
  }, [])

  const [linkWeight, setLinkWeigth] = useState(0)
  const [sourceNode, setSourceNode] = useState('')
  const [targetNode, setTargetNode] = useState('')

  const reset = () => {
    setLinkWeigth(0)
    setSourceNode('')
    setTargetNode('')
  }

  return (
    <section className="graph-creator">
      <label>
        Source node:
        <input
          ref={sourceInputRef}
          type="text"
          placeholder="Enter source node"
          value={sourceNode}
          onChange={(e) => setSourceNode(e.target.value)}
        />
      </label>

      <label>
        Target node:
        <input
          type="text"
          placeholder="Enter target node"
          value={targetNode}
          onChange={(e) => setTargetNode(e.target.value)}
        />
      </label>

      <label>
        Link weight:
        <input
          type="number"
          placeholder="Enter link weight (1-100)"
          min={1}
          max={100}
          value={linkWeight}
          onChange={(e) => setLinkWeigth(+e.target.value)}
        />
      </label>

      <button
        type="button"
        onClick={() => {
          props.createGraph(sourceNode, targetNode, linkWeight)
          reset()
          sourceInputRef.current.focus()
        }}
      >
        Create
      </button>
    </section>
  )
}
