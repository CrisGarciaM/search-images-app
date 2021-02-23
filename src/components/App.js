import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

class App extends React.Component {
  state = { images: [], error: '' };

  onSearchSubmit = async (term) => {
    await unsplash
      .get('/search/photos', {
        params: { query: term },
      })
      .then((res) => {
        console.log(res);
        this.setState({ images: res.data.results });
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.setState({ error: errorMessage });
      });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmitProp={this.onSearchSubmit} />
        {this.state.error ? (
          <div style={{ marginBottom: '10px' }}>{this.state.error}</div>
        ) : (
          <div style={{ marginBottom: '10px' }}>
            {this.state.images.length} images found
          </div>
        )}
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
