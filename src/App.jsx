import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import RecoveryForm from './RecoveryForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SigninForm />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/recovery" element={<RecoveryForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
