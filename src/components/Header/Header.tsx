import {
  ChangeEvent, FC, memo, useEffect, useState,
} from 'react';
import { NavLink } from 'react-router-dom';

import { filter, sort } from '../../redux/slices/apiSlice';
import { useAppDispatch } from '../../redux/store';
import { PayloadUnion } from '../../types/FetchingData';
import Filter from '../Filter/Filter';
import Select from '../Select/Select';
import styles from './Header.module.sass';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<string[]>([]);
  const [sortedBy, setSortedBy] = useState<PayloadUnion>('');

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
    dispatch(sort(sortedBy));
  }, [dispatch, sortedBy]);

  useEffect(() => {
    dispatch(filter(filters));
  }, [filters, dispatch]);

  return (
    <header className={styles.header}>
      <nav className={styles.navigate}>
        <NavLink
          className={({ isActive }) => (isActive
            ? `${styles.navigate__item} ${styles.active}`
            : styles.navigate__item)}
          to="/welcome"
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
        <Select sortFunction={sortFunction} />
        <Filter filteredByMoreArg={filteredByMoreArg} />
      </nav>
    </header>
  );
};

export default memo(Header);
