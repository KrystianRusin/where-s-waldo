const checkIfWithinCircle = (circleCenter, point, radius) => {
  const dx = circleCenter.x - point.x;
  const dy = circleCenter.y - point.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= radius;
};

export default checkIfWithinCircle;
