import React from 'react';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Section } from 'components/Section';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Container } from './App.styled';

import * as API from '../../api/pixabayAPI';

export class App extends Component {
  state = {
    images: null,
    query: '',
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ isLoading: true, images: null });
      // скидаємо картинки при новому пошуку як зробити щоб не скидались при лоад не знаю ще images: null

      try {
        const { hits, totalHits } = await API.fetchImages(this.state.query);
        this.setState({ images: hits });

        if (totalHits === 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          toast(`Hooray! We found ${totalHits} images.`);
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handelSubmitForm = query => {
    if (query.trim() === '') {
      return toast.error('Enter data to search');
    }

    this.setState({ images: [], page: 1, query });
  };

  render() {
    const { images, isLoading, error } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handelSubmitForm} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <Section>
          {isLoading && <Loader />}
          {images && <ImageGallery images={images} />}

          <Button />
        </Section>
        <ToastContainer />
      </Container>
    );
  }
}
