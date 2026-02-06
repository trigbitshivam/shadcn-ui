import { useState } from "react";
import UserForm from "@/components/user/userform";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const handleSubmit = (user) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, user]);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));

    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
    if (viewUser?.id === id) {
      setViewUser(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    );
  });

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="min-h-screen p-4 md:p-10">
      <div className="max-w-md mx-auto mb-6">
        <Input
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <p className="text-sm text-gray-500 mt-2">
          🔍 Filtering by <b>Name</b> or <b>Email</b>
        </p>
      </div>

      <UserForm
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
        clearSelection={() => setSelectedUser(null)}
      />

      <div className="mt-8 overflow-x-auto border rounded-lg">
        <div className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 font-semibold">
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Age</div>
          <div>Actions</div>
        </div>

        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-5 gap-4 px-4 py-4 border-b items-center"
          >
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.mobile}</div>
            <div>{user.age}</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUser(user)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setViewUser(user)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages || 1}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-black text-white rounded-lg w-11/12 md:w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">User Details</h2>

            <p className="mb-2">
              <b>Name:</b> {viewUser.name}
            </p>
            <p className="mb-2">
              <b>Email:</b> {viewUser.email}
            </p>
            <p className="mb-2">
              <b>Phone:</b> {viewUser.mobile}
            </p>
            <p className="mb-2">
              <b>Age:</b> {viewUser.age}
            </p>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => setViewUser(null)}>
                Close
              </Button>

              <Button
                variant="destructive"
                onClick={() => deleteUser(viewUser.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
