import {
  ChangeEvent, FC,
  useState,
} from 'react';

import styles from './Filter.module.sass';

interface FilterProps {
  filteredByMoreArg: (event: ChangeEvent<HTMLInputElement>) => void
}

const Filter: FC<FilterProps> = ({ filteredByMoreArg }) => {
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.filter__wrapper}>
      <span>Фильтрация</span>
      <div className={styles.filter__popup}>
        <button className={styles.filter__button} onClick={openPopup} type="button" />

        {isOpen && (
          <div className={styles.filter__wrapper_popup}>
            <label className={styles.filter__checkbox_label} htmlFor="male">
              <input className={styles.filter__checkbox} id="male" name="male" onChange={filteredByMoreArg} type="checkbox" />
              Только мужчины
            </label>
            <label className={styles.filter__checkbox_label} htmlFor="female">
              <input className={styles.filter__checkbox} id="female" name="female" onChange={filteredByMoreArg} type="checkbox" />
              Только женщины
            </label>
            <label className={styles.filter__checkbox_label} htmlFor="heightMore100">
              <input className={styles.filter__checkbox} id="heightMore100" name="heightMore100" onChange={filteredByMoreArg} type="checkbox" />
              Рост больше 100
            </label>
            <label className={styles.filter__checkbox_label} htmlFor="heightLess100">
              <input className={styles.filter__checkbox} id="heightLess100" name="heightLess100" onChange={filteredByMoreArg} type="checkbox" />
              Рост меньше 100
            </label>
            <label className={styles.filter__checkbox_label} htmlFor="massMore50">
              <input className={styles.filter__checkbox} id="massMore50" name="massMore50" onChange={filteredByMoreArg} type="checkbox" />
              Вес больше 50
            </label>
            <label className={styles.filter__checkbox_label} htmlFor="massLess50">
              <input className={styles.filter__checkbox} id="massLess50" name="massLess50" onChange={filteredByMoreArg} type="checkbox" />
              Вес меньше 50
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
