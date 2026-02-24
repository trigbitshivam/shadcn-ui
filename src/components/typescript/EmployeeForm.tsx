"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import EmployeeList from "@/components/typescript/EmployeeList";
import type { Employee } from "@/components/typescript/EmployeeList";
import { employeeSchema } from "./validation-schema";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const dummyEmployees: Employee[] = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    role: "Manager",
    salary: 70000,
    age: 35,
    number: "9876543210",
    location: "New York",
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Developer",
    salary: 60000,
    age: 28,
    number: "9123456780",
    location: "San Francisco",
  },
];

const allColumns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "salary", label: "Salary" },
  { key: "age", label: "Age" },
  { key: "number", label: "Mobile" },
  { key: "location", label: "Location" },
  { key: "actions", label: "Actions" },
];

const EmployeeForm: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);
  const [form, setForm] = useState<Omit<Employee, "id">>({
    name: "",
    email: "",
    role: "",
    salary: 0,
    age: 0,
    number: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      allColumns.forEach((col) => {
        initial[col.key] = true;
      });
      return initial;
    },
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowColumnDropdown(false);
      }
    }
    if (showColumnDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColumnDropdown]);

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const validate = async (): Promise<boolean> => {
    try {
      await employeeSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const errObj: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        if (e.path) errObj[e.path] = e.message;
      });
      setErrors(errObj);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!(await validate())) return;

    if (editId !== null) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === editId ? { ...e, ...form } : e)),
      );
      setEditId(null);
    } else {
      setEmployees((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    setForm({
      name: "",
      email: "",
      role: "",
      salary: 0,
      age: 0,
      number: "",
      location: "",
    });
    setShowForm(false);
  };

  const handleEdit = (id: number) => {
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;
    const { id: _, ...rest } = emp;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  const confirmDelete = (id: number) => {
    setShowDeleteId(id);
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setShowDeleteId(null);
  };

  const handleView = (id: number) => {
    const emp = employees.find((e) => e.id === id);
    if (emp) alert(JSON.stringify(emp, null, 2));
  };

  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, employees],
  );

  const paginatedEmployees = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredEmployees.slice(start, end);
  }, [filteredEmployees, page, pageSize]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-black-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        Employee Management
      </h1>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
        <Input
          placeholder="Search by name or email"
          className="flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-4 relative">
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm({
                name: "",
                email: "",
                role: "",
                salary: 0,
                age: 0,
                number: "",
                location: "",
              });
            }}
          >
            <FaPlus /> Add Employee
          </Button>
          <div>
            <label className="mr-2 font-semibold">Page Size:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border p-1 rounded bg-muted"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="relative inline-block text-left">
            <Button
              className="select-none"
              type="button"
              onClick={() => setShowColumnDropdown((v) => !v)}
            >
              Select Columns
            </Button>
            {showColumnDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-black border dark:border-gray-700 z-50"
              >
                <div className="py-1 max-h-60 overflow-auto">
                  {allColumns
                    .filter((col) => col.key !== "actions")
                    .map(({ key, label }) => (
                      <label
                        key={key}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns[key]}
                          onChange={() => toggleColumn(key)}
                          className="mr-2"
                        />
                        {label}
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-5xl mx-auto bg-gray p-6 rounded-lg shadow-md mb-6">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Employee" : "Add Employee"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mt-4"
          >
            {(Object.keys(form) as Array<keyof typeof form>).map((field) => (
              <div key={field} className="flex flex-col">
                <Label htmlFor={field} className="capitalize text-sm mb-1">
                  {field}
                </Label>
                <Input
                  id={field}
                  className="h-8 px-2 text-sm"
                  type={
                    field === "age" || field === "salary" ? "number" : "text"
                  }
                  value={form[field]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field]:
                        field === "age" || field === "salary"
                          ? Number(e.target.value)
                          : e.target.value,
                    })
                  }
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-0.5">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-4 mt-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">{editId ? "Update" : "Add"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showDeleteId !== null}
        onOpenChange={() => setShowDeleteId(null)}
      >
        <DialogContent className="max-w-sm mx-auto bg-gray p-6 rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm">
            Are you sure you want to delete this employee?
          </p>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(showDeleteId!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EmployeeList
        employees={paginatedEmployees}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={confirmDelete}
        visibleColumns={visibleColumns}
      />

      <div className="max-w-5xl mx-auto flex justify-between items-center mt-4">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
