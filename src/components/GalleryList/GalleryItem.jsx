import PropTypes from 'prop-types';

import { Image, ImageItem } from './GalleryItem.styled';

export const GalleryItem = ({ webformatURL, largeImageURL, getImage }) => {
  return (
    <ImageItem onClick={() => getImage(largeImageURL)}>
      <Image src={webformatURL} alt="photo" />
    </ImageItem>
  );
};

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  getImage: PropTypes.func.isRequired,
};
