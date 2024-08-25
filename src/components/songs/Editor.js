import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const SongEditor = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [mode, setMode] = useState('create');
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    songWriters: '',
    year: '',
    genre: '',
  });

  useEffect(() => {
    if (id) {
      setMode('edit');
      fetchSongDetails(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchSongDetails = async (songId) => {
    try {
      const response = await api.get(`/songs/${songId}`);
      setSong(response.data);
    } catch (error) {
      console.error('Error fetching song details:', error);
      alert(`${error.status} - ${error.statusText}\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (mode === 'edit') {
        await api.patch(`/songs/${id}`, song);
        alert('Song updated successfully!');
      } else {
        await api.post('/songs', song);
        alert('Song created successfully!');
      }
      navigate('/songs', { replace: true }); // Redirect to the songs list page after update/create
    } catch (error) {
      console.error(`There was an error ${mode === 'edit' ? 'updating' : 'creating'} the song!`, error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSong((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-light">Song</h1>
          <p className="text-gray-500">{`${mode === 'edit' ? 'Update' : 'Add'} music collection`}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="mb-3 block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              id="title"
              value={song.title}
              onChange={handleChange}
              className="appearance-none mt-1 block w-full border-b border-gray-300 shadow-sm focus:outline-none focus:border-gray-800"
              placeholder="Enter song title"
              required
            />
          </div>
          <div>
            <label htmlFor="artist" className="mb-3 block text-sm font-medium text-gray-700">Artist *</label>
            <input
              type="text"
              name="artist"
              id="artist"
              value={song.artist}
              onChange={handleChange}
              className="appearance-none mt-1 block w-full border-b border-gray-300 shadow-sm focus:outline-none focus:border-gray-800"
              placeholder="Enter artist name"
              required
            />
          </div>
          <div>
            <label htmlFor="album" className="mb-3 block text-sm font-medium text-gray-700">Album *</label>
            <input
              type="text"
              name="album"
              id="album"
              value={song.album}
              onChange={handleChange}
              className="appearance-none mt-1 block w-full border-b border-gray-300 shadow-sm focus:outline-none focus:border-gray-800"
              placeholder="Enter album name"
            />
          </div>
          <div>
            <label htmlFor="songWriters" className="mb-3 block text-sm font-medium text-gray-700">Song Writers *</label>
            <input
              type="text"
              name="songWriters"
              id="songWriters"
              value={song.songWriters}
              onChange={handleChange}
              className="appearance-none mt-1 block w-full border-b border-gray-300 shadow-sm focus:outline-none focus:border-gray-800"
              placeholder="Enter song writers"
            />
          </div>
          <div>
            <label htmlFor="year" className="mb-3 block text-sm font-medium text-gray-700">Year *</label>
            <input
              type="number"
              name="year"
              id="year"
              value={song.year}
              onChange={handleChange}
              className="appearance-none mt-1 block w-full border-b border-gray-300 shadow-sm focus:outline-none focus:border-gray-800"
              placeholder="Enter release year"
              required
            />
          </div>
          <div>
            <label htmlFor="genre" className="mb-3 block text-sm font-medium text-gray-700">Genre *</label>
            <input
              type="text"
              name="genre"
              id="genre"
              value={song.genre}
              onChange={handleChange}
              className="appearance-none mt-1 block w-full border-b border-gray-300 shadow-sm focus:outline-none focus:border-gray-800"
              placeholder="Enter genre"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            {mode === 'edit' ? 'Update Song' : 'Create Song'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongEditor;
