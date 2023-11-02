import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const RichEditor = (props) => {
  return (
    //@ts-ignore
    <SunEditor height="7.4rem" setOptions={{ buttonList: [["bold", "italic", "strike", "list", "link", "image"]] }} />
  );
};
export default RichEditor;
