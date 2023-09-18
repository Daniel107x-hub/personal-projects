import React from "react";

function SmallNote({ note }) {
  return (
    <div className="bg-yellow-200 rounded-xl p-3 mb-3">
      <h1 className="font-bold mb-2">{note.title}</h1>
      <p className="line-clamp-5">{note.content}</p>
    </div>
  );
}

export default SmallNote;
