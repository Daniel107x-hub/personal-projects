import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FavoritesProvider } from "./context/favorites";
import Layout from "./components/ui/Layout";
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Error from "./pages/Error";
import Suggestions from "./pages/Suggestions";
import Movie from "./pages/Movie";
import { discoverMovies, getMovieById } from "./api/movies";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      exact
      path="/"
      element={
        <Layout>
          <Navigate replace to="suggestions/1" />
        </Layout>
      }
      errorElement={<Error />}
    >
      <Route
        exact
        path="suggestions/:page"
        element={<Suggestions />}
        loader={discoverMovies}
      />
      <Route
        exact
        path="movie/:movieId"
        element={<Movie />}
        loader={getMovieById}
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </React.StrictMode>
);
