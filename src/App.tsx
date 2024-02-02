import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Table from './pages/TablePage';
import Welcome from './pages/Welcome';
import { fetchDataApi } from './redux/slices/apiSlice';
import { useAppDispatch } from './redux/store';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = () => new Promise((resolve, reject) => {
      dispatch(fetchDataApi())
        .then(resolve)
        .catch(reject);
    });

    fetchData();
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Welcome />} path="/welcome" />
        <Route element={<Welcome />} path="/" />
        <Route element={<Table />} path="/table" />
      </Routes>
    </>
  );
};

export default App;
