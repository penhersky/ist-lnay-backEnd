export default <T>(
  arr: T[],
  page: number,
  itemsPerPage = 10
): {arr: T[]; count: number | undefined} => {
  if (!page) return {arr, count: undefined};
  const count = Math.ceil(arr.length / itemsPerPage);

  if (count < page || page <= 0) return {arr, count: undefined};
  return {
    arr: arr.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    count
  };
};
