import type { Link } from './types'

function getGraphFromLinks(links: Link[]) {
  const graph = new Map<string, { target: string; value: number }[]>()

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

function getCost(
  graph: Map<string, { target: string; value: number }[]>,
  routes: string[]
) {
  let cost = 0
  const currentRoute = routes.shift()

  while (routes.length > 0) {
    let routeMatched = false
    const nextRoute = routes.shift()
    const destiantions = graph.get(currentRoute)

    if (!destiantions) {
      throw new Error('Destination not found.')
    }

    for (const destination of destiantions) {
      if (destination.target === nextRoute) {
        routeMatched = true

        if (routes.length === 0) {
          return cost + destination.value
        }

        return destination.value + getCost(graph, [nextRoute, ...routes])
      }
    }

    if (!routeMatched) {
      throw new Error('No such route')
    }
  }

  return cost
}
