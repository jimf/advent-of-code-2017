exports.bfs = (pred, key, graph) => {
  const queue = []
  const seen = {}
  graph[key].forEach((neighbor) => {
    queue.push(neighbor)
  })
  while (queue.length) {
    const neighbor = queue.shift()
    if (!seen[neighbor]) {
      if (pred(neighbor)) {
        return true
      } else {
        graph[neighbor].forEach((other) => {
          queue.push(other)
        })
        seen[neighbor] = true
      }
    }
  }
  return false
}

exports.dijkstra = (graph, startNode, endNode) => {
  const processed = {}
  const costs = Object.keys(graph[startNode]).reduce((acc, node) => {
    acc[node] = graph[startNode][node]
    return acc
  }, { [endNode]: Infinity })
  const parents = Object.keys(graph[startNode]).reduce((acc, node) => {
    acc[node] = startNode
    return acc
  }, { [endNode]: null })

  const findLowestCostNode = () => {
    let lowestCost = Infinity
    let lowestCostNode = null
    Object.keys(costs).forEach((node) => {
      const cost = costs[node]
      if (cost < lowestCost && !processed[node]) {
        lowestCost = cost
        lowestCostNode = node
      }
    })
    return lowestCostNode
  }

  let node = findLowestCostNode(costs)

  while (node !== null) {
    const cost = costs[node]
    const neighbors = graph[node]
    Object.keys(neighbors).forEach((n) => {
      const newCost = cost + neighbors[n]
      if (costs[n] > newCost) {
        costs[n] = newCost
        parents[n] = node
      }
    })
    processed[node] = true
    node = findLowestCostNode(costs)
  }

  const path = []
  node = endNode
  do {
    path.unshift(node)
    node = parents[node]
  } while (node !== startNode)
  return path
}
