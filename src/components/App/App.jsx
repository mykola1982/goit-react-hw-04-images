import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { imagesMaper } from '../../utils/imagesmaper';
import { Section } from 'components/Section';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Container } from './App.styled';

import * as API from '../../api/pixabayAPI';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getImages() {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await API.fetchImages(query, page);

        const images = imagesMaper(hits);
        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages(totalHits);

        if (totalHits === 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (page === 1 && totalHits !== 0) {
          toast(`Hooray! We found ${totalHits} images.`);
        }
      } catch (error) {
        setError({ error });
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handelSubmitForm = query => {
    if (query.trim() === '') {
      return toast.error('Enter data to search');
    }
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const handleButtomLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handelSubmitForm} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      <Section>
        {isLoading && <Loader />}
        {images && <ImageGallery images={images} />}

        {images && totalImages - page * 12 > 0 && (
          <Button onClick={handleButtomLoad} />
        )}
      </Section>
      <ToastContainer />
    </Container>
  );
};
