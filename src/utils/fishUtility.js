export function fishAnim(coords) {
  // , maxLeft, maxTop
  let {left, top, flipped, toTop, speed, width, height} = coords;
  const maxTop = Math.round(100 - height) + 100;
  const maxLeft = Math.round(100 - width) + 100;
  console.log(width, height);
 // Horizontal
  if (left >= maxLeft) flipped = true;
  if (left <= 0) flipped = false;
  left += flipped ? -speed : speed;

  // Vertical
  if (top >= maxTop) toTop = true;
  if (top <= 0) toTop = false;
  top += toTop ? -speed : speed;
  return {left, top, flipped, toTop, speed, width, height};
}

export function isFishFlipped() {
  return Math.random() < 0.5;
}
