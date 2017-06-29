// @flow

// Update x, y in our matrix array with the delta x/y from moving.
export const pan = (dx: number, dy: number, matrix: number[]): number[] => matrix.map(
  (n: number, i: number) => (i === 4) ? n + dx : (i === 5) ? n + dy : n
)

// Zoom in or out based on the delta of the wheel scroll.
export const zoom = (scale: number, matrix: number[]): number[] => matrix.map(
  (n: number, i: number) => n * scale
)

// Transform DOM mouse position to SVG coordinate space
export const transformPos = (x, y) => {
  const svgObj = document.getElementById('viewport');
  const matrix = svgObj.getScreenCTM()
  const pt = svgObj.createSVGPoint()
  pt.x = x
  pt.y = y
  return pt.matrixTransform(matrix.inverse())
}
