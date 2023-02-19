import { useState, useEffect } from 'react';
import s from './App.module.css';
import Searchbar from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { imagesApi } from '../../services/API.js';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from '../Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') return;

    const fetchImages = () => {
      const options = { currentPage, searchQuery };
      setLoading(true);
      setError(null);
      imagesApi(options)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            return Notify.warning(
              'Результат поиска зависит от качества запроса. Давайте попробуем еще раз :)'
            );
          }

          if (totalHits === 0) {
            return Notify.info('Пока-что это всё, что удалось найти...');
          }

          const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });
          setImages(prevImages => [...prevImages, ...newImages]);
          setTotal(totalHits);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    };
    fetchImages();
  }, [currentPage, searchQuery]);

  const handleFormSubmit = query => {
    if (query === searchQuery) {
      Notify.info('Enter new query, please.');
    }
    setImages([]);
    setSearchQuery(query);
    setCurrentPage(1);
    setTotal(0);
    setError(null);
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  const closeModal = () => {
    setLargeImageURL(null);
    toggleModal();
  };
  return (
    <div className={s.App}>
      {error && Notify.failure('Sorry, there is some error')}
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onClick={openModal} />
      )}

      {loading && <Loader />}

      {images.length > 0 && !loading && images.length !== total && (
        <Button onLoadMore={loadMore} />
      )}
      {showModal && (
        <Modal closeModal={closeModal} largeImage={largeImageURL} />
      )}
    </div>
  );
};

export default App;
