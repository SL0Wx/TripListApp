import React from 'react'
import { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import "./style.css"

function ItemList({ tripList, setTripList, trip, setItemsToggle, id, setId }) {
    const [toggle, setToggle] = useState(false);
    const [addItemToggle, setAddItemToggle] = useState(false);
    const [item, setItem] = useState("");
    const [personId, setPersonId] = useState(trip.peopleArray[0].id);
    const [itemArray, setItemArray] = useState(trip.itemArray);
    const [errorMsg, setErrorMsg] = useState("");

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
  
    async function handleAddItem(e) {
        if (item === "") {
            setErrorMsg("Wypełnij to pole!");
        } else {
            e.preventDefault();
            setToggle(true);
            setErrorMsg("");
            let newItem = {
                id,
                name: item,
                personId,
            };
            setItemArray([...itemArray, newItem]);
            await delay(500);
            document.getElementById("item").value = "";
            setItem("");
            setId(id + 1);
            setToggle(false);
        }
    }

    function handleSaveItems(e) {
        e.preventDefault();
        let trips = tripList;
        trip.itemArray = itemArray;
        trips[trips.findIndex((t) => t === trip.id)] = trip;
        setTripList(trips);
        setItemsToggle(false);
    }

    return (
    <>
        <div className="itemListBox" style={{ left: addItemToggle ? "22.5%" : "37.5%" }}>
            <CloseButton className="closeBtn" onClick={() => setItemsToggle(false)} />
            <h4>Rzeczy do wzięcia</h4>
            <ListGroup>
                {itemArray.length > 0 ? (
                    itemArray.map((item, i) => (
                        <>
                            <ListGroup.Item as="li" key={i}>
                                <div className="itemListItem" key={i}>
                                    {item.name} - {trip.peopleArray.find((person) => person.id === item.personId).name}
                                    <Button key={i} variant="danger" onClick={() => {setItemArray((itemArray) => itemArray.filter((i) => i.id !== item.id))}}>Usuń</Button>
                                </div>
                            </ListGroup.Item>
                        </>
                    ))
                ) : (
                    <p>Brak listy rzeczy</p>
                )}
            </ListGroup>
            <Button variant="outline-info" className="addItemBtn" size="sm" onClick={() => addItemToggle ? setAddItemToggle(false) : setAddItemToggle(true)}>Dodaj rzecz</Button>
            <div className="saveItems">
                <Button variant="success" type="submit" onClick={handleSaveItems}>Zapisz</Button>
            </div>
        </div>
        {addItemToggle === true && (
            <div className="itemListForm">
                <CloseButton className="closeBtn" onClick={() => setAddItemToggle(false)} />
                <Form>
                    <Form.Label>Rzecz</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control id="item" type="text" placeholder="Nazwa rzeczy" name="item" onChange={e => setItem(e.target.value)} />
                    </Form.Group>
                    <span className="errorValidation">{errorMsg}</span>
                    <Form.Label>Przypisana osoba</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Select value={personId} onChange={e => setPersonId(parseInt(e.target.value))}>
                            {trip.peopleArray.map((person, i) => (
                                <option key={i} value={person.id}>{person.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="success" disabled={toggle} onClick={handleAddItem}>{toggle ? "Dodano!" : "Dodaj"}</Button>
                </Form>
            </div>
        )}
    </>
  )
}

export default ItemList