import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/store';

const MasaReviewApp = () => {
	return (
	<Provider store={store}>
    	<App />
 	</Provider>)
}




ReactDOM.render((
	<BrowserRouter>
		<MasaReviewApp />
	</BrowserRouter>	
	), 
	document.getElementById('root'));
registerServiceWorker();
