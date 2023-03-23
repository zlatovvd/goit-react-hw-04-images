import { useState } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ img, largeImg }) => {

  const [isModal, setIsModal] = useState(false);

  const toogle = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={img}
          alt=""
          className={css.ImageGalleryItemImage}
          onClick={() => toogle()}
        />
      </li>
      {isModal && <Modal img={largeImg} onClose={toogle} />}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
