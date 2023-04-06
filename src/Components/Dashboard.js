import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Accordion, ListGroup } from 'react-bootstrap';
import { checkToken,loggedInData, addBlogItem, getBlogItemsByUserId, updateBlogItem } from '../services/DataService';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    let navigate = useNavigate();

    useEffect(() => {
        const getLoggedInUserData = async () => {
            const loggedIn = loggedInData();
            setUserId(loggedIn.userId);
            setPublisherName(loggedIn.publisherName) //double check property
            console.log(loggedIn);
            let userBlogItems = await getBlogItemsByUserId(loggedIn.userId);
            setBlogItems(userBlogItems);
            console.log(userBlogItems);
        }
        if(!checkToken()) {
            navigate('/Login');
        } else {
            // Get the users data and blog items
            getLoggedInUserData();
        }
    }, [])

    // Forms 
    const [blogTitle, setBlogTitle] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogTags, setBlogTags] = useState('');
    const [blogItems, setBlogItems] = useState([]);
    const [blogId, setBlogId] = useState(0);
    const [blogUserId, setUserId] = useState(0);
    const [blogPublisherName, setPublisherName] = useState('');

    // Bools
    const [show, setShow] = useState(false);
    const [editBool, setEditBool] = useState(false);
    const [blogIsDeleted, setBlogIsDeleted] = useState(false);
    const [blogIsPublished, setIsPublished] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {

        // console.log(e.target.textContent);
        setShow(true);

        if (e.target.textContent === 'Add Blog Item') {
            setEditBool(false);
            setBlogTitle('');
            setBlogDescription('');
            setBlogCategory('');
            setBlogTags('');
        } else {
            setEditBool(true);
            setBlogTitle('Spicy Noods');
            setBlogDescription('Spicy noods are life');
            setBlogCategory('Pastas');
            setBlogTags('yummy,spicy,fuego');
        }

    }

    const handleTitle = (e) => setBlogTitle(e.target.value);
    const handleDescription = (e) => setBlogDescription(e.target.value);
    // const handelCategory = (e) => setBlogCategory(e.target.value);
    // We desctructured it for practice below
    const handelCategory = ({ target: { value } }) => setBlogCategory(value);

    const handleTags = ({ target }) => setBlogTags(target.value);

    // ({target: {value}})

    // let e = {
    //     target: {
    //         value: "anything we type",
    //         random: 'something random'
    //     }
    // }

    const handleImage = (event) => {
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            setBlogImage(reader.result);
        }
        reader.readAsDataURL(file);
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
                            {/* Commented below is how to do it via anonymous function in-line */}
                            {/* <Form.Control type="text" placeholder="Enter title" onChange={(e) => setBlogTitle(e.target.value)} value={blogTitle}/> */}
                            <Form.Control type="text" placeholder="Enter title" onChange={handleTitle} value={blogTitle} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" onChange={handleDescription} value={blogDescription} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="Category">
                            <Form.Select aria-label="Default select example" onChange={handelCategory} value={blogCategory}>
                                <option>Pick a category</option>
                                <option value="Sports">Sports</option>
                                <option value="Cats">Cats</option>
                                <option value="Pastas">Pastas</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Tags">
                            <Form.Label>Tags (Seperated by commas)</Form.Label>
                            <Form.Control type="text" placeholder="Enter tags seperated by commas" onChange={handleTags} value={blogTags} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Image">
                            <Form.Label>Pick and Image</Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpg" placeholder="Enter an image" onChange={handleImage} />
                        </Form.Group>

                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {editBool ? 'Save Changes' : 'Save'}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {editBool ? 'Save Changes' : 'Save'} and Publish
                    </Button>
                </Modal.Footer>
            </Modal>


            <Row>
                <Col md={12}>
                    <Button onClick={handleShow}>Add Blog Item</Button>
                    <Button onClick={handleShow}>Edit Blog Item</Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Published Blog Items</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {blogItems.map((item, idx) => {
                                        return (
                                            <div key={idx}>
                                                {
                                                    item.Published ?
                                                        <ListGroup.Item>
                                                            <Col>{item.title}</Col>
                                                            <Col>
                                                                <Button variant='danger'>Delete</Button>
                                                                <Button variant='info'>Edit</Button>
                                                                <Button variant='success'>Unpublish</Button>
                                                            </Col>
                                                        </ListGroup.Item>
                                                        : null
                                                }
                                            </div>
                                        )
                                    })}
                                </ListGroup>



                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Unpublished Blog Items</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {blogItems.map((item, idx) => {
                                        return (
                                            <div key={idx}>
                                                {
                                                    item.Published ?
                                                        <ListGroup.Item>
                                                            <Col>{item.title}</Col>
                                                            <Col>
                                                                <Button variant='danger'>Delete</Button>
                                                                <Button variant='info'>Edit</Button>
                                                                <Button variant='success'>Publish</Button>
                                                            </Col>
                                                        </ListGroup.Item>
                                                        : null
                                                }
                                            </div>
                                        )
                                    })}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;