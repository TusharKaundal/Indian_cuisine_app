import React from 'react';
import { makeStyles, tokens, shorthands } from '@fluentui/react-components';
import { Link } from 'react-router';

const useStyles = makeStyles({
  footer: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: tokens.spacingHorizontalXXL,
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      textAlign: 'center',
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  heading: {
    color: tokens.colorBrandBackground,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
  },
  copyRight: {
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalM,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: tokens.spacingVerticalS,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
  socialIcon: {
    color: tokens.colorNeutralForeground2,
    ':hover': {
      color: tokens.colorBrandForeground1,
    },
  },
});

const Footer = () => {
  const styles = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.heading}>Indian Cuisine</h3>
          <p>Discover the rich and diverse flavors of India's culinary heritage with our authentic recipes and cooking guides.</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.heading}>Quick Links</h3>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/dishes" className={styles.link}>All Dishes</Link>
          <Link to="/suggestor" className={styles.link}>Dish Suggester</Link>
        </div>

        <div className={styles.section}>
          <h3 className={styles.heading}>Contact</h3>
          <a href="mailto:info@indiancuisine.com" className={styles.link}>info@indiancuisine.com</a>
          <a href="tel:+1234567890" className={styles.link}>+1 (234) 567-890</a>
          <p>123 Spice Street<br />Mumbai, India 400001</p>
        </div>
      </div>

      <div className={styles.copyRight}>
        <div>© {currentYear} Indian Cuisine. All rights reserved.</div>
        <div className={styles.socialLinks}>
          <a href="https://facebook.com" className={styles.socialIcon} aria-label="Facebook">
            <i className="ms-Icon ms-Icon--FacebookLogo" />
          </a>
          <a href="https://twitter.com" className={styles.socialIcon} aria-label="Twitter">
            <i className="ms-Icon ms-Icon--TwitterLogo" />
          </a>
          <a href="https://instagram.com" className={styles.socialIcon} aria-label="Instagram">
            <i className="ms-Icon ms-Icon--Instagram" />
          </a>
          <a href="https://pinterest.com" className={styles.socialIcon} aria-label="Pinterest">
            <i className="ms-Icon ms-Icon--PinterestLogo" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
