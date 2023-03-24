import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Accordion, ListGroup } from 'react-bootstrap';

function Dashboard() {

    const [blogItems, setBlogItems] = useState([
        {
            Id: 1,
            Title: "Growing Tomatos",
            Publisher: "Walaa AlSalmi",
            Date: "01-12-2022",
            Description: "Devote a prime, sunny spot to growing tomatoes. Tomatoes need at least 6 to 8 hours of sun to bring out their best flavors. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants, then add that support directly after planting. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants.",
            Image:
                "https://www.almanac.com/sites/default/files/styles/landscape/public/image_nodes/tomatoes_helios4eos_gettyimages-edit.jpeg?itok=m9c3T-XV",
            Published: true,
            Tags: 'gardening,plants',
            Category: 'Pastas'
        },

        {
            Id: 2,
            Title: "Growing Peppers",
            Date: "01-06-2022",
            Publisher: "Tom Finland",
            Description: "Set pepper plant seedlings out after the last spring frost. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day.",
            Image:
                "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Planting-Guide-Bell-Peppers-A105431708.jpg",
            Published: false,
            Tags: 'gardening,plants',
            Category: 'Pastas'
        },
        {
            Id: 3,
            Title: "Growing Eggplants",
            Publisher: "Sam Bilton",
            Date: "12-24-2021",
            Description: "Start eggplant seeds indoors up to 10 weeks before the last frost date. Plant the seeds 1/4inch deep, water after planting and cover loosely with plastic to retain moisture. Transplant the seedlings to the garden when soil temperatures reach 60 degrees. Transplant the seedlings to the garden when soil temperatures reach 60 degrees.",
            Image:
                "https://cleangreensimple.com/wp-content/uploads/2020/05/growing-eggplant.jpg",
            Published: true,
            Tags: 'gardening,plants',
            Category: 'Sports'
        },
        {
            Id: 4,
            Title: "Growing Zucchinis",
            Publisher: "Tina Freedman",
            Date: "12-15-2021",
            Description: "Zucchini needs full sun (at least 6 to 8 hours) and consistently moist soil that is high in organic matter. Some zucchini varieties are vining types that require a trellis or a lot of room to sprawl. There are also bush types suitable for container gardening and small space gardening. There are also bush types suitable for container gardening and small space gardening.",
            Image:
                "https://greenhouseemporium.com/wp-content/uploads/2020/02/How_to_Grow_Zucchini_2.jpg",
            Published: false,
            Tags: 'gardening,plants',
            Category: 'Cats'
        }
    ]);

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
                            <Form.Control type="file" accept="image/png, image/jpg" placeholder="Enter an image" />
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
                                                            <Col>{item.Title}</Col>
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
                                                            <Col>{item.Title}</Col>
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