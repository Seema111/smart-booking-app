/* eslint-disable react/prop-types */
import React from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

/**
 * @description Creates a customizable modal component for displaying information and
 * including interactive features like navigation to other pages.
 * 
 * @param { string } title - title of the modal, which is displayed above the image
 * in the Modal body.
 * 
 * @param { object } imgSrc - source of an image that is displayed inside the modal
 * window.
 * 
 * @param { string } message - text that will be displayed beneath the image in the
 * modal window.
 * 
 * @param { boolean } showModal - visibility of the modal window, with a value of
 * `true` showing the modal and a value of `false` hiding it.
 * 
 * @param { `OnHideFunction` (a reference to a function that can be called when the
 * Modal is hidden or closed). } handleClose - function to call when the modal is closed.
 * 
 * 	* `showModal`: The show status of the modal, whether it is shown or hidden.
 * 	* `onHide`: An event handler for when the user hides the modal.
 * 
 * @returns { Element` or more specifically a `Modal } a Modal component that displays
 * the specified title, image, message, and button for navigating to a different page.
 * 
 * 	* `show`: A boolean property that indicates whether the modal is currently shown
 * or not.
 * 	* `onHide`: A callback function that is triggered when the user closes the modal.
 * 	* `size`: An enumeration property that specifies the size of the modal. In this
 * case, it is set to "lg".
 * 	* `backdrop`: An enumeration property that specifies whether the modal background
 * should be static or not. In this case, it is set to "static".
 * 	* `aria-labelledby`: An ID property that specifies the ARIA label for the modal
 * header.
 * 	* `centered`: An enumeration property that specifies whether the modal should be
 * centered horizontally and vertically.
 * 
 * 	The `Modal` component returned by the function is composed of several properties
 * and attributes:
 * 
 * 	* `ModalBody`: A component that contains the contents of the modal body.
 * 	* `ModalHeader`: A component that contains the contents of the modal header.
 * 	* `ModalTitle`: An element with the ID "contained-modal-title-vcenter" that
 * displays the title of the modal.
 * 	* `backdrop`: The same property as before, specifying whether the background of
 * the modal should be static or not.
 * 
 * 	The `Button` component is also included in the output, with the following properties:
 * 
 * 	* `variant`: A string property that specifies the type of button (in this case,
 * "success").
 * 	* `mt-3`: An integer property that specifies the margin top value for the button.
 * 	* `btn-lg`: An enumeration property that specifies whether the button should be
 * large or not.
 */

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
        /**
         * @description Navigates to `/my-appointments`.
         * 
         * @param { string } variant - 3D button variant, which determines the appearance and
         * feel of the button when clicked.
         * 
         * @param { JavaScript Function. } onClick - action that will be performed when the
         * button is clicked, in this case navigating to the "My Appointments" page.
         * 
         * 	* `variant`: This property sets the variant of the button. In this case, it is
         * set to `success`, which indicates that the button has a positive or successful connotation.
         * 	* `mt-3`: This property adds margin to the top of the button. The `mt-3` value
         * represents a margin of 3 units (default unit is `em`).
         * 	* `btn-lg`: This property sets the size of the button to large (`lg`). This means
         * that the button will have more vertical space than a small or medium-sized button.
         */
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
