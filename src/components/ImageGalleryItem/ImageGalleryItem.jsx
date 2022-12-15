import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowmodal] = useState(false);

  const openModal = () => {
    setShowmodal(true);
  };
  const closeModal = () => {
    setShowmodal(false);
  };

  return (
    <>
      <Item onClick={openModal}>
        <Image src={webformatURL} alt={tags} />
      </Item>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
