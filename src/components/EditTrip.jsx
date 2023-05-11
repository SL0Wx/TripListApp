import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import "./style.css";

function EditTrip({ tripList, setTripList, trip, setEdit, id, setId }) {
    const [place, setPlace] = useState(trip.place);
    const [startDate, setStartDate] = useState(trip.startDate);
    const [endDate, setEndDate] = useState(trip.endDate);
    const [personName, setPersonName] = useState("");
    const [peopleArray, setPeopleArray] = useState(trip.peopleArray);
    const [toggle, setToggle] = useState(false);
    const [peopleListToggle, setPeopleListToggle] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [addPersonMsg, setAddPersonMsg] = useState("");
  
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    function handleEditTrip(e) {
        if (place === "" || startDate === "" || endDate === "") {
            setErrorMsg("Wypełnij wszystkie pola!");
        } else {
            e.preventDefault();
            let trips = tripList;
            trip.place = place;
            trip.startDate = startDate;
            trip.endDate = endDate;
            trip.peopleArray = peopleArray;
            trips[trips.findIndex((t) => t === trip.id)] = trip;
            setTripList(trips);
            setEdit(false);   
        }
    }

    async function handleAddPerson(e) {
        if (personName === "") {
            setAddPersonMsg("Wypełnij to pole!");
        } else {
            e.preventDefault();
            setToggle(true);
            setAddPersonMsg("");
            let newPerson = {
                id,
                name: personName,
                item: "",
            };
            setPeopleArray([...peopleArray, newPerson]);
            await delay(500);
            document.getElementById("person").value = "";
            setPersonName("");
            setId(id + 1);
            setToggle(false);
        }
    }

    return (
        <>
            <div className="editTripForm" style={{ left: peopleListToggle ? "22.5%" : "37.5%" }}>
                <CloseButton className="closeBtn" onClick={() => setEdit(false)} />
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPlace">
                        <Form.Label>Miejsce</Form.Label>
                        <Form.Control type="text" placeholder="Nazwa miejsca" name="place" value={place} onChange={e => setPlace(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicStartDate">
                        <Form.Label>Data rozpoczęcia</Form.Label>
                        <Form.Control type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEndDate">
                        <Form.Label>Data zakończenia</Form.Label>
                        <Form.Control type="date" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </Form.Group>
                    <Row>
                        <Form.Label>Uczestnicy</Form.Label>
                        <Col xs={8}>
                            <Form.Group className="mb-3">
                                <Form.Control id="person" type="text" placeholder="Imię i nazwisko uczestnika" name="person" onChange={e => setPersonName(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicAddPersonBtn" className="mb-3">
                                <Button variant="success" disabled={toggle} onClick={handleAddPerson}>{toggle ? "Dodano!" : "Dodaj"}</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <span className="errorValidation">{addPersonMsg}</span>
                    <Row>
                        <Form.Group controlId="formBasicShowPeopleBtn" className="peopleListBtn">
                            <Button variant="outline-info" size="sm" onClick={() => peopleListToggle ? setPeopleListToggle(false) : setPeopleListToggle(true)}>Lista uczestników</Button>
                        </Form.Group>
                    </Row>
                    <Button variant="success" onClick={handleEditTrip}>
                        Edytuj
                    </Button>
                    <span className="errorValidation">{errorMsg}</span>
                </Form>
            </div>
            {peopleListToggle && (
                    <div className="peopleListBox">
                        <CloseButton className="closeBtn" onClick={() => setPeopleListToggle(false)} />
                        <ListGroup className="peopleList">
                        {peopleArray.length > 0 ? (
                            peopleArray.map((person, i) => (
                                <>
                                    <ListGroup.Item as="li" key={i}>
                                        <div className="peopleListItem">
                                            {person.name}
                                            <Button variant="danger" onClick={() => {setPeopleArray((peopleArray) => peopleArray.filter((p) => p.id !== person.id))}}>Usuń</Button>
                                        </div>
                                    </ListGroup.Item>
                                </>
                            ))
                        ) : (
                            <p>Brak uczestników</p>
                        )}
                        </ListGroup>
                        <Button variant="success" className="saveBtn" onClick={() => setPeopleListToggle(false)}>Zapisz</Button>
                    </div>
            )}
        </>
  )
}

export default EditTrip