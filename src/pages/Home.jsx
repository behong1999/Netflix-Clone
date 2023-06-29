import React from 'react';
import MainContent from '../components/MainContent';
import requests from '../utils/Request';
import Row from '../components/Row';

const Home = () => {
  return (
    <div>
      <MainContent />
      <Row rowID='1' title='Upcoming' fetchURL={requests.requestUpcoming} />
      <Row rowID='2' title='Popular' fetchURL={requests.requestPopular} />
      <Row rowID='3' title='Top Rated' fetchURL={requests.requestTopRated} />
    </div>
  );
};

export default Home;
