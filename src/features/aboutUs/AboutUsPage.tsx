import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAboutUs } from './hooks/useAboutUs';
import styles from './styles/aboutUs.module.css';

function AboutUsPage() {
  const navigate = useNavigate();
  const { content, loading, error, fetchContent, updateContent } = useAboutUs();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    if (content) {
      setTitle(content.title || '');
      setSubtitle(content.subtitle || '');
      setDescription(content.description || '');
    }
  }, [content]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateContent({ title, subtitle, description });
      toast.success('About Us content updated successfully!');
      navigate('/admin/pages');
    } catch (err: any) {
      toast.error(err?.message || 'Error updating About Us content');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className="page-header">
          <h1 className="page-header__title">About Us</h1>
          <p className="page-header__subtitle">
            Edit the introductory text and summary displayed on the home page.
          </p>
          <hr className="page-header__divider" />
        </header>

        <div className={styles.pageWrapper}>
          {error && (
            <div className={styles.errorState}>
              <p className={styles.errorText}>{error}</p>
              <button className="btn-primary" onClick={fetchContent}>
                Try again
              </button>
            </div>
          )}

          {!error && (
            <form onSubmit={handleSave} className={styles.formCard}>
              {/* Info Icon */}
              <svg
                className={styles.formCardIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>

              <div className={styles.formCardBody}>
                {loading && !content ? (
                  <>
                    <div className={styles.field}>
                      <div className={styles.skeletonLine} style={{ height: '16px', width: '80px', marginBottom: '8px' }} />
                      <div className={styles.skeletonLine} style={{ height: '38px', width: '100%' }} />
                    </div>
                    <div className={styles.field}>
                      <div className={styles.skeletonLine} style={{ height: '16px', width: '100px', marginBottom: '8px' }} />
                      <div className={styles.skeletonLine} style={{ height: '38px', width: '100%' }} />
                    </div>
                    <div className={styles.field}>
                      <div className={styles.skeletonLine} style={{ height: '16px', width: '110px', marginBottom: '8px' }} />
                      <div className={styles.skeletonLine} style={{ height: '90px', width: '100%' }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="aboutus-title-input">
                        Title
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        id="aboutus-title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isSaving}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="aboutus-subtitle-input">
                        Subtitle
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        id="aboutus-subtitle-input"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        required
                        disabled={isSaving}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="aboutus-description-input">
                        Description
                      </label>
                      <textarea
                        className={`${styles.input} ${styles.textarea}`}
                        id="aboutus-description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        disabled={isSaving}
                      />
                    </div>

                    <button
                      type="submit"
                      className={styles.saveBtn}
                      id="aboutus-save-btn"
                      disabled={isSaving || loading}
                    >
                      {isSaving ? 'Saving...' : 'Save changes'}
                    </button>
                  </>
                )}
              </div>
            </form>
          )}

          <div className={styles.footerActions}>
            <button
              type="button"
              className="btn-secondary"
              id="aboutus-cancel-btn"
              onClick={() => navigate('/admin/pages')}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
