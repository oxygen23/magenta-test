import {
  ChangeEvent, FC, memo, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { filter, selectData, sort } from '../../redux/slices/apiSlice';
import { useAppDispatch } from '../../redux/store';
import { PayloadUnion } from '../../types/FetchingData';
import Filter from '../Filter/Filter';
import Select from '../Select/Select';
import styles from './Header.module.sass';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<string[]>([]);
  const [sortedBy, setSortedBy] = useState<PayloadUnion>('');

  const { pageUrl, status } = useSelector(selectData);

  const location = useLocation();
  const { pathname } = location;

  const sortFunction = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortedBy((event.target.value as PayloadUnion));
  };

  const filteredByMoreArg = (e: ChangeEvent<HTMLInputElement>) => {
    if (filters.includes(e.target.name)) {
      setFilters(filters.filter((item) => item !== e.target.name));
    } else {
      setFilters([...filters, e.target.name]);
    }
  };

  useEffect(() => {
    if (status === 'success') {
      dispatch(sort(sortedBy));
    }
  }, [dispatch, sortedBy, pageUrl, status]);

  useEffect(() => {
    if (status === 'success') {
      dispatch(filter(filters));
    }
  }, [filters, dispatch, pageUrl, status]);

  return (
    <header className={styles.header}>
      <nav className={styles.navigate}>
        <NavLink
          className={({ isActive }) => (isActive
            ? `${styles.navigate__item} ${styles.active}`
            : styles.navigate__item)}
          to={pathname === '/' ? '/' : '/welcome'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive
            ? `${styles.navigate__item} ${styles.active}`
            : styles.navigate__item)}
          to="/table"
        >
          Table
        </NavLink>
        {pathname.startsWith('/table/') && (
        <>
          <Select sortFunction={sortFunction} />
          <Filter filteredByMoreArg={filteredByMoreArg} filters={filters} />
        </>
        )}
      </nav>
    </header>
  );
};

export default memo(Header);
