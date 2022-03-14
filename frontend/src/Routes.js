import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/homepage';
import Dashboard from './components/dashboard/dashboard';
import CreationForm from './components/create/createInterview';
import EditForm from './components/edit/editForm';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/new' element={<CreationForm />}></Route>
            <Route path='/edit/:_id' element={<EditForm />}></Route>
        </Routes>
    );
}