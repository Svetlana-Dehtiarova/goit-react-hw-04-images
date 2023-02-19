import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            largeImageURL={largeImageURL}
            smallImg={webformatURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ),
  onClick: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string,
};
