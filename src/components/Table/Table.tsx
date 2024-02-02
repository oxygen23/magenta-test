import { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectData } from '../../redux/slices/apiSlice';
import { People } from '../../types/People';
import TableRow from '../TableRow/TableRow';
import styles from './Table.module.sass';

const Table: FC = () => {
  const { results, status } = useSelector(selectData);

  return (
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
          && results.map((item: People, index: number) => (
            <TableRow {...item} key={index} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
