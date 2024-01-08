import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd'; // Assuming you have Ant Design components
import EditGenre from '../Screens/Editgenre'; // Adjust the import path based on your project structure

function GenreTable() {
  const [genres, setGenres] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/genres');
        setGenres(response.data);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchGenres();
  }, []);

  const handleEditGenre = (genreId) => {
    setVisible(true);
    setSelectedGenreId(genreId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedGenreId('');
  };

  return (
    <div>
      <h2>Genre Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre._id}>
              <td>{genre._id}</td>
              <td>{genre.genre}</td>
              <td>
                <button
                  className='edit-button'
                  onClick={() => handleEditGenre(genre._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EditGenre Modal */}
      <Modal
        title='Edit Genre'
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <EditGenre genreId={selectedGenreId} />
      </Modal>
    </div>
  );
}

export default GenreTable;
