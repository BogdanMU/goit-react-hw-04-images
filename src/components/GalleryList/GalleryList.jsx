import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { getPictures } from 'services/api';
import { GalleryItem } from './GalleryItem';
import { ImageGallery } from './GalleryList.styled';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { smoothScroll } from 'utils/smoothScroll';
import { Spinner } from 'components/Spinner/Spinner';

export const GalleryList = ({ searchValue }) => {
  // state = {
  //   page: 1,
  //   totalHits: null,
  //   pictureObjects: [],
  //   status: 'idle',
  //   error: null,
  //   modalImage: null,
  //   isLoading: false,
  // };

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictureObjects, setPictureObjects] = useState([]);
  const [status, setStatus] = useState('idle');
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuery(searchValue);
    setPage(1);
    setPictureObjects([]);
  }, [searchValue]);

  useEffect(() => {
    async function fetchPictures() {
      try {
        if (query === '') {
          return;
        }

        setIsLoading(i => !i);
        const newImages = await getPictures(query, page);
        if (newImages.totalHits === 0) {
          setStatus('error');
          setIsLoading(i => !i);
          return;
        }

        setPictureObjects(prev => [...prev, ...newImages.hits]);
        setStatus('success');
        setIsLoading(i => !i);
        if (page !== 1) {
          smoothScroll();
        }
      } catch (error) {
        setStatus('error');
        console.log(error);
      }
    }
    fetchPictures();
  }, [query, page]);

  const getImage = imageUrl => {
    setModalImage(imageUrl);
  };

  const closeModal = () => setModalImage(null);

  const loadMore = () => setPage(prev => prev + 1);

  if (status === 'idle') {
    return (
      <h1 style={{ textAlign: 'center' }}>
        What would you like to see? Fill the form above.
      </h1>
    );
  }
  if (pictureObjects.length > 0) {
    return (
      <>
        <ImageGallery>
          {pictureObjects.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <GalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                getImage={getImage}
              />
            );
          })}
        </ImageGallery>
        {isLoading !== true ? <Button loadMore={loadMore} /> : <Spinner />}
        {modalImage !== null && (
          <Modal image={modalImage} onCloseModal={closeModal} />
        )}
      </>
    );
  }
  if (status === 'error') {
    return (
      <h1 style={{ textAlign: 'center' }}>
        No matches found! Try entering something else!
      </h1>
    );
  }
};

GalleryList.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
