import { DocumentArrowDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const navigate = useNavigate();
  const genres = ['All', 'Rock', 'Pop', 'Country']

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await api.get('/songs');

        setSongs(data.results);
      } catch (error) {
        console.error('Failed to fetch songs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((song) =>
    (genre === 'All' || song.genre === genre) &&
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  const genreCounts = genres.reduce((counts, tab) => {
    counts[tab] = songs.filter(song => tab === 'All' || song.genre === tab).length;
    return counts;
  }, {});

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-light">Songs</h1>
          <p className="text-gray-500">Your music collection</p>
        </div>
        <div className="flex space-x-4 h-10 text-sm">
          <button className="bg-white px-4 py-2 rounded flex items-center hover:bg-gray-200 border border-gray-300">
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" /> Export
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded flex items-center hover:bg-gray-700"
            onClick={() => navigate('/songs/create')}
          >
            <PlusIcon className="h-4 w-4 mr-2" /> Add New
          </button>
        </div>
      </div>

      <div className="mb-4 text-xs">
        <ul className="flex space-x-4 border-b">
          {genres.map((tab) => (
            <li key={tab}>
              <button
                className={`py-2 px-4 focus:outline-none ${genre === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => setGenre(tab)}
              >
                {tab} ({genreCounts[tab] || 0})
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600">
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Artist</th>
              <th className="py-2 px-4 text-left">Album</th>
              <th className="py-2 px-4 text-left">Year</th>
              <th className="py-2 px-4 text-left">Genre</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map((song) => (
              <tr key={song._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">
                  <Link to={`/songs/edit/${song._id}`} className="text-blue-500 hover:underline">
                    {song.title}
                  </Link>
                </td>
                <td className="py-2 px-4">{song.artist}</td>
                <td className="py-2 px-4">{song.album}</td>
                <td className="py-2 px-4">{song.year}</td>
                <td className="py-2 px-4">{song.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongsList;
