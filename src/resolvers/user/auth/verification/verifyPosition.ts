export const positionDetermination = (position: String): number => {
  switch (position) {
    case "admin":
      return 40;
    case "Teacher":
      return 30;
    case "Group leader":
      return 20;
    case "student":
      return 10;
    default:
      return 0;
  }
};

export default (position: String, minPosition: String): Boolean => {
  if (positionDetermination(position) >= positionDetermination(minPosition))
    return true;
  return false;
};
