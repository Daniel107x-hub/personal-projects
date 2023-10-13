import React from "react";
import { useLoaderData } from "react-router-dom";

function Movie() {
  const { movie } = useLoaderData();
  return (
    <>
      <h1 className="mt-2 mb-6 text-xl">Suggestions</h1>
    </>
  );
}

export default Movie;
