import { useState } from 'react';
import List from './components/List';
import NewTrip from './components/NewTrip';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [tripList, setTripList] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [itemsToggle, setItemsToggle] = useState(false);

  return (
    <div className="App">
      <div className="overlay" style={{ display: (addNew || edit || itemsToggle) ? "block" : "none" }}></div>
      <div className="container">
        <h1>Twoja lista wyjazdów</h1>
        <List tripList={tripList} setTripList={setTripList} edit={edit} setEdit={setEdit} itemList id={id} setId={setId} itemsToggle={itemsToggle} setItemsToggle={setItemsToggle} addNew={addNew} />
        <Button variant="success" className="addBtn" onClick={() => setAddNew(true)}>Utwórz nowy wyjazd</Button>
        {addNew && (
          <NewTrip setAddNew={setAddNew} tripList={tripList} setTripList={setTripList} id={id} setId={setId} />
        )}
      </div>
    </div>
  )
}

export default App;
