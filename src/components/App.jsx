// import React, { Component } from 'react';
import { useState, useEffect } from 'react';

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

// Toast notificatio  n
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import * as api from 'API/api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [page, setPage] = useState(1);
  const [categoryName, setCategory] = useState('');
  const [imageItems, setImageItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [fullSizeImage, setFullSizeImage] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!categoryName) {
      return;
    }

    setStatus(Status.PENDING);

    const fetchData = async () => {
      try {
        const pictures = await api.getPictures(categoryName, page);

        if (pictures.length === 0) {
          setStatus(Status.IDLE);
          return toast.warning(`${categoryName} not found`);
        }

        setImageItems(prevItems => [...prevItems, ...pictures]);
        setStatus(Status.RESOLVED);
        scrollToBottom();

        if (page === 1) {
          return toast.success(`Enjoy`);
        }
      } catch (error) {
        setStatus(Status.REJECTED);
        return toast.error(
          `Whoops something went wrong, please try again later`
        );
      }
    };
    fetchData();
  }, [page, categoryName]);

  const imageCategory = searchQuery => {
    if (searchQuery !== categoryName) {
      setCategory(searchQuery);
      setImageItems([]);
      setPage(1);
    }

    if (searchQuery === categoryName) {
      return toast.warning(`You already here "${categoryName}"`);
    }
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openFullPicture = event => {
    toggleModal();
    setFullSizeImage(event.largeImageURL);
    setTags(event.tags);
  };

  const scrollToBottom = () => {
    Scroll.scrollToBottom();
  };

  return (
    <>
      <Searchbar onSubmit={imageCategory} />
      <Container>
        {status === Status.IDLE && <Title />}
        {status === Status.REJECTED && <Title />}
        {status === Status.PENDING && <Loader />}

        <ImageGallery imageItems={imageItems} onClick={openFullPicture} />

        {showModal && (
          <Modal
            onClose={toggleModal}
            fullSizeImage={fullSizeImage}
            tags={tags}
          ></Modal>
        )}

        {imageItems.length > 0 && <Button nextPage={nextPage} />}
      </Container>
      <ToastContainer autoClose={3000} />
    </>
  );
};
