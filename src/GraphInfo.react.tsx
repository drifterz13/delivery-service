import React, { useState } from 'react'
import {
  getCostFromRoutes,
  getTotalNonDuplicatedRoutes,
  getTotalPossibleRoutes,
} from './utils'
import { Link } from './types'

type Props = {
  links: Link[]
  sourceNode: string
  targetNode: string
  clearSelectedNode: () => void
}

export default function GraphInfo(props: Props) {
  const [routeCost, setRouteCost] = useState<number | undefined>()
  const [totalLimitedDeliveryRoutes, setTotalLimitedDeliveryRoutes] =
    useState<number | undefined>()
  //   const [totalNonZeroRoutes, setTotalNonZeroRoutes] =
  //     useState<number | undefined>()

  return (
    <div className="graph-info">
      <div>**Please click on two nodes that you want to get information**</div>

      <div className="graph-info__content">
        <div>Costs: {routeCost}</div>
        <div>Possible routes (limit stop 4): {totalLimitedDeliveryRoutes}</div>
        {/* <div>Possible routes (non-zero): {totalNonZeroRoutes}</div> */}
      </div>

      <button
        className="graph-info__get-info-button"
        type="button"
        disabled={
          props.links.length === 0 || !props.targetNode || !props.sourceNode
        }
        onClick={() => {
          const routes = `${props.sourceNode}-${props.targetNode}`

          try {
            setRouteCost(getCostFromRoutes(props.links, routes))
          } catch (error) {
            setRouteCost(error.message)
          }

          try {
            setTotalLimitedDeliveryRoutes(
              getTotalPossibleRoutes(props.links, routes)
            )
          } catch (error) {
            console.error(error)
          }

          //   try {
          //     setTotalNonZeroRoutes(
          //       getTotalNonDuplicatedRoutes(props.links, routes)
          //     )
          //   } catch (error) {
          //     console.error(error)
          //   }
        }}
      >
        Get info
      </button>

      <button
        onClick={() => {
          setRouteCost(undefined)
          setTotalLimitedDeliveryRoutes(undefined)
        //   setTotalNonZeroRoutes(undefined)

          props.clearSelectedNode()
        }}
      >
        Clear selection
      </button>
    </div>
  )
}
