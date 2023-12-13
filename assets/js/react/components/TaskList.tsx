import { TaskItem } from "./TaskItem";
import React from "react";
import { useState, useEffect } from "react";
import './common.css';
export  function TaskList({tasks, setTasks, goalId}) {

    useEffect(() => {
      const getTaskList = async () => {
        const response = await fetch(
          `http://54.172.232.89:4000/api/goal/tasks/${goalId.toString()}`
        );
        const responseJson = await response.json();
        console.log(responseJson);
        setTasks(responseJson);
      };
      getTaskList();
    }, []);

    const completeItem = async (id: number, description: string) => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id, task: { completed: true}})
        };

        const responseUpdate = await fetch(
            `http://54.172.232.89:4000/api/tasks/${id}`,
            requestOptions
        );

        const response = await fetch(
            "http://54.172.232.89:4000/api/tasks"
          );
        const responseJson = await response.json();
        setTasks(responseJson);
    }

    return (
    <>
    <table className="task-item">
        {tasks?.length > 0 ? (
            tasks.map((task) => <TaskItem completeItem={completeItem} key={task.id} {...task} />)
        ) : (
        <div className="task-list-container">
            <h3>Tasks are loading ...</h3>
        </div>
        )}
    </table>
    </>
    );
}