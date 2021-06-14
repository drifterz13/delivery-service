export type GraphNode = {
  /**
   * node name.
   */
  id: string
}

export type Link = {
  /**
   * source node id.
   */
  source: string
  /**
   * target node id.
   */
  target: string
  /**
   * weight of the graph edge.
   */
  value: number
}

export type GraphData = Map<GraphNode['id'], Omit<Link, 'source'>[]>
