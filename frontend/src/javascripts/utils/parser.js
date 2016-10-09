import flatten from './flatten.js'

const SPHERE_SPAN = 120

export function parse (tree) {
  const rootSphere = getSphere(null, tree, 0, 0)
  const results = parseChildren(tree, 1, 360, 0, rootSphere)
  const pathes = results.map(result => {
    return result.path
  })
  return [rootSphere].concat(results)
}

function parseChildren(parent, level, range, rangeOffset, parentSphere) {
  const s = parent.children.map((node, index, arr) => {
    const span = (range / arr.length)
    const rotation = span * index
    let sphere = getSphere(parentSphere, node, level, rotation + rangeOffset + (span / 2))
    if (node.children) {
      let results = parseChildren(node, level + 1, span, rotation + rangeOffset, sphere)
      let returnVal = flatten([sphere].concat(results))
      return returnVal
    }
    return [sphere]
  })
  return flatten(s)
}

function getSphere(parentSphere, node, level, rotation) {
  let parentObject = parent ? parent : {x:0, y:0}
  return {
    label: node.label,
    path: node.path,
    level: level,
    x: SPHERE_SPAN * Math.cos(rotation/180 * Math.PI) * level,
    y: SPHERE_SPAN * Math.sin(rotation/180 * Math.PI) * level,
    radius: 21,
    parent: parentSphere
  }
}

export function parseUrls(pathSet) {
  let node = {
    label: 'トップ',
    path: '/'
  }
  for (let path of pathSet) {
    let segments = path.split("/")
    segments.shift()
    if (segments[0].length < 1) continue
    hangTo(node, segments)
  }
  return node
}

function hangTo(node, segments) {
  if (segments.length == 0) return
  let segment = "/" + segments.shift()
  if (!node.children) {
    node.children = [{
      label: segment,
      path: segment
    }]
    hangTo(node.children[0], segments)
  } else {
    let index = node.children.findIndex((child)=>{
      return child.path == segment
    })
    if (index == -1) {
      node.children.push({
        label: segment,
        path: segment
      })
      hangTo(node.children[node.children.length - 1], segments)
    } else {
      hangTo(node.children[index], segments)
    }
  }
}
