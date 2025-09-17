"use client";
import { Poppins } from "next/font/google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

export default function Password() {
  const [visible, isVisible] = React.useState(false);

  const toggleVisibility = () => {
    isVisible(!visible);
  };
  return (
    <div className="flex  items-center relative">
      <input
        type={visible ? "text" : "password"}
        id="password"
        className="bg-white rounded-3xl h-10 outline-none px-2 w-full"
      />
      <div className="absolute right-4 cursor-pointer z-10">
        {visible ? (
          <VisibilityOff onClick={toggleVisibility} />
        ) : (
          <Visibility onClick={toggleVisibility} />
        )}
      </div>
    </div>
  );
}
