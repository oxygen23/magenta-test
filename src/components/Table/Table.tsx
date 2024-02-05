import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changePage, selectData } from '../../redux/slices/apiSlice';
import { useAppDispatch } from '../../redux/store';
import { People } from '../../types/People';
import TableRow from '../TableRow/TableRow';
import styles from './Table.module.sass';

type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

const Table: FC = () => {
  const { data, pageUrl, status } = useSelector(selectData);
  const { next, previous } = data;
  const { results } = data;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const changePageFn: ButtonClickHandler = (event) => {
    const target = event.target as HTMLButtonElement;
    if (target instanceof HTMLButtonElement) {
      const { name } = target;
      dispatch(changePage(name));
    }
  };

  useEffect(() => {
    navigate(`/table/?page=${pageUrl.slice(-1)}`, { replace: true });
  }, [pageUrl, navigate]);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.table__title}>Имя</th>
            <th className={styles.table__title}>Рост</th>
            <th className={styles.table__title}>Вес</th>
            <th className={styles.table__title}>Цвет волос</th>
            <th className={styles.table__title}>Цвет кожи</th>
            <th className={styles.table__title}>Цвет глаз</th>
            <th className={styles.table__title}>Дата рождения</th>
            <th className={styles.table__title}>Пол</th>
            <th className={styles.table__title}>Создан</th>
            <th className={styles.table__title}>Редактирован</th>
          </tr>
        </thead>
        <tbody>
          {status === 'success'
            ? results.map((item: People, index: number) => (
              <TableRow {...item} key={index} />
            )) : 'Загрузка данных...'}
        </tbody>
      </table>
      <p>
        Страница:

      </p>
      <div className={styles.table__buttons}>
        <button
          className={styles.table__buttons_item}
          disabled={!previous}
          name="previous"
          onClick={changePageFn}
          type="button"
        >
          -
        </button>
        <span className={styles.table__buttons_page}>{pageUrl.slice(-1)}</span>
        <button
          className={styles.table__buttons_item}
          disabled={!next}
          name="next"
          onClick={changePageFn}
          type="button"
        >
          +
        </button>
      </div>
    </>
  );
};

export default Table;
