import React from 'react';
import Home from '../Home';
import Game from '../Game';
// import FourOhFour from '../FourOhFour';

const routes = [
  { path: '/', action: () => <Home /> },
  { path: '/games/:id', id: 'foo', action: (params) => <Game {...params}/> }
];

export default routes