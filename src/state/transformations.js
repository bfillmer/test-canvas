
// Update x, y in our matrix array with the delta x/y from moving.
export const pan = (dx, dy, matrix) => matrix.map((n, i) => (i === 4) ? n + dx : (i === 5) ? n + dy : n)

// Soom in or out based on the delta of the wheel scroll.
export const zoom = (scale, matrix) => matrix.map((n, i) => n * scale)
