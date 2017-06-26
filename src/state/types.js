
// FLOW TYPES
export type DragStartPayload = {
  x: number,
  y: number,
  id: string
}

export type DraggedPayload = {
  x: number,
  y: number
}

export type ZoomedPayload = {
  dy: number,
  id: string
}

export type Svg = {
  id: string,
  matrix: number[],
  dragX: number,
  dragY: number
}

export type SvgState = {
  dragging: string,
  scalar: number,
  svg: Svg[]
}
