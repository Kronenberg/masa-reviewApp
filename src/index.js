import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import store from './store/store';

const MasaReviewApp = () => {
	return (
	<Provider store={store}>
    	<BrowserRouter>
    	<App />
    	</BrowserRouter>
 	</Provider>)
}

ReactDOM.render(<MasaReviewApp />, document.getElementById('root'));



