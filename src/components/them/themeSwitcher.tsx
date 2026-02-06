"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/dark/theme-provider";
import { IoMdColorPalette } from "react-icons/io";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const themes = [
  { name: "Green", color: "bg-green-500" },
  { name: "Rose", color: "bg-rose-500" },
  { name: "Blue", color: "bg-blue-500" },
  { name: "Violet", color: "bg-violet-500" },
] as const;

export default function ThemeSwitcher() {
  const { colorTheme, setColorTheme } = useTheme();

  const [selectedTheme, setSelectedTheme] = useState(colorTheme);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedTheme(colorTheme);
  }, [colorTheme]);

  const handleConfirm = () => {
    setColorTheme(selectedTheme);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedTheme(colorTheme);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <IoMdColorPalette />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[320px] p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-sm">Theme</DialogTitle>
          <DialogDescription className="text-xs">
            Select a color theme
          </DialogDescription>
        </DialogHeader>

        <Select
          value={selectedTheme}
          onValueChange={(value) => setSelectedTheme(value as any)}
        >
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>

          <SelectContent className="w-full">
            <SelectGroup>
              {themes.map((theme) => (
                <SelectItem key={theme.name} value={theme.name}>
                  <span
                    className={`h-3 w-3 rounded-full ${theme.color} mr-2`}
                  />
                  {theme.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex justify-end gap-2 pt-3">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            Cancel
          </Button>

          <Button size="sm" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
