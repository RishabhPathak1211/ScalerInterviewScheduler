import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';
import axios from 'axios';

import moment from 'moment';

export default function Dashboard(props) {
    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const getInterviews = async () => {
        const baseURL = 'http://localhost:5000/';
        try {
            const res = await axios({
                method: 'get',
                url: baseURL + 'interview',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setInterviews(res.data);
        } catch (e) {
            console.log(e);
            navigate('/', { state: {} });
        }
    }

    useEffect(async () => await getInterviews(), []);

    return (
        <div>
            <div>
                <h2 className={styles.heading}>Interview List</h2>
                {interviews.map((item) => {
                    return <Cards interview={item} />
                })}
            </div>
            <Link to='/'>
                {/* <button>Home</button> */}
            </Link>
        </div>

    )
}

const Cards = (props) => {
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    useEffect(() => {
        let tempTime = moment(props.interview.startDate).format("dddd, MMMM Do YYYY h:mm a")
        setStartTime(tempTime);
        tempTime = moment(props.interview.endDate).format("dddd, MMMM Do YYYY h:mm a")
        setEndTime(tempTime)
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <h3>Starts: {startTime}</h3>
                <h3>Ends: {endTime}</h3>
                <div>
                    <h3>Participants</h3>
                    {
                        props.interview.participants.map((item) => {
                            return (
                                <div className={styles.list}>
                                    <p>{item.name} | {item.email} | {item.phone}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to={`/edit/${props.interview._id}`}>
                    <button className={styles.button}>Edit</button>
                </Link>

            </div>
        </div>
    );
}