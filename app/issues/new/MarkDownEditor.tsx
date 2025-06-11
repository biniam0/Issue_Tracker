"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});


const MarkDownEditor = () => {
  return <SimpleMDE placeholder="Description" />;
};

export default MarkDownEditor;
