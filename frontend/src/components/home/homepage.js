import React, { useState } from 'react';
import styles from './homepage.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className={styles.main}>
            <h1 className={styles.heading}>Welcome Admin!</h1>
            <div className={styles.btns}>
                <Link to='/dashboard'>
                    <button className={styles.btn1}>View Scheduled Interviews</button>
                </Link>
                <Link to='/new'>
                    <button className={styles.btn2}>Create New Interview</button>
                </Link>
            </div>
        </div>
    )
}