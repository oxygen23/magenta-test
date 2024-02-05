import { FC } from 'react';

import styles from './Welcome.module.sass';

const Welcome: FC = () => (
  <div>
    <b className={styles.title}>На данной странице я хотел бы написать небольшую документацию и руководство по сайту</b>
    <ol className={styles.list}>
      <li className={styles.list__item}>
        Маршрутизация по сайту осуществляется при помощи&nbsp;
        <code className={styles.list__item_mono}>React Router v6</code>
        .
      </li>
      <li className={styles.list__item}>
        На странице&nbsp;
        <code className={styles.list__item_mono}>Table</code>
        &nbsp;можно ознакомиться с основным функционалом страницы. Данные в таблицу подгружаются через&nbsp;
        <code className={styles.list__item_mono}>createAsyncThunk</code>
        &nbsp;в стейт менеджере&nbsp;
        <code className={styles.list__item_mono}>Redux-Toolkit</code>
        , с публичного&nbsp;
        <code className={styles.list__item_mono}>API SWAPI</code>
        . С этим функционалом можно ознакомиться в файле&nbsp;
        <code className={styles.list__item_mono}>src/redux/apiSlice.ts</code>
        , а также вызов этой функции в файле&nbsp;
        <code className={styles.list__item_mono}>src/App.tsx</code>
        .
      </li>
      <li className={styles.list__item}>
        Все данные типизированы. Типы хранятся в папке&nbsp;
        <code className={styles.list__item_mono}>src/types</code>
        .
      </li>
      <li className={styles.list__item}>
        Пагинацию осуществил при помощи функционала
        {' '}
        <code className={styles.list__item_mono}>SWAPI</code>
        {' '}
        и некоторой логики на клиентской части, с этой частсью логики можно ознакомиться в файле
        {' '}
        <code className={styles.list__item_mono}>src/redux/apiSlice.ts</code>
        .
      </li>
      <li className={styles.list__item}>
        Фильтрация и сортировка была полностью реализована, согласно техническому задание, то есть, на стороне клиента, с этой частью логики можно ознакомиться в файле&nbsp;
        <code className={styles.list__item_mono}>src/redux/apiSlice.ts</code>
        .
      </li>
      <li className={styles.list__item}>
        Сортировка работает строго по одному столбцу, а также поддерживается работа в связке с выбранными фильтрами, с этой частью логики можно ознакомиться в файле&nbsp;
        <code className={styles.list__item_mono}>src/redux/apiSlice.ts</code>
        {' '}
        и&nbsp;
        <code className={styles.list__item_mono}>src/components/Header/Header.tsx</code>
        .
      </li>
      <li className={styles.list__item}>
        Стили для страниц и компонентов писал&nbsp;
        <code className={styles.list__item_mono}>модульными</code>
        .
      </li>
      <li className={styles.list__item}>
        На данном приложении был настроен&nbsp;
        <code className={styles.list__item_mono}>Eslint</code>
        {' '}
        и правила для него.
      </li>
      <li className={styles.list__item}>
        Сборка приложения производится через&nbsp;
        <code className={styles.list__item_mono}>Vite</code>
        .
      </li>
    </ol>
  </div>
);

export default Welcome;
