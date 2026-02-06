import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserForm = ({ onSubmit, selectedUser, clearSelection }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setMobile(selectedUser.mobile);
      setAge(selectedUser.age);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: selectedUser ? selectedUser.id : Date.now(),
      name,
      email,
      mobile,
      age,
    });

    setName("");
    setEmail("");
    setMobile("");
    setAge("");
    clearSelection();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{selectedUser ? "Update User" : "Add User"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <Button className="w-full">
            {selectedUser ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
