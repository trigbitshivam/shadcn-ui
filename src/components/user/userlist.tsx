import { useState, useEffect } from "react";
import UserForm from "@/components/user/userform";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  age: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "name",
    "email",
    "mobile",
    "age",
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  useEffect(() => {
    const dummyUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      mobile: `9876543${(100 + i).toString().slice(-3)}`,
      age: 20 + (i % 10),
    }));
    setUsers(dummyUsers);
  }, []);

  const handleSubmit = (user: User) => {
    if (selectedUser) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers((prev) => [...prev, user]);
    }

    setSelectedUser(null);
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;

    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
    setDeleteDialogOpen(false);
  };

  const toggleColumn = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column],
    );
  };

  const filteredUsers = users.filter((user) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [filteredUsers, totalPages, currentPage]);

  return (
    <div className="min-h-screen p-4 md:p-10 bg-background text-foreground">
      <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          className="w-full md:max-w-md"
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button
          onClick={() => {
            setSelectedUser(null);
            setDialogOpen(true);
          }}
        >
          + Add User
        </Button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative">
          <Button onClick={() => setShowColumnDropdown((v) => !v)}>
            Select Columns
          </Button>
          {showColumnDropdown && (
            <div className="absolute top-full mt-2 p-3 bg-black border rounded shadow-md z-10">
              {["name", "email", "mobile", "age"].map((col) => (
                <label
                  key={col}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col)}
                    onChange={() => toggleColumn(col)}
                  />
                  <span className="capitalize">{col}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <select
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 bg-muted"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-muted font-semibold rounded-md text-sm md:text-base">
              {visibleColumns.includes("name") && <div>Name</div>}
              {visibleColumns.includes("email") && <div>Email</div>}
              {visibleColumns.includes("mobile") && <div>Mobile</div>}
              {visibleColumns.includes("age") && <div>Age</div>}
              <div>Actions</div>
            </div>

            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-5 gap-4 px-4 py-4 border-b items-center text-sm md:text-base"
                >
                  {visibleColumns.includes("name") && <div>{user.name}</div>}
                  {visibleColumns.includes("email") && (
                    <div className="truncate">{user.email}</div>
                  )}
                  {visibleColumns.includes("mobile") && (
                    <div>{user.mobile}</div>
                  )}
                  {visibleColumns.includes("age") && <div>{user.age}</div>}

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user);
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setUserToDelete(user);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No users found.
              </div>
            )}
          </div>

          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              First
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              Last
            </Button>
            <span className="text-sm text-muted-foreground ml-3">
              Showing {currentPage} of {totalPages}
            </span>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[95vw] max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser ? "Update User" : "Create User"}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <UserForm
            onSubmit={handleSubmit}
            selectedUser={selectedUser}
            clearSelection={() => {
              setSelectedUser(null);
              setDialogOpen(false);
            }}
          />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserList;
