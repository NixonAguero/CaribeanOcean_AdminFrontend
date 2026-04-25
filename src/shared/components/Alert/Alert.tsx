// src/shared/components/Alert/Alert.tsx
import styles from './Alert.module.css';

interface AlertProps {
  type: 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const Alert = ({ type, title, children }: AlertProps) => {
  if (!children) return null;

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {title && <h4 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>{title}</h4>}
      <div style={{ margin: 0 }}>{children}</div>
    </div>
  );
};
