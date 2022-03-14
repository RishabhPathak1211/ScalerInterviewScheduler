import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './createInterview.module.css';
import { useNavigate } from 'react-router-dom';

export default function CreationForm() {

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [participants, setParticipants] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

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

    useEffect(async () => await getAllUsers(), []);

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
                    method: 'post',
                    url: baseURL + `interview`,

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
            <h1 className={styles.heading}>Create Interview</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="startTime">Start Date and Time:
                    <input className={styles.input} type="datetime-local" name="startTime" id="startTime" onChange={(e) => setStartDate(e.target.value)} required />
                </label>

                <label className={styles.label} htmlFor="endTime">End Date and Time:
                    <input className={styles.input} type="datetime-local" name="endTime" id="endTime" onChange={(e) => setEndDate(e.target.value)} required />
                </label>

                <label className={styles.label} htmlFor="participants">Choose Participants
                    <select className={styles.option} name="participants" id="participants" multiple onChange={handleSelectChange}>
                        {allUsers.map((item, i) => {
                            return (<option key={i} value={item._id}>{item.name}</option>)
                        })}
                    </select>
                </label>
                <button className={styles.button}>Submit</button>
            </form>
        </div>
    )
}