import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';

//PrivateRoutes folder
import AdminRoute from './PrivateRoutes/AdminRoute';
import PrivateRoute from './PrivateRoutes/PrivateRoute';

//AdminDashboard folder
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateCategory from './components/AdminDashboard/CreateCategory';
import CreateProduct from './components/AdminDashboard/CreateProduct';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          {/* User Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={UserDashboard}
          />
          {/* Admin Routes */}
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path="/create/category"
            component={CreateCategory}
          />
          <AdminRoute exact path="/create/product" component={CreateProduct} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
