export function getShellPath(range, index, radius, thickness) {
  const x1 = Math.floor(movePointX1(range, index, radius))
  const x2 = Math.floor(movePointX2(range, index, radius, thickness))
  const x3 = Math.floor(movePointX3(range, index, radius, thickness))
  const x4 = Math.floor(movePointX4(range, index, radius))
  const y1 = Math.floor(movePointY1(range, index, radius))
  const y2 = Math.floor(movePointY2(range, index, radius, thickness))
  const y3 = Math.floor(movePointY3(range, index, radius, thickness))
  const y4 = Math.floor(movePointY4(range, index, radius))
  return `M${x1},${y1} L${x2},${y2} A${largeRadiusX(radius, thickness)},${ largeRadiusY(radius, thickness) } ${range} ${largeArcFlag(range)},1 ${x3},${y3} L${x4},${y4}`
}

function movePointX1 (range, index, radius) {
  return Math.cos(range * index / 180 * Math.PI) * radius
}
function movePointY1 (range, index, radius) {
  return Math.sin(range * index / 180 * Math.PI) * radius
}
function movePointX2 (range, index, radius, thickness) {
  return Math.cos(range * index / 180 * Math.PI) * (radius + thickness)
}
function movePointY2 (range, index, radius, thickness) {
  return Math.sin(range * index / 180 * Math.PI) * (radius + thickness)
}
function movePointX3 (range, index, radius, thickness) {
  return Math.cos(range * (index + 1) / 180 * Math.PI) * (radius + thickness)
}
function movePointY3 (range, index, radius, thickness) {
  return Math.sin(range * (index + 1) / 180 * Math.PI) * (radius + thickness)
}
function movePointX4 (range, index, radius) {
  return Math.cos(range * (index + 1) / 180 * Math.PI) * radius
}
function movePointY4 (range, index, radius) {
  return Math.sin(range * (index + 1) / 180 * Math.PI) * radius
}
function largeArcFlag (range) {
  return range > 180 ? 1 : 0
}
function largeRadiusX (radius, thickness) {
  return radius + thickness
}
function largeRadiusY (radius, thickness) {
  return radius + thickness
}