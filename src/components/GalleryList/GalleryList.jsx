import PropTypes from 'prop-types';

import { Component } from 'react';
import { getPictures } from 'services/api';
import { GalleryItem } from './GalleryItem';
import { ImageGallery } from './GalleryList.styled';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { smoothScroll } from 'utils/smoothScroll';
import { Spinner } from 'components/Spinner/Spinner';

export class GalleryList extends Component {
  state = {
    page: 1,
    totalHits: null,
    pictureObjects: [],
    status: 'idle',
    error: null,
    modalImage: null,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchValue;
    const nextSearch = this.props.searchValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.onQueryChange();
    }

    if (
      prevSearch !== nextSearch ||
      (prevPage !== nextPage && nextPage !== 1)
    ) {
      try {
        this.setState({ isLoading: !this.state.isLoading });
        const newImages = await getPictures(nextSearch, nextPage);
        if (newImages.totalHits === 0) {
          this.setState({ status: 'error', isLoading: !this.state.isLoading });
          return;
        }
        this.setState(
          prevState => ({
            pictureObjects: [...prevState.pictureObjects, ...newImages.hits],
            status: 'success',
            isLoading: !this.state.isLoading,
            totalHits: newImages.totalHits,
          }),
          () => {
            if (nextPage !== 1) {
              smoothScroll();
            }
          }
        );
      } catch (error) {
        this.setState({ status: 'error' });
        console.log(error);
      }
    }
  }

  onQueryChange = () =>
    this.setState({ pictureObjects: [], page: 1, totalHits: null });

  getImage = imageUrl => {
    this.setState({ modalImage: imageUrl });
  };

  closeModal = () => this.setState({ modalImage: null });

  loadMore = () => this.setState({ page: this.state.page + 1 });

  render() {
    const { status, pictureObjects } = this.state;
    if (status === 'idle') {
      return (
        <h1 style={{ textAlign: 'center' }}>
          What would you like to see? Fill the form above.
        </h1>
      );
    }
    if (status === 'success') {
      return (
        <>
          <ImageGallery>
            {pictureObjects.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <GalleryItem
                  key={id}
                  largeImageURL={largeImageURL}
                  webformatURL={webformatURL}
                  getImage={this.getImage}
                />
              );
            })}
          </ImageGallery>
          {this.state.isLoading !== true ? (
            <Button loadMore={this.loadMore} />
          ) : (
            <Spinner />
          )}
          {this.state.modalImage !== null && (
            <Modal image={this.state.modalImage} closeModal={this.closeModal} />
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
  }
}

GalleryList.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
