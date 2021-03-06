import ReactDOM from 'react-dom';
import './index.css';

import history from './utils/history';
import router from './utils/router';
import routes from './utils/routes';
import axios from 'axios';
const container = document.getElementById('root');

function renderComponent(component) {
  ReactDOM.render(component, container);
}
function render(location) {
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, { ...location, error })
    .then(renderComponent));
}
axios.defaults.baseURL = "/api"
render(history.getCurrentLocation()); // render the current URL
history.listen(render);               // render subsequent URLs

