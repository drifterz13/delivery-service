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
export function getCostFromRoutes(links: Link[], routes: string) {
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
