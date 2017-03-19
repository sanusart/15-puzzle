import React from 'react';
import {Router, Route} from 'react-router';

import Puzzle from './components/Puzzle';
import Board from './components/board/Board';
import NotFound from './components/NotFound';
import HallOfFame from './components/hall-of-fame/hallOfFame';

const Routes = (props) => (
  <Router {...props}>
    <Route component={Puzzle}>
      <Route path="/" component={Board} />
      <Route path="/hall-of-fame" component={HallOfFame}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
export default Routes;
