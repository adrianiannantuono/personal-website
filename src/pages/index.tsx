import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <img className={styles.mainImg} src="https://github.com/adrianiannantuono.png" alt="Place image title"/>
            </div>
          </div>
          <div className={clsx('col col--8')}>
            <div className="text--left">
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div>
                <Button variant="contained" color="inherit" href="/about">
                  About Me
                </Button>
                <IconButton aria-label="Email" color="inherit" href="mailto:aiannantuono@me.com">
                  <EmailIcon />
                </IconButton>
                <IconButton aria-label="GitHub" color="inherit" href="https://github.com/adrianiannantuono" target="_blank">
                  <GitHubIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn" color="inherit" href="https://linkedin.com/in/adrianiannantuono" target="_blank">
                  <LinkedIn />
                </IconButton>
                <Link href="/resources/2022_Resume.pdf" target="_blank" underline="hover" color="inherit">
                  {'Resume (PDF)'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={'Home'}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
