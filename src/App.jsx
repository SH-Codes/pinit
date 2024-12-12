// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SigninForm from './SigninForm';
// import SignupForm from './SignupForm';
// import RecoveryForm from './RecoveryForm';
// import AddEventForm from './AddEventForm';
import EventsForm from './EventsForm';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EventsForm />} />
                {/* <Route path="/signin" element={<SigninForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/recovery" element={<RecoveryForm />} />
                <Route path="addevent" element={<AddEventForm />} /> */}
                <Route path="myevents" element={<EventsForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;