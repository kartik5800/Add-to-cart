
import { Provider } from 'react-redux';
// import { Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { Details } from './containers/Details/Details';
import { Home } from './containers/home/Home';
import {Cart} from './containers/Cart/Cart'
import { Login } from './containers/Login/Login';
import { Wishlist } from './containers/Wishlist/Wishlist';
import { configStore } from './Redux/store';
import { Header } from './components/Header';
import { Thanx } from './containers/Thanx';
import PublicRoute from './Route/PublicRoute';
import PrivetRoute from './Route/PrivetRoute';
import { Toaster } from "react-hot-toast";

function App() {
  let { store, persistor } = configStore();
  return (
    <div className="App">
       <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Header/>
          <PublicRoute path={"/"} exact restricted={true} component={Login} />
          <PrivetRoute path={"/home"} exact component={Home} />
          <PrivetRoute path={"/details/:id"} exact component={Details} />
          <PrivetRoute path={"/cart"} exact component={Cart} />
          <PrivetRoute path={"/wishlist"} exact component={Wishlist} />
          <PrivetRoute path={"/thanx"} exact component={Thanx} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
