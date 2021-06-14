import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'
import { GraphNode, Link } from './types'

const width = 600
const height = 600

type Props = {
  nodes: GraphNode[]
  links: Link[]
}

export default function VisualGraph(props: Props) {
  const { links, nodes } = props as { links: any[]; nodes: any[] }

  useEffect(() => {
    const svg = d3.select('svg')

    svg.selectAll('svg > *').remove()

    // Create force simulation and initialize relation between link and node.
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-600))
      .force('x', d3.forceX())
      .force('y', d3.forceY())

    // An arrow for pointing at node.
    svg
      .append('defs')
      .selectAll('marker')
      .data(links)
      .join('marker')
      .attr('id', (d) => `arrow-${d.index}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 17)
      .attr('refY', -0.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', 'black')
      .attr('d', 'M0,-5L10,0L0,5')

    const link = svg
      .append('g')
      .attr('id', 'links')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('id', (d) => `link-${d.index}`)
      .attr('stroke', 'black')
      .attr('marker-end', (d) => `url(#arrow-${d.index})`) // Combine each link line with the arrow pointer.

    // A text represent weight of respective link.
    d3.select('#links')
      .selectAll('text')
      .data(links)
      .join('text')
      .attr('fill', 'teal')
      .append('textPath')
      .attr('xlink:href', (d) => `#link-${d.index}`)
      .attr('startOffset', 50)
      .text((_, idx) => links[idx].value)

    // Group for contain nodes.
    const node = svg
      .append('g')
      .attr('fill', 'currentColor')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation))

    // A circle node.
    node
      .append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('fill', 'tomato')
      .attr('r', 8)

    // A text represent node name for the respective node.
    node
      .append('text')
      .attr('x', 8)
      .attr('y', '0.31em')
      .text((d) => d.id)
      .clone(true)
      .lower()
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 3)

    simulation.on('tick', () => {
      // Update link's positin.
      link.attr('d', (d) => {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)

        return `M${d.source.x},${d.source.y} A${r},${r} 0 0,1 ${d.target.x},${d.target.y}`
      })
      // Update node's position.
      node.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })

    function drag(simulation: d3.Simulation<any, undefined>) {
      function dragstarted(event, d) {
        if (!event.active) {
          simulation.alphaTarget(0.3).restart()
        }
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragended(event, d) {
        if (!event.active) {
          simulation.alphaTarget(0)
        }
        d.fx = null
        d.fy = null
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }
  }, [props.links, props.nodes])

  return (
    <svg
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      style={{ font: '12px sans-serif' }}
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  )
}
