import flatten from './flatten.js'

const pages = [
  "/",
  "/pageA",
  "/pageB",
  "/pageC",
  "/pageD",
  "/pageD/1",
  "/pageD/2",
  "/pageD/3",
  "/pageD/3/1",
  "/pageD/3/2",
  "/pageD/4",
  "/pageE",
  "/pageE/1",
  "/pageE/2",
  "/pageE/2/1",
  "/pageE/2/2",
  "/pageE/2/3",
  "/pageF"
]

export function generate() {
  const groupNum = 3
  let spheres = makeSpheres(groupNum)
  let now = new Date().getTime()
  let logs = makeInitialUpdateLogs(spheres, now)
  for(let index=0; index < 1000; index++) {
    now += Math.floor(Math.random() * 1000)
    logs.push(makeTransitLogsAndUpdateShperes(spheres, groupNum, now))
  }
  return flatten(logs)
}

function makeSpheres(groupNum) {
  return pages.map(page => {
    let values = []
    for (let groupIndex = 0; groupIndex < groupNum; groupIndex++) {
      values.push(Math.floor(Math.random() * 20))
    }
    return {
      path: page,
      values: values
    }
  })
}

function makeInitialUpdateLogs(spheres, now) {
  let array = spheres.map(sphere => {
    return sphere.values.map((value, index) => {
      return { group: index, type: 'update', path: sphere.path, value: value, time: now }
    })
  })
  return flatten(array)
}

function makeTransitLogsAndUpdateShperes(spheres, groupNum, now) {
  const groupIndex = Math.floor(Math.random() * groupNum)
  const toIndex = Math.floor(Math.random() * spheres.length)
  const fromIndex = Math.floor(Math.random() * spheres.length)
  if (toIndex == fromIndex) {
    return makeTransitLogsAndUpdateShperes(spheres, groupNum, now)
  }
  const moveValue = Math.floor(Math.random() * 3) + 1
  if (spheres[fromIndex].values[groupIndex] < moveValue){
    return makeTransitLogsAndUpdateShperes(spheres, groupNum, now)
  }
  spheres[fromIndex].values[groupIndex] -= moveValue
  spheres[toIndex].values[groupIndex] += moveValue
  return [
    { group: groupIndex, type: 'update', path: spheres[fromIndex].path, value: spheres[fromIndex].values[groupIndex], time: now },
    { group: groupIndex, type: 'move', from: spheres[fromIndex].path, to: spheres[toIndex].path, value: moveValue, time: now },
    { group: groupIndex, type: 'update', path: spheres[toIndex].path, value: spheres[toIndex].values[groupIndex], time: now },
  ]
}

window.genLog = generate
