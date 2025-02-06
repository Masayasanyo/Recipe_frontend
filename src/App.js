import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/styles.module.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Set from './pages/set/Set';
import Recipe from './pages/recipe/Recipe';
import SetEdit from './pages/set_edit/SetEdit';
import PublicList from './pages/public_list/PublicList';
import PublicRecipe from './pages/public_recipe/PublicRecipe';
import Login from './pages/login/Login';
import SignUp from './pages/sign_up/SignUp';
import Account from './pages/account/Account';
import Footer from './components/footer/Footer';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/single' element={<PrivateRoute><Single /></PrivateRoute>} />
            <Route path='/set' element={<PrivateRoute><Set /></PrivateRoute>} />
            <Route path='/recipe' element={<PrivateRoute><Recipe /></PrivateRoute>} />
            <Route path='/set_edit' element={<PrivateRoute><SetEdit /></PrivateRoute>} />
            <Route path='/public_list' element={<PrivateRoute><PublicList /></PrivateRoute>} />
            <Route path='/public_recipe' element={<PrivateRoute><PublicRecipe /></PrivateRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign_up' element={<SignUp />} />
            <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
