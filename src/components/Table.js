import React from 'react';

const Table = ({
  users,
  handleUserDelete,
  handleCheckBoxClick,
  userIds,
  handleRowEdit,
  handleEdit,
  editRowId,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="p-3">
            <input
              type="checkbox"
              checked={userIds.length === users.length}
              onChange={(e) => handleCheckBoxClick(e)}
            />
          </th>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Role</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className={userIds.includes(user.id) ? 'gray' : ''}>
              <input
                type="checkbox"
                checked={userIds.includes(user.id)}
                onChange={(e) => handleCheckBoxClick(e, user.id)}
              />
            </td>
            <td className={userIds.includes(user.id) ? 'gray' : ''}>
              <input
                className="table-data"
                type="text"
                name="name"
                value={user.name}
                onChange={(e) => handleRowEdit(e, user.id)}
                disabled={editRowId !== user.id}
              />
            </td>
            <td className={userIds.includes(user.id) ? 'gray' : ''}>
              <input
                className="table-data"
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => handleRowEdit(e, user.id)}
                disabled={editRowId !== user.id}
              />
            </td>
            <td className={userIds.includes(user.id) ? 'gray' : ''}>
              <input
                className="table-data"
                type="text"
                name="role"
                value={user.role}
                onChange={(e) => handleRowEdit(e, user.id)}
                disabled={editRowId !== user.id}
              />
            </td>
            <td className={userIds.includes(user.id) ? 'gray' : ''}>
              <button className="btn" onClick={() => handleEdit(user.id)}>
                <img
                  src={editRowId === user.id ? './save.svg' : './edit.svg'}
                  alt="edit icon"
                  width="30px"
                  height="20px"
                />
              </button>
              <button
                className="btn red"
                onClick={() => handleUserDelete(user.id)}
              >
                <img
                  src="./delete.svg"
                  alt="delete icon"
                  width="30px"
                  height="20px"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
