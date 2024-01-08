import React from 'react';
import { Tabs } from 'antd'; // Import Tabs from Ant Design

import Navbar from './Navbar';
import Addroom from './Screens/Addbook';
import BooksTable from './Tables/Books';
import AddGenreForm from './Screens/Addgenre';
import AddLanguageForm from './Screens/Addlanguage';
import GenreTable from './Tables/Genretable';
import LanguageTable from './Tables/Languagetable';
import UsersTable from './Tables/Usertable';

const { TabPane } = Tabs; // Destructure TabPane from Tabs

function Pnael() {
  return (
    <div>
      <div className='ml-5 mt-3 mr-5 mb-5 bsx'>
        <h2 className='text-center' style={{ fontSize: '30px' }}>
          <b>Admin Panel</b>
        </h2>
        <Tabs defaultActiveKey='1' tabPosition='left'>
        <TabPane tab='Admin' key='1'>
            <h1>WELCOME</h1>
          </TabPane>
          <TabPane tab='Users' key='2'>
            <UsersTable/>
          </TabPane>
          <TabPane tab='Add Book' key='3'>
            <Addroom/>
          </TabPane>
          <TabPane tab='Books' key='4'>
            <BooksTable/>
          </TabPane>
          <TabPane tab='Add Genre' key='5'>
            <AddGenreForm/>
          </TabPane>
          <TabPane tab='Genres' key='6'>
            <GenreTable/>
          </TabPane>
          <TabPane tab='Add Language' key='7'>
            <AddLanguageForm/>
          </TabPane>
          <TabPane tab='Languages' key='8'>
            <LanguageTable/>
          </TabPane>
          

          
          
        </Tabs>
      </div>
    </div>
  );
}

export default Pnael;
