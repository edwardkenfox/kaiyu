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

export function parseUrls(pathes) {
  let rootNode = {
    label: 'トップ',
    path: '/'
  }
  pathes.map(path => {
    addTree(rootNode, path)
  })
}

function addTree(node, path) {
  /*
  pathと比較して行って、一致しない場所が来たら子供検索。
  子供がなければ、子供を作って新しいURLを生成。
  ただし、次の階層まで。
  */
}


// export function parseUrls (pages) {
//   // tree to
//   return pages.map(page => {
//     const parent = getParent(page, pages)
//     //console.log("[PARENT]", page.path, parent && parent.path)
//     return Object.assign({}, {
//       key: page.path,
//       label: page.label,
//       path: page.path,
//       parentPath: parent && parent.path,
//       childrenCount: getChildrenCount(page, pages),
//       level: getLevel(page)
//     })
//   })
// }

// function getChildrenCount(page, pages) {
//   const children = pages.filter(p => {
//     if (p.path == page.path) {
//       return false
//     }
//     if (!p.path.match(page.path)) {
//       return false
//     }
//     const sub = p.path.substr(page.path.length - 1, p.path.length - 1)
//     return sub.indexOf('/') == sub.lastIndexOf('/')
//   })
//   return children.length
// }

// function getParent(page, pages) {
//   if (page.path == '/') return null

//   const parents = pages.filter(p => {
//     if (p.path == page.path) {
//       return false
//     }
//     if (page.path.split('/').length == 2 && p.path == '/') {
//       return true
//     }
//     if (!page.path.match(p.path)) {
//       return false
//     }
//     const sub = page.path.substr(0, p.path.length)
//     const sub2 = page.path.substr(sub.length, p.path.length - 1)
//     if (sub2.split('/').length == 2){
//       return true
//     }
//     return false
//   })
//   return parents[0]
// }

// function getLevel(page) {
//   if (page.path == '/') return 0
//   return page.path.split('/').length - 1
// }
/*
      {
        label: 'トップ',
        path: '/',
        children: [
          {
            label: 'ページA',
            path: '/pageA',
          },
          {
            label: 'ページB',
            path: '/pageB',
          },
          {
            label: 'ページC',
            path: '/pageC',
          },
          {
            label: 'ページD',
            path: '/pageD',
            children: [
              {
                label: 'ページD-1',
                path: '/pageD-1',
              },
            ]
          },
          {
            label: 'ページE',
            path: '/pageE',
            children: [
              {
                label: 'ページE-1',
                path: '/pageE-1',
              },
              {
                label: 'ページE-2',
                path: '/pageE-2',
                children: [
                  {
                    label: 'ページE-2-1',
                    path: '/pageE-2-1',
                  },
                ]
              },
            ]
          },
        ]
      }
*/
