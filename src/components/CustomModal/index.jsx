/* eslint-disable react/prop-types */
import React from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

function CustomModal({ title, imgSrc, message, showModal, handleClose }) {
  const navigate = useNavigate();
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center mb-5">
        <Modal.Header closeButton className="modal-header-no-border">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <h2 className="mt-3">{title}</h2>
        <Image src={imgSrc} rounded height={300} />
        <h5 className="px-5">{message}</h5>
        <Button
          variant="success mt-3 btn-lg"
          onClick={() => navigate("/my-appointments")}
        >
          View Your Appointments!
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;
