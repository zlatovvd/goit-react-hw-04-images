import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { getGallery } from 'services/galleryApi';
import css from './App.module.css';

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onSubmit = searchStr => {
    if (searchStr === search) {
      return;
    }
    setSearch(searchStr);
    setPage(1);
    setGallery([]);
  };

  const onClickMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  const loadGallery = async (search, page) => {
    setStatus('pending');
    try {
      const gallery = await getGallery(search, page);
      if (gallery.data.total === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      setGallery(prevState => [...prevState, ...gallery.data.hits]);
      setStatus('success');
      return gallery.data.hits;
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (search) {
      loadGallery(search, page);
    }
  }, [page, search]);

  return (
    <div
      className={css.App}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={onSubmit} />

      {gallery.length > 0 && <ImageGallery gallery={gallery} />}

      {status === 'pending' && (
        <div className={css.wrapper}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}

      {status === 'success' && (
        <div className={css.wrapper}>
          <Button onClick={onClickMoreBtn} />
        </div>
      )}

      {status === 'error' && <h1>{error}</h1>}
    </div>
  );
};

export { App };
