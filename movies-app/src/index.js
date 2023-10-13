import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FavoritesProvider } from "./context/favorites";
import Layout from "./components/ui/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import Suggestions from "./pages/Suggestions";
import Movie from "./pages/Movie";
import { discoverMovies, getMovieById } from "./api/movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Suggestions />,
        loader: discoverMovies,
      },
      {
        path: "movie/:movieId",
        element: <Movie />,
        loader: getMovieById,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </React.StrictMode>
);
