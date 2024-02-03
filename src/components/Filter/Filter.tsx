import {
  ChangeEvent, FC,
  useState,
} from 'react';

import styles from './Filter.module.sass';

interface FilterProps {
  filteredByMoreArg: (event: ChangeEvent<HTMLInputElement>) => void
  filters: string[]
}

const Filter: FC<FilterProps> = ({ filteredByMoreArg, filters }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
            <label
              className={styles.filter__checkbox_label}
              htmlFor="male"
            >
              <input
                checked={filters.includes('male')}
                className={styles.filter__checkbox}
                id="male"
                name="male"
                onChange={filteredByMoreArg}
                type="checkbox"
              />
              Только мужчины
            </label>
            <label
              className={styles.filter__checkbox_label}
              htmlFor="female"
            >
              <input checked={filters.includes('female')} className={styles.filter__checkbox} id="female" name="female" onChange={filteredByMoreArg} type="checkbox" />
              Только женщины
            </label>
            <label
              className={styles.filter__checkbox_label}
              htmlFor="heightMore100"
            >
              <input
                checked={filters.includes('heightMore100')}
                className={styles.filter__checkbox}
                id="heightMore100"
                name="heightMore100"
                onChange={filteredByMoreArg}
                type="checkbox"
              />
              Рост больше 100
            </label>
            <label
              className={styles.filter__checkbox_label}
              htmlFor="heightLess100"
            >
              <input
                checked={filters.includes('heightLess100')}
                className={styles.filter__checkbox}
                id="heightLess100"
                name="heightLess100"
                onChange={filteredByMoreArg}
                type="checkbox"
              />
              Рост меньше 100
            </label>
            <label
              className={styles.filter__checkbox_label}
              htmlFor="massMore50"
            >
              <input
                checked={filters.includes('massMore50')}
                className={styles.filter__checkbox}
                id="massMore50"
                name="massMore50"
                onChange={filteredByMoreArg}
                type="checkbox"
              />
              Вес больше 50
            </label>
            <label
              className={styles.filter__checkbox_label}
              htmlFor="massLess50"
            >
              <input
                checked={filters.includes('massLess50')}
                className={styles.filter__checkbox}
                id="massLess50"
                name="massLess50"
                onChange={filteredByMoreArg}
                type="checkbox"
              />
              Вес меньше 50
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
