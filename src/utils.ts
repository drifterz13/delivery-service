import type { GraphData, Link } from './types'

function getGraphFromLinks(links: Link[]) {
  const graph: GraphData = new Map()

  for (const { source, target, value } of links) {
    if (!graph.get(source)) {
      graph.set(source, [{ target, value }])
      continue
    }

    graph.set(source, [...graph.get(source), { target, value }])
  }

  return graph
}

/**
 *
 * @param routes string represent route ex. `A-B-E`
 */
export function getCostFromRoutes(links: Link[], routes: string): number {
  const graph = getGraphFromLinks(links)

  return getCost(graph, routes.split('-'))
}

function getCost(graph: GraphData, routes: string[]) {
  let cost = 0

  while (routes.length > 0) {
    let routeMatched = false
    const currentRoute = routes.shift()
    const nextRoute = routes.shift()
    const destiantions = graph.get(currentRoute)

    if (!destiantions) {
      throw new Error('Destination not found.')
    }

    for (const destination of destiantions) {
      if (destination.target === nextRoute) {
        routeMatched = true
        cost += destination.value

        if (routes.length === 0) {
          return cost
        }

        routes.unshift(nextRoute)
      }
    }

    if (!routeMatched) {
      throw new Error('No such route')
    }
  }

  return cost
}

/**
 *
 * @param routes string represent (two nodes) route ex. `E-D`
 */
export function getTotalPossibleRoutes(
  links: Link[],
  routes: string,
  limitStop?: number
): number {
  const graph = getGraphFromLinks(links)
  const [fromNode, toNode] = routes.split('-') as [string, string]

  return calcRoutes(graph, fromNode, toNode, limitStop)
}

function calcRoutes(
  graph: GraphData,
  fromNode: string,
  toNode: string,
  limitStop: number = 4,
  totalStop: number = 0
) {
  let sum = 0
  const destinations = graph.get(fromNode)

  if (!destinations || destinations.length === 0) {
    return 0
  }

  if (totalStop >= limitStop) {
    return 0
  }

  for (const destination of destinations) {
    if (destination.target === toNode) {
      sum += 1
      continue
    }

    sum += calcRoutes(
      graph,
      destination.target,
      toNode,
      limitStop,
      totalStop + 1
    )
  }

  return sum
}

export function getTotalNonDuplicatedRoutes(links: Link[], routes: string) {
  const graph = getGraphFromLinks(links)
  const [fromNode, toNode] = routes.split('-') as [string, string]

  return calcNonDuplicatedRoutes(graph, fromNode, toNode)
}

function calcNonDuplicatedRoutes(
  graph: GraphData,
  fromNode: string,
  toNode: string,
  path: string = fromNode,
  visitedPaths: Set<string> = new Set() // represent set of visited path ex. `EABE`
): number {
  const destinations = graph.get(fromNode)

  if (!destinations || destinations.length === 0) {
    return 0
  }

  for (const destination of destinations) {
    if (destination.value === 0) {
      continue
    }

    if (visitedPaths.has(path)) {
      continue
    }

    if (destination.target === toNode) {
      visitedPaths.add(path + destination.target)
      continue
    }

    calcNonDuplicatedRoutes(
      graph,
      destination.target,
      toNode,
      path + destination.target,
      visitedPaths
    )
  }

  return visitedPaths.size
}
