import { Component } from 'react';
import "./styles.scss"

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import fetchImages from "./services/images-api";
import Searchbar from "./Components/Searchbar/";
import ImageGallery from "./Components/ImageGallery";
import Button from './Components/Button/Button';
import Modal from "./Components/Modal";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImgSrc: '',
    largeImgAlt: '',
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.uploadGallery();
    }
    if (this.state.currentPage > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    })
    
  }

  uploadGallery = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });
          
    fetchImages(options)
      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...res],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({error}))
      .finally(() => this.setState({isLoading: false}))
  
  }

  openModal = (event) => {
    this.setState({
      showModal: true,
      largeImgSrc: event.target.dataset.source,
      largeImgAlt:event.target.alt,
    })
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }))
  }
  

  render() {
    return (
      <>
        {this.state.showModal && 
          <Modal
            src={this.state.largeImgSrc}
            // alt={this.state.largeImgAlt}
            handleModal={this.toggleModal}
        />}
        <Searchbar
          onSubmit={this.onChangeQuery} />
        {this.state.error &&
          <h1 className="Error">There are no pictures found using this keyword. Please try another one.</h1>}
        <ImageGallery
          onClick={this.openModal}
          images={this.state.images} />
        {this.state.isLoading &&
          <Loader
            className="Loader"
            type="Ball-Triangle"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />}
        {this.state.images.length > 0 &&
        !this.state.isLoading &&
          <Button
            onClick={this.uploadGallery}
        />}
      </>
    )
  }
}

export default App;
