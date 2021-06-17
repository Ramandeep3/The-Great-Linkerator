import React, { useState } from "react";
// npm install react-bootstrap bootstrap@5.0.1 needed for form and modal
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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

  const onFormSubmit = (event) => {
    event.preventDefault();
    createNewLinks([name, link, comment, tags]);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Link
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          color: "rgba(106, 209, 175, 0.863)",
        }}
      >
        <Modal.Header
          style={{
            backgroundColor: "rgba(131, 132, 133)",
          }}
          closeButton
        >
          <Modal.Title>Add New Link</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            backgroundColor: "rgba(131, 132, 133)",
          }}
        >
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Link Title</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "rgba(131, 132, 133)",
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
                style={{
                  backgroundColor: "rgba(131, 132, 133)",
                }}
                type="URL"
                placeholder="https://www.example.com"
                onInput={(event) => {
                  setLink(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "rgba(131, 132, 133)",
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
                  backgroundColor: "rgba(131, 132, 133)",
                }}
                type="text"
                placeholder="Tags"
                onInput={(event) => {
                  setTags(event.target.value);
                }}
              />
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
      </Modal>
    </>
  );
};
export default CreateLinkForm;
