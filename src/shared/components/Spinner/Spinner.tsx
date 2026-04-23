// src/shared/components/Spinner/Spinner.tsx
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  centered?: boolean;
  message?: string;
}

export const Spinner = ({ size = 'md', color = 'primary', centered = false, message }: SpinnerProps) => {
  const spinnerElement = <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />;

  if (centered) {
    return (
      <div className={styles.pageContainer}>
        {spinnerElement}
        {message && <p style={{ marginTop: '1rem', fontWeight: 500 }}>{message}</p>}
      </div>
    );
  }

  return spinnerElement;
};
