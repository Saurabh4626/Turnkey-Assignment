import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register'
function App() {
    return (
        <div>
            <BrowserRouter>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/dashboard" exact component={Dashboard}/>
            </BrowserRouter>
        </div>
    )
}

export default App
