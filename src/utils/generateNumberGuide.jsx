const generateNumberGuide = () => {
  const date = Date.now().toString();
  return date.substring(1, 5) + "-" + date.substring(5, 8);
}

export default generateNumberGuide;