import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Table from './pages/TablePage';
import Welcome from './pages/Welcome';
import { fetchDataApi, selectData } from './redux/slices/apiSlice';
import { useAppDispatch } from './redux/store';

const App = () => {
  const dispatch = useAppDispatch();
  const { pageUrl } = useSelector(selectData);
  useEffect(() => {
    const fetchData = () => new Promise((resolve, reject) => {
      dispatch(fetchDataApi())
        .then(resolve)
        .catch(reject);
    });

    fetchData();
  }, [dispatch, pageUrl]);
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
