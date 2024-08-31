import { paginationCount } from '../constant';

/*Function to return the range array with given start and end values */
const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

/*Function to return the users based on the item per page limit */
export const getUsers = (users, page, limit) => {
  return users.slice((page - 1) * limit, page * limit);
};

/*Function to return the pagination range */
export const getPaginationRange = (totalPages, page) => {
  const start = Math.floor((page - 1) / paginationCount) * paginationCount + 1;
  const end = Math.min(start + paginationCount - 1, totalPages);

  return range(start, end);
};

/*Function to filter the users based on the search text */
export const getFilteredData = (users, searchText) => {
  const filtersData = users.filter(
    (user) =>
      user?.name?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
      user?.role?.toLowerCase()?.includes(searchText?.toLowerCase())
  );
  return filtersData;
};
