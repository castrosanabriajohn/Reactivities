import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Modal } from "semantic-ui-react";

const ModalContainer = () => {
  const {
    modalStore: {
      closeModal,
      modal: { open, body },
    },
  } = useStore();
  return (
    <Modal open={open} onClose={closeModal} size="mini">
      {body}
    </Modal>
  );
};

export default observer(ModalContainer);
