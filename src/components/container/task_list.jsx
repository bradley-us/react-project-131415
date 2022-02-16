import React, { useState, useEffect } from 'react';
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enum';
import TaskComponent from '../pure/task';
import Taskform from '../pure/forms/taskForm';

// Importamos la hoja de estilos de task.scss
import '../../styles/task.css'


const TaskListComponent = () => {

	const defaultTask = new Task('Example', 'Default Description', true, LEVELS.NORMAL);
	const defaultTask2 = new Task('Example2', 'Default Description 2', false, LEVELS.URGENT);
	const defaultTask3 = new Task('Example3', 'Default Description 2', false, LEVELS.BLOCKING);

	// Estado del componente
	const [tasks, setTasks] = useState([defaultTask, defaultTask2, defaultTask3])
	const [loading, setLoading] = useState(true)

	//Control el ciclo de vida del componente
	useEffect(() => {
		console.log('Tasks State have been modified')

		setTimeout(() => {
			setLoading(false)
		}, 1000)

		return () => {
			console.log('TasksList Will Unmount')
		}
	}, [tasks])


	function doneTask(task){
		console.log('Complete this Task: ', task)
		const index = tasks.indexOf(task);
		const tempTasks = [...tasks];
		tempTasks[index].done = !tempTasks[index].done;
		// We update the state of the component and it will update the iteration
		// of the tasks in order to show the task updated
		setTasks(tempTasks);
	}

	function removeTask(task){
		console.log('removed the task: ', task)
		const index = tasks.indexOf(task);
		const tempTasks = [...tasks];
		tempTasks.splice(index,1);
		setTasks(tempTasks);
	}

	function addTask(task){
		console.log('Task added: ', task);
		const index = tasks.indexOf(task);
		const tempTasks = [...tasks];
		tempTasks.push(task);
		setTasks(tempTasks);
	}

	const Table = () => {
		return (
							<table>
								<thead>
									<tr>
										<th scope='col'>Title</th>
										<th scope='col'>Description</th>
										<th scope='col'>Priority</th>
										<th scope='col'>Action</th>
									</tr>
								</thead>
								<tbody>
									{/* TODO: Iterar sobre una lista de tareas */}
									{tasks.map((task, index) => {
											return (
												<TaskComponent
												key={index}
												task={task}
												complete={doneTask}
												remove={removeTask}>
												</TaskComponent>
											)
										}
									)}
								</tbody>
							</table>
		);
	}

	let tasksTable;

	if(tasks.length > 0){
		tasksTable = <Table></Table>
	} else {
		tasksTable = (
			<div>
				<h3>There are no tasks to show</h3>
				<h4>Please, create one</h4>
			</div>
		)
	}

	const loadingStyle = {
		width: '3rem',
		height: '3rem',
		margin: '0 150px'
	}

	return (
		<div>
			<div className='col-12'>
				
				<div className='card'>
					{/* Card Header (title) */}
					<div className='card-header p-3'>
						<h5>Your Tasks</h5>
					</div>

					{/* Card Body (content) */}
					<div className='card-body' data-mdb-perfect-scrollbar='true' style={ {position: 'relative', height: '400px'} }>
						{ loading ? (
							<div className="spinner-grow" style={loadingStyle} role='status'>
							</div>
							) : tasksTable }
					</div>
					<Taskform add={addTask} tasksLength={tasks.length}></Taskform>
				</div>
			</div>
		</div>
	);
};


export default TaskListComponent;
