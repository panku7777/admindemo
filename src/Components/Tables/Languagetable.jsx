// LanguageTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Languagetable.css'; // Import the CSS file for styling
import { Modal } from 'antd'; // Assuming you have Ant Design components
import EditLanguage from '../Screens/Editlanguage';

function LanguageTable() {
  const [languages, setLanguages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState('');

  useEffect(() => {
    // Fetch languages from your API endpoint
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/languages');
        setLanguages(response.data); // Assuming the response is an array of languages
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchLanguages();
  }, []); // Run this effect once when the component mounts

  const handleEditLanguage = (languageId) => {
    setVisible(true);
    setSelectedLanguageId(languageId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedLanguageId('');
  };

  return (
    <div className="language-container">
      <h2>Language Table</h2>
      <table className='language-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Language</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <tr key={language._id}>
              <td>{language._id}</td>
              <td>{language.language}</td>
              <td>
                <button
                  className='edit-button'
                  onClick={() => handleEditLanguage(language._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Language Modal */}
      <Modal
        title='Edit Language'
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <EditLanguage languageId={selectedLanguageId} / >
      </Modal>
    </div>
  );
}

export default LanguageTable;
