import React, { useState } from "react";
// npm install react-bootstrap bootstrap@5.0.1 needed for form and modal
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import "./CreateLinkForm.css";
import { createNewLinks } from "../api";


const CreateLinkForm = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const forFeedback = await createNewLinks([name, link, comment, tags]);
      console.log(forFeedback.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button className="search-button" onClick={handleShow}>
        <AddCircleOutlineIcon fontSize='large' />
      </Button>
      <Modal class="theAddMODAL"
        show={show}
        onHide={handleClose}
        style={{
          color: "rgba(106, 209, 175, 0.863)",
        }}
      >
      <div >
        <Modal.Header
          style={{
            backgroundColor: "black",
          }}
          
        >
          <Modal.Title>Add New Link</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "black",
          }}
        >
          <Form className="addModal" onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Link Title</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "black",
                }}
                type="text"
                placeholder="Link Title"
                onInput={(event) => {
                  setName(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                required 
                style={{
                  backgroundColor: "black",
                }}
                type="URL"
                placeholder="https://www.example.com"
                onInput={(event) => {
                  setLink(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" required>
              <Form.Label>Comments</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "black",
                }}
                as="textarea"
                rows={3}
                onInput={(event) => {
                  setComment(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "black",
                }}
                type="text"
                placeholder="Tags"
                onInput={(event) => {
                  setTags(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <div style={{ float: "right" }}>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                style={{ marginLeft: "5px" }}
                variant="success"
                onClick={handleClose}
                type="submit"
              >
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
        </div>
      </Modal>
      
    </>
  );
};
export default CreateLinkForm;
