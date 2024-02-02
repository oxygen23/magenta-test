import { FC } from 'react';

import { People } from '../../types/People';
import styles from './TableRow.module.sass';

const TableRow: FC<People> = (data) => {
  const {
    birth_year,
    created,
    edited,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    name,
    skin_color,
  } = data;

  function normalizedDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  return (
    <tr className={styles.row}>
      <td className={styles.row__item}>{name}</td>
      <td className={styles.row__item}>{height}</td>
      <td className={styles.row__item}>{mass}</td>
      <td className={styles.row__item}>{hair_color}</td>
      <td className={styles.row__item}>{skin_color}</td>
      <td className={styles.row__item}>{eye_color}</td>
      <td className={styles.row__item}>{birth_year}</td>
      <td className={styles.row__item}>{gender}</td>
      <td className={styles.row__item}>{normalizedDate(created)}</td>
      <td className={styles.row__item}>{normalizedDate(edited)}</td>
    </tr>
  );
};

export default TableRow;
