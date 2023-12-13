import React from "react";
import { GoalItem } from "./GoalItem";
import { useState } from "react";
import './common.css';
export function GoalForm({setGoals}) {
    const [inputTitle, setInputTitle] = useState('');
    const [inputDescription, setInputDescription] = useState('');

    const addGoal = async (title: string, description: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({goal: {title: title, description: description}})
        };

        const responseCreate = await fetch(
            `http://54.172.232.89:4000/api/goals/create`,
            requestOptions
        );

        const response = await fetch(
            "http://54.172.232.89:4000/api/goals"
            );
        const responseJson = await response.json();

        setGoals(responseJson);
    }
    
    return (
    <>
        <div className="task-form-container">
            <input value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} type="text" placeholder="Climb the Mount Everest.." />
            <input value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} type="text" placeholder="Preparing to climb the Mount Everest in next 2 years.." />
            <button onClick={() => addGoal(inputTitle, inputDescription)} className="button">
                Add new Goal
            </button>
        </div>
        <hr className="my-12" />
    </>
    );
}