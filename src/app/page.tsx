"use client"
import {motion} from "motion/react";
const box = {
    width: '100px',
    height: "100px",
    backgroundColor: "#fff",
    borderRadius: 5,
}
export default function Home() {
  return (
    <motion.div
        style={box}
        animate={{ rotate: 360 }}
        transition={{ duration: 3 }}
    />
  );
}
