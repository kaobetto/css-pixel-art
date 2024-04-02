'use client';

import React from 'react';
import Board from './components/board/board';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Intro from './components/intro/intro';
import styles from './page.module.scss';

const Index: React.FC = () => {
  return (
    <>
      <Header></Header>
      <main className={styles['main-content']}>
        <Intro></Intro>
        <Board></Board>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Index;
