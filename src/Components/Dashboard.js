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
    const handleShow = (e, {id, userid, publishedname, isDeleted, isPublished, title, image, description, category, tags}) => {

        // console.log(e.target.textContent);
        setShow(true);

        if (e.target.textContent === 'Add Blog Item') {
            setEditBool(false);
            
        } else {
            setEditBool(true);
            
        }
        setBlogId(id);
        setUserId(userid);
        setPublisherName(publishedname);
        setBlogTitle(title);
        setBlogImage(image);
        setBlogDescription(description);
        setBlogCategory(category);
        setBlogTags(tags);
        setBlogIsDeleted(isDeleted);
        setIsPublished(isPublished);
    }

    const handleSave = async ({target:{textContent}}) => {
        const item = {
            Id: blogId,
            Userid: blogUserId,
            PublishdName: blogPublisherName,
            Title: blogTitle,
            Image: blogImage,
            Description: blogDescription,
            Date: new Date(),
            Tags: blogTags,
            Category: blogCategory,
            isPublished: textContent === 'Save' || textContent === 'Save Changes' ? false : true,
            isDeleted: false
        }

        console.log(item);
        handleClose();
        let result = false;
        if (editBool) {
            result = await updateBlogItem(item);
        } else {
            result = await addBlogItem(item);
        }

        if (result) {
            let userBlogItems = await getBlogItemsByUserId(blogUserId);
            console.log(userBlogItems);
            setBlogItems(userBlogItems);
        } else {
            alert(`Blog Items was not ${editBool ? 'Updated' : 'Added'}`)
        }
    }

    const handlePublish = async (item) => {
        item.isPublished = !item.isPublished;
        let result = await updateBlogItem(item);
        if (result) {
            let userBlogItems = await getBlogItemsByUserId(blogUserId);
            console.log(userBlogItems);
            setBlogItems(userBlogItems);
        } else {
            alert(`Blog Items was not updated`)
        }
    }

    const handleDelete = async (item) => {
        item.isDeleted = !item.isDeleted;
        let result = await updateBlogItem(item);
        if (result) {
            let userBlogItems = await getBlogItemsByUserId(blogUserId);
            console.log(userBlogItems);
            setBlogItems(userBlogItems);
        } else {
            alert(`Blog Items was not deleted`)
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
                    <Button variant="primary" onClick={handleSave}>
                        {editBool ? 'Save Changes' : 'Save'}
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {editBool ? 'Save Changes' : 'Save'} and Publish
                    </Button>
                </Modal.Footer>
            </Modal>


            <Row>
                <Col md={12}>
                    <Button onClick={(e) => handleShow(e, {id: 0, userid: blogUserId, publishedname: blogPublisherName, isDeleted: false, isPublished: false, title: '', image: '', description: '', category: '', tags: ''})}>Add Blog Item</Button>
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
                                                    item.isPublished ?
                                                        <ListGroup.Item>
                                                            <Col>{item.title}</Col>
                                                            <Col>
                                                                <Button variant='danger' onClick={() => handleDelete(item)}>Delete</Button>
                                                                <Button variant='info' onClick={(e) => handleShow(e, item)}>Edit</Button>
                                                                <Button variant='success' onClick={() => handlePublish(item)}>Unpublish</Button>
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
                                                    item.isPublished ?
                                                        null :
                                                        <ListGroup.Item>
                                                            <Col>{item.title}</Col>
                                                            <Col>
                                                                <Button variant='danger' onClick={() => handleDelete(item)}>Delete</Button>
                                                                <Button variant='info' onClick={(e) => handleShow(e, item)}>Edit</Button>
                                                                <Button variant='success' onClick={() => handlePublish(item)}>Publish</Button>
                                                            </Col>
                                                        </ListGroup.Item>
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