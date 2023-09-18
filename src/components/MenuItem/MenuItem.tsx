import React, { ChangeEvent } from 'react';
import styles from './MenuItem.module.scss';

type TMenuItemProps = {
  text: string;
  onChange: (number: number) => void;
  value: number;
};

const MenuItem: React.FC<TMenuItemProps> = ({ text, onChange, value }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      onChange(0);
      return;
    }
    if (isNaN(+event.target.value) || +event.target.value < 0) return;
    onChange(+event.target.value);
  };

  return (
    <div className={styles.menuItem}>
      <div className={styles.title}>{text}</div>
      <input
        className={styles.input}
        type={'number'}
        onChange={handleChange}
        value={value.toString()}
      />
    </div>
  );
};

export default MenuItem;
