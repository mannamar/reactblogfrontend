import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

function Dashboard() {

    // Forms
    const [blogTitle, setBlogTitle] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogTags, setBlogTags] = useState('');

    // Bools
    const [show, setShow] = useState(false);
    const [editBool, setEditBool] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {

        // console.log(e.target.textContent);
        setShow(true);

        if(e.target.textContent === 'Add Blog Item') {
            setEditBool(false);
        } else {
            setEditBool(true);
        }

    }
    return (
        <Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editBool ? 'Edit' : 'Add'} Blog Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Title, Image, Description, Category, Tags */}
                    <Form>
                        <Form.Group className="mb-3" controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="Category">
                            <Form.Select aria-label="Default select example">
                                <option>Pick a category</option>
                                <option value="Sports">Sports</option>
                                <option value="Cats">Cats</option>
                                <option value="Pastas">Pastas</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Tags">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="Enter tags" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Image">
                            <Form.Label>Pick and Image</Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpg" placeholder="Enter an image" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save and Publish
                    </Button>
                </Modal.Footer>
            </Modal>


            <Row>
                <Col md={12}>
                    <Button onClick={handleShow}>Add Blog Item</Button>
                    <Button onClick={handleShow}>Edit Blog Item</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;