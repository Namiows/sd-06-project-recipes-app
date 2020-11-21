import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreFoods(props) {
  const { title } = props;
  return (
    <div>
      <Header title={ title } />
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  title: PropTypes.string.isRequired,
};
