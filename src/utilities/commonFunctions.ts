export const calculateRoute = async () => {
  const randomIndex = Math.floor(Math.random() * 5);
  const newDistance = Math.round([116, 76, 132, 88, 146][randomIndex]);
  return {
    newDistance,
    newDuration: Math.round((newDistance * 80) / 100),
  };
};
