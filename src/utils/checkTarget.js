import checkIfWithinCircle from "./checkIfWithinCircle";

const checkTarget = async (difficulty, character, clickPosition, width) => {
  const response = await fetch(
    `https://where-waldo-api.adaptable.app/checkTarget?difficulty=${difficulty}&targetName=${character}`
  );

  // Log the raw response text
  const responseText = await response.text();

  try {
    const data = JSON.parse(responseText);
    const circleCenter = { x: clickPosition.x, y: clickPosition.y };
    const point = { x: data.x, y: data.y }; // replace with actual data coordinates
    const radius = (25 / width) * 100;
    console.log("Circle Center: ", circleCenter);
    console.log("Radius: ", radius);
    console.log("Point: ", point);

    if (checkIfWithinCircle(circleCenter, point, radius)) {
      console.log("The target is within the circle");
      return true;
    } else {
      console.log("The target is outside the circle");
      return false;
    }
  } catch (err) {
    console.error("Failed to parse response text as JSON:", err);
    return false;
  }
};

export default checkTarget;
