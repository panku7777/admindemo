import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import axios from 'axios';



const { Option } = Select;

function EditBook({ bookId }) {
  const [loader, setLoader] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    ISBN: '',
    genre: '',
    publicationDate: '',
    language: '',
    publisher: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3005/api/books/getbookbyid', {
  bookid: bookId, // Adjust the payload based on your API endpoint requirements
});

        setBookDetails(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, [bookId]);

  const handleUpdateBook = async () => {
    try {
      setLoader(true);

      const response = await axios.put('http://localhost:3005/api/books/updatebook/' + bookId, {
        ...bookDetails,
      });
      
      console.log(response.data);
      setLoader(false);
     alert("Updated succesfully").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      setLoader(false);
      // Handle error
    }
  };

  const handleInputChange = (e, key) => {
    setBookDetails({
      ...bookDetails,
      [key]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <label>Title:</label>
      <Input
        placeholder='Book Title'
        value={bookDetails.title}
        onChange={(e) => handleInputChange(e, 'title')}
      />

      <label>Author:</label>
      <Input
        placeholder='Author'
        value={bookDetails.author}
        onChange={(e) => handleInputChange(e, 'author')}
      />

      <label>ISBN:</label>
      <Input
        placeholder='ISBN'
        value={bookDetails.ISBN}
        onChange={(e) => handleInputChange(e, 'ISBN')}
      />

      <label>Genre:</label>
      <Input
        placeholder='Genre'
        value={bookDetails.genre}
        onChange={(e) => handleInputChange(e, 'genre')}
      />

      <label>Publication Date:</label>
      <Input
        placeholder='Publication Date'
        value={bookDetails.publicationDate}
        onChange={(e) => handleInputChange(e, 'publicationDate')}
      />

      <label>Language:</label>
      <Input
        placeholder='Language'
        value={bookDetails.language}
        onChange={(e) => handleInputChange(e, 'language')}
      />

      <label>Publisher:</label>
      <Input
        placeholder='Publisher'
        value={bookDetails.publisher}
        onChange={(e) => handleInputChange(e, 'publisher')}
      />

      <label>Description:</label>
      <Input
        placeholder='Description'
        value={bookDetails.description}
        onChange={(e) => handleInputChange(e, 'description')}
      />

      <label>Price:</label>
      <Input
        placeholder='Price'
        value={bookDetails.price}
        onChange={(e) => handleInputChange(e, 'price')}
      />

      <Button type='primary' className='mt-3' onClick={handleUpdateBook}>
        Update Book
      </Button>
      {loader}
    </div>
  );
}

export default EditBook;
