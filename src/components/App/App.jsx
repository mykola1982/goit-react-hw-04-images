import { Component } from 'react';
import axios from 'axios';

import { Section } from 'components/Section';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';

import { Container } from './App.styled';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30473634-1b924b529feef7019e04708d2';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const url = `?q=${this.state.query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
      const { data } = await axios.get(url);

      this.setState({ images: data.hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handelSubmitForm = query => {
    this.setState({ query });
  };

  render() {
    const { images, isLoading, error } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handelSubmitForm} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <Section>
          {isLoading > 0 && <Loader />}
          {images && <ImageGallery images={images} />}
        </Section>
      </Container>
    );
  }
}
