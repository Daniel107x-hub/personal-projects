import React from "react";

function Note({ note }) {
  return (
    <div className="bg-yellow-200 p-5 rounded-2xl max-h-full">
      <div className="max-h-full overflow-hidden">
        {/* <h1 className="font-bold text-xl mb-4">{note.title}</h1> */}
        <p className="max-h-full overflow-hidden">{note.content}</p>
      </div>
      {/* <div className="actions">Actions</div> */}
    </div>
  );
}

export default Note;
