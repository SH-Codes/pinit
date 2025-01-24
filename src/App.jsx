import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm'; 
import RecoveryForm from './RecoveryForm';
// import AddEventForm from './AddEventForm';
// import EventsForm from './EventsForm';
// import Profile from './Profile';
// import NotificationsPage from './NotificationsPage';
// import SettingsPage from './SettingsPage';
// import AboutPage from './AboutPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SigninForm />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/recovery" element={<RecoveryForm />} />
                {/* <Route path="addevent" element={<AddEventForm />} />
                <Route path="/myevents" element={<EventsForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notificationspage" element={<NotificationsPage />} />
                <Route path="/settingspage" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;