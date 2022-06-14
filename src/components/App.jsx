import React, { Component } from 'react';
// Components
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Title from './Title/Title';
// Scroll
import { animateScroll as Scroll } from 'react-scroll';

// Toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import * as api from 'API/api';

// Styles
import s from './Modal/Modal.module.css';

export class App extends Component {
  state = {
    imageCount: 1,
    category: '',
    imageItems: [],
    error: null,
    status: 'idle',
    showModal: false,
    fullSizeImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { imageCount, category } = this.state;

    const prevCount = prevState.imageCount;
    const prevCategory = prevState.category;
    const newCategory = category;

    if (prevCategory !== newCategory) {
      this.setState({
        status: 'pending',
        imageItems: [],
        imageCount: 1,
      });
      this.fetchData();
    }

    if (imageCount !== prevCount && imageCount !== 1) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { category, imageCount } = this.state;

    try {
      const pictures = await api.getPictures(category, imageCount);

      if (pictures.length === 0) {
        this.setState({ status: 'idle' });
        return toast.warning(`${category} not found`);
      }

      this.setState(prevState => ({
        imageItems: [...prevState.imageItems, ...pictures],
        status: 'resolved',
      }));

      Scroll.scrollToBottom();

      if (imageCount === 1) {
        return toast.success(`Enjoy`);
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      return toast.error(`Whoops something went wrong, please try again later`);
    } finally {
    }
  };

  imageCategory = category => {
    if (this.state.category !== category) {
      this.setState({
        category: category,
        imageCount: 1,
      });
    }
    if (this.state.category === category) {
      return toast.warning(`You already here "${category}"`);
    }
  };

  nextPage = () => {
    this.setState(prevState => ({
      imageCount: prevState.imageCount + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openFullPicture = event => {
    this.toggleModal();
    this.setState({ fullSizeImage: event });
  };

  scrollToBottom = () => {
    Scroll.scrollToBottom();
  };

  render() {
    const { imageCategory, toggleModal, nextPage, openFullPicture } = this;
    const { imageItems, showModal, fullSizeImage, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={imageCategory} />
        <Container>
          {status === 'idle' && <Title />}
          {status === 'rejected' && <Title />}
          {status === 'pending' && <Loader />}

          <ImageGallery imageItems={imageItems} onClick={openFullPicture} />

          {showModal && (
            <Modal onClose={toggleModal}>
              <img
                className={s.modalPicture}
                src={fullSizeImage}
                alt={fullSizeImage.tags}
              />
            </Modal>
          )}

          {imageItems.length > 0 && <Button nextPage={nextPage} />}
        </Container>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
