import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditForm() {

    const navigate = useNavigate();

    const { _id } = useParams();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [participants, setParticipants] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const getOriginalData = async () => {
        const baseURL = 'http://localhost:5000/';
        try {
            const res = await axios({
                method: 'get',
                url: baseURL + `interview/${_id}`,
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setStartDate(res.data.startDate);
            setEndDate(res.data.endDate);
            setParticipants(res.data.participants);
        } catch (e) {
            console.log(e);
            navigate('/', { state: {} });
        }
    }

    const getAllUsers = async () => {
        const baseURL = 'http://localhost:5000/';
        try {
            const res = await axios({
                method: 'get',
                url: baseURL + 'participant',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setAllUsers(res.data);
        } catch (e) {
            console.log(e);
            navigate('/', { state: {} });
        }
    }

    useEffect(async () => { await getOriginalData(); await getAllUsers() }, []);

    const handleSelectChange = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) value.push(options[i].value);
        }
        setParticipants(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (startDate >= endDate) alert('Start Date/Time must come before End Date/Time');
        else {
            const baseURL = 'http://localhost:5000/';
            let data = { startDate, endDate, participants };
            data = Object.keys(data).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
            }).join('&');
            const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            try {
                const res = await axios({
                    method: 'put',
                    url: baseURL + `interview/${_id}`,
                    crossDomain: true,
                    data,
                    headers
                });
                navigate('/dashboard', { state: {} });
            } catch (e) {
                if (e.response.status === 400) alert(e.response.data.msg);
                console.log(e);
                navigate('/', { state: {} });
            }
        }
    }

    return (
        <div>
            <h1>Edit Interview</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="startTime">Start Date and Time: </label>
                <input type="datetime-local" name="startTime" id="startTime" value={new Date(startDate).toISOString().replace('Z', '')} onChange={(e) => setStartDate(e.target.value)} required />
                <label htmlFor="endTime">End Date and Time: </label>
                <input type="datetime-local" name="endTime" id="endTime" value={new Date(endDate).toISOString().replace('Z', '')} onChange={(e) => setEndDate(e.target.value)} required />
                <label htmlFor="participants">Choose Participants</label>
                <select name="participants" id="participants" multiple onChange={handleSelectChange}>
                    {allUsers.map((item, i) => {
                        if (participants.includes(item._id))
                            return (<option key={i} value={item._id} selected>{item.name}</option>);
                        return (<option key={i} value={item._id}>{item.name}</option>);
                    })}
                </select>
                <button>Submit</button>
            </form>
        </div>
    )
}