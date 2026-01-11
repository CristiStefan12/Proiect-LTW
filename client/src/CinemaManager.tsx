import {
  ADD_MOVIE,
  ADD_REVIEW,
  DELETE_MOVIE,
  GET_DATA,
  UPDATE_DIRECTOR,
  UPDATE_MOVIE,
} from "./graphql/queries";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";

import { useNavigate } from "react-router-dom";

interface Review {
  id: string;
  rating: number;
  text: string;
}

interface Director {
  id: string;
  name: string;
  nationality?: string;
}

interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  director: Director;
  reviews: Review[];
}

interface QueryData {
  directors: Director[];
  movies: Movie[];
}

function CinemaManager() {
  const { loading, error, data, refetch } = useQuery<QueryData>(GET_DATA);

  const [addMovie] = useMutation(ADD_MOVIE, { onCompleted: () => refetch() });
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    onCompleted: () => refetch(),
  });
  const [addReview] = useMutation(ADD_REVIEW, { onCompleted: () => refetch() });
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    onCompleted: () => refetch(),
  });
  const [updateDirector] = useMutation(UPDATE_DIRECTOR, {
    onCompleted: () => refetch(),
  });

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("ACTION");
  const [directorId, setDirectorId] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directorId) return alert("Selectează un regizor!");
    await addMovie({
      variables: { title, releaseYear: parseInt(year), genre, directorId },
    });
    setTitle("");
    setYear("");
  };

  const handleAddReview = async (movieId: string) => {
    const rateStr = prompt("Notă (1-5):");
    if (!rateStr) return;
    const text = prompt("Comentariu:");
    if (!text) return;
    await addReview({
      variables: { movieId, rating: parseInt(rateStr), text },
    });
  };

  const handleUpdateDirector = async (d: Director) => {
    const newName = prompt("Nume nou:", d.name);
    if (newName === null) return;

    const newNationality = prompt("Naționalitate nouă:", d.nationality || "");

    await updateDirector({
      variables: {
        id: d.id,
        name: newName || undefined,
        nationality: newNationality || undefined,
      },
    });
  };

  const handleUpdateMovie = async (movie: Movie) => {
    const newTitle = prompt("Titlu nou:", movie.title);
    if (newTitle === null) return;

    const newYearStr = prompt("An nou:", movie.releaseYear.toString());

    let newGenre = prompt(
      "Gen nou (ACTION, DRAMA, COMEDY, SCIFI):",
      movie.genre
    );
    if (newGenre) {
      newGenre = newGenre.toUpperCase().trim();
      const validGenres = ["ACTION", "DRAMA", "COMEDY", "SCIFI"];
      if (!validGenres.includes(newGenre)) {
        newGenre = null;
      }
    }

    await updateMovie({
      variables: {
        id: movie.id,
        title: newTitle || undefined,
        releaseYear: newYearStr ? parseInt(newYearStr) : undefined,
        genre: newGenre || undefined,
      },
    });
  };

  if (loading)
    return <div className="p-10 text-center text-xl">Loading...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-600">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-800">Cinema Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 h-fit">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-indigo-600">
              Adaugă Film
            </h2>
            <form onSubmit={handleAddMovie} className="flex flex-col gap-3">
              <input
                className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Titlu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="number"
                className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="An"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
              <select
                className="border p-2 rounded bg-white"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="ACTION">Action</option>
                <option value="DRAMA">Drama</option>
                <option value="COMEDY">Comedy</option>
                <option value="SCIFI">Sci-Fi</option>
              </select>
              <select
                className="border p-2 rounded bg-white"
                value={directorId}
                onChange={(e) => setDirectorId(e.target.value)}
                required
              >
                <option value="">-- Alege Regizor --</option>
                {data?.directors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <button className="bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition">
                Salvează
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mt-6">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">
              Editează Regizori
            </h2>
            <div className="space-y-2">
              {data?.directors.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-2 border rounded hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-700">{d.name}</span>
                  <button
                    onClick={() => handleUpdateDirector(d)}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
                  >
                    ✏️ Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {data?.movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden"
            >
              <div className="p-5 flex justify-between items-start bg-slate-50 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {movie.releaseYear} •{" "}
                    <span className="text-indigo-600">{movie.genre}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Regizor: {movie.director.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateMovie(movie)}
                    className="text-blue-500 hover:text-blue-700 font-bold px-3 py-1 text-sm border border-blue-200 rounded hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Ștergi?"))
                        deleteMovie({ variables: { id: movie.id } });
                    }}
                    className="text-red-400 hover:text-red-600 font-bold px-3 py-1 text-sm border border-red-200 rounded hover:bg-red-50 transition"
                  >
                    Șterge
                  </button>
                </div>
              </div>

              <div className="p-5 bg-white">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Recenzii ({movie.reviews.length})
                  </h4>
                  <button
                    onClick={() => handleAddReview(movie.id)}
                    className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold hover:bg-green-200 transition"
                  >
                    + Review
                  </button>
                </div>

                {movie.reviews.length === 0 ? (
                  <p className="text-sm italic text-slate-400">
                    Fără recenzii.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {movie.reviews.map((r) => (
                      <div
                        key={r.id}
                        className="text-sm bg-slate-50 p-2 rounded border-l-4 border-yellow-400"
                      >
                        <span className="font-bold text-slate-800">
                          ★ {r.rating}
                        </span>{" "}
                        <span className="text-slate-600 ml-1">{r.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CinemaManager;
