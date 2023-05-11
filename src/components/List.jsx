import React from 'react'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import EditTrip from './EditTrip';
import ItemList from './ItemList';

function List({ tripList, setTripList, edit, setEdit, id, setId, itemsToggle, setItemsToggle, addNew }) {
  const [activeTrip, setActiveTrip] = useState({});

  return (
    <div>
        {tripList.length > 0 ? (
            <div className="tripList">
              <Accordion className="tripAcordion">
                {tripList.map((trip, i) => (
                  <>
                    <Accordion.Item eventKey={i} className="acordionItem" style={ addNew || edit || itemsToggle ? { opacity: 0.4, pointerEvents: "none" } :  { opacity: 1, pointerEvents: "all" } }>
                      <Accordion.Header>{trip.place}</Accordion.Header>
                      <Accordion.Body>
                        <p><b>Data wyjazdu: {new Date(trip.startDate).toLocaleDateString()}</b></p>
                        <p><b>Data powrotu: {new Date(trip.endDate).toLocaleDateString()}</b></p>
                        <p>Lista osób:</p>
                        {trip.peopleArray.length > 0 ? (
                          <ListGroup as="ol" numbered className="peopleList">
                            {trip.peopleArray.map((person, i) => (
                              <ListGroup.Item as="li" key={i}>{person.name}</ListGroup.Item>
                            ))}
                          </ListGroup>
                        ) : (
                          <p>Brak listy</p>
                        )}                       
                        <div className="itemsBtn">
                          <Button variant="secondary" disabled={trip.peopleArray.length < 1} onClick={() => { setItemsToggle(true); setActiveTrip(trip) }}>Lista rzeczy</Button>
                        </div>
                        <div className="manageButtons">
                          <Button variant="success" className="editBtn" onClick={() => { setEdit(true); setActiveTrip(trip); }}>Edytuj</Button>
                          <Button variant="danger" className="deleteBtn" onClick={() => {setTripList((tripList) => tripList.filter((t) => t.id !== trip.id))}}>Usuń</Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </>
                ))}
                {edit === true && (
                      <EditTrip tripList={tripList} setTripList={setTripList} trip={activeTrip} setEdit={setEdit} id={id} setId={setId} />
                    )}
                {itemsToggle === true && (
                      <ItemList tripList={tripList} setTripList={setTripList} trip={activeTrip} setItemsToggle={setItemsToggle} id={id} setId={setId} />
                    )}
              </Accordion>
            </div>
        ) : (
            <p>Nie masz jeszcze żadnych wyjazdów</p>
        )}
    </div>
  )
}

export default List