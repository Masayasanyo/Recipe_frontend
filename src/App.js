import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import styles from './styles/styles.module.css';
import Header from './components/header/Header.jsx';
import Home from './pages/home/Home.jsx';
import Single from './pages/single/Single.jsx';
import Set from './pages/set/Set.jsx';
import Recipe from './pages/recipe/Recipe.jsx';
import SetEdit from './pages/set_edit/SetEdit.jsx';
import PublicList from './pages/public_list/PublicList.jsx';
import PublicRecipe from './pages/public_recipe/PublicRecipe.jsx';
import Login from './pages/login/Login.jsx';
import SignUp from './pages/sign_up/SignUp.jsx';
import Account from './pages/account/Account.jsx';
import Footer from './components/footer/Footer.jsx';
import AuthProvider from './context/AuthContext.js';
import PrivateRoute from './context/PrivateRoute.jsx';
import AddRecipe from './pages/add_recipe/AddRecipe.jsx';
import RecipeEdit from './pages/recipe_edit/RecipeEdit.jsx';
import SetView from './pages/set_view/SetView.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.App}>
          <Header/>
          <Routes>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/single' element={<PrivateRoute><Single /></PrivateRoute>} />
            <Route path='/set' element={<PrivateRoute><Set /></PrivateRoute>} />
            <Route path='/recipe' element={<PrivateRoute><Recipe /></PrivateRoute>} />
            <Route path='/recipe_edit' element={<PrivateRoute><RecipeEdit /></PrivateRoute>} />
            <Route path='/add_recipe' element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
            <Route path='/set_view' element={<PrivateRoute><SetView /></PrivateRoute>} />
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
