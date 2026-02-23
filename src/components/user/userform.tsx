"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { validateUser } from "@/components/user/validation-schema";

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  age: number;
}

interface UserFormProps {
  onSubmit: (user: User) => void;
  selectedUser: User | null;
  clearSelection: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  selectedUser,
  clearSelection,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setMobile(selectedUser.mobile);
      setAge(selectedUser.age.toString());
    } else {
      setName("");
      setEmail("");
      setMobile("");
      setAge("");
    }
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateUser({ name, email, mobile, age });
    if (error) return alert(error);

    onSubmit({
      id: selectedUser ? selectedUser.id : Date.now(),
      name,
      email,
      mobile,
      age: Number(age),
    });

    handleCancel();
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setMobile("");
    setAge("");
    clearSelection();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Mobile</Label>
              <Input
                value={mobile}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Age</Label>
              <Input
                type="number"
                min="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 flex-wrap">
            <Button type="submit" className="flex-1">
              {selectedUser ? "Update User" : "Create User"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
