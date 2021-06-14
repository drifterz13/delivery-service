import { GraphNode, Link } from './types'

export const data: { nodes: GraphNode[]; links: Link[] } = {
  nodes: ['A', 'B', 'C', 'D', 'E', 'F'].map((node) => ({ id: node })),
  links: [
    { source: 'A', target: 'B', value: 1 },
    { source: 'A', target: 'C', value: 4 },
    { source: 'A', target: 'D', value: 10 },
    { source: 'B', target: 'E', value: 3 },
    { source: 'C', target: 'D', value: 4 },
    { source: 'C', target: 'F', value: 2 },
    { source: 'D', target: 'E', value: 1 },
    { source: 'E', target: 'B', value: 3 },
    { source: 'E', target: 'A', value: 2 },
    { source: 'F', target: 'D', value: 1 },
  ],
}
