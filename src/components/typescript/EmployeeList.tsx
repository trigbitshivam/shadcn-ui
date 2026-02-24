import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  salary: number;
  age: number;
  number: string;
  location: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  visibleColumns?: Record<string, boolean>;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onView,
  onEdit,
  onDelete,
  visibleColumns = {
    name: true,
    email: true,
    role: true,
    salary: true,
    age: true,
    number: true,
    location: true,
    actions: true,
  },
}) => {
  const visibleCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <div className="mt-6 max-w-5xl mx-auto overflow-x-auto">
      <table className="w-full min-w-[800px] bg-gray border rounded-lg shadow-md">
        <thead>
          <tr className="bg-black-200 text-sm uppercase">
            {visibleColumns.name && <th className="p-3 text-left">Name</th>}
            {visibleColumns.email && <th className="p-3 text-left">Email</th>}
            {visibleColumns.role && <th className="p-3 text-left">Role</th>}
            {visibleColumns.salary && <th className="p-3 text-left">Salary</th>}
            {visibleColumns.age && <th className="p-3 text-left">Age</th>}
            {visibleColumns.number && <th className="p-3 text-left">Mobile</th>}
            {visibleColumns.location && (
              <th className="p-3 text-left">Location</th>
            )}
            {visibleColumns.actions && (
              <th className="p-3 text-center">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id} className="border-t ">
                {visibleColumns.name && <td className="p-3">{emp.name}</td>}
                {visibleColumns.email && <td className="p-3">{emp.email}</td>}
                {visibleColumns.role && <td className="p-3">{emp.role}</td>}
                {visibleColumns.salary && <td className="p-3">{emp.salary}</td>}
                {visibleColumns.age && <td className="p-3">{emp.age}</td>}
                {visibleColumns.number && <td className="p-3">{emp.number}</td>}
                {visibleColumns.location && (
                  <td className="p-3">{emp.location}</td>
                )}
                {visibleColumns.actions && (
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => onView(emp.id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => onEdit(emp.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => onDelete(emp.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={visibleCount}
                className="text-center p-4 text-gray-500"
              >
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
