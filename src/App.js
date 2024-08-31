import './App.css';
import { useEffect, useState } from 'react';
import { Pagination } from './components/Pagination';
import Table from './components/Table';
import { getFilteredData, getUsers } from './utils/appUtils';
import { itemPerPage } from './constant';

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [editRow, setEditRow] = useState(null);
  /*maintaining the users copy to filter the 
  users from original records to get 
  the corrent filtred data*/
  const [usersCopy, setUsersCopy] = useState([]);
  const totalPages = Math.ceil(users.length / itemPerPage);
  const [searchText, setSearchText] = useState('');

  /*Function to handle the pagination change */
  const handlePageChange = (value) => {
    if (value === 'first') {
      setPage(1);
    } else if (value === 'previous') {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === 'next') {
      if (page !== totalPages) {
        setPage(page + 1);
      }
    } else if (value === 'last') {
      setPage(totalPages);
    } else {
      setPage(value);
    }
  };

  /*useEffect to fetch the list of users on page load */
  useEffect(() => {
    const fetchData = async () => {
      const respone = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      const usersJson = await respone.json();
      setUsers(usersJson);
      setUsersCopy(usersJson);
    };
    fetchData();
  }, []);

  /*Function to handle the single user delete by delete icon */
  const handleUserDelete = (userId) => {
    const filtersData = users.filter((user) => user.id !== userId);
    setUsers(filtersData);
  };

  /*Function to edit the table row data inplace */
  const handleRowEdit = (e, userId) => {
    const usersClone = [...users];
    usersClone.forEach((user) => {
      if (user.id === userId) {
        user[e.target.name] = e.target.value;
      }
      setUsers(usersClone);
    });
  };

  /*Function to delete the all selecte users */
  const handleBulkUserDelete = () => {
    const filtersData = users.filter((user) => !userIds.includes(user.id));
    setUsers(filtersData);
    setUserIds([]);
    setPage(1);
  };

  /*Function to selet or de-select the all users list on the current page */
  const handleCheckBoxClick = (e, userId) => {
    if (userId) {
      if (!e.target.checked) {
        setUserIds(userIds.filter((id) => id !== userId));
      } else {
        setUserIds([...userIds, userId]);
      }
    } else {
      if (e.target.checked) {
        const ids = getUsers(users, page, itemPerPage).map((user) => user.id);
        setUserIds(ids);
      } else {
        setUserIds([]);
      }
    }
  };

  /*Function to enable the table row edit mode */
  const handleEdit = (userId) => {
    if (!editRow) {
      setEditRow(userId);
    } else {
      setEditRow(null);
    }
  };

  /*useEffect to filter the users list based on the search text */
  useEffect(() => {
    if (searchText.length) {
      const filtersData = getFilteredData(usersCopy, searchText);
      setUsers(filtersData);
      setPage(1);
    }
  }, [searchText, usersCopy]);

  return (
    <div className="container">
      <input
        className="search-box"
        type="search"
        placeholder="Search by name, email or role"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table
        users={getUsers(users, page, itemPerPage)}
        handleUserDelete={handleUserDelete}
        handleCheckBoxClick={handleCheckBoxClick}
        userIds={userIds}
        handleRowEdit={handleRowEdit}
        handleEdit={handleEdit}
        editRowId={editRow}
      />
      <div className="bottom-row">
        {userIds.length ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleBulkUserDelete}
          >
            Delete Selected
          </button>
        ) : (
          <div></div>
        )}

        <Pagination
          totalPages={totalPages}
          page={page}
          limit={itemPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
