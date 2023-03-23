import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ gallery }) => (
  <ul className={css.ImageGallery}>
    {gallery.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        img={webformatURL}
        largeImg={largeImageURL}
      />
    ))}
  </ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
