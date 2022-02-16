import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class';

// Importamos la hoja de estilos de task.scss
import '../../styles/task.css'
import { LEVELS } from '../../models/levels.enum';


const TaskComponent = ({ task, complete, remove }) => {

	useEffect(() => {
	console.log('Created Task')
		return () => {
			console.log(`Task ${task.name} is going to be removed`)
		}
	}, [task])


	/**
	 * Function that returns a Badge
	 * depending on the level of the task
	 */
	const taskLevelBadge = () => {
		switch (task.level) {
			case LEVELS.NORMAL:
				return(
					<h6 className='mb-0'>
						<span className='badge bg-primary'>
							{ task.level }
						</span>
					</h6>
				)
			case LEVELS.URGENT:
				return(
					<h6 className='mb-0'>
						<span className='badge bg-warning'>
							{ task.level }
						</span>
					</h6>
				)
			case LEVELS.BLOCKING:
				return(
					<h6 className='mb-0'>
						<span className='badge bg-danger'>
							{ task.level }
						</span>
					</h6>
				)
			default:
				break;
		}
	}

	/**
	 * Function that returns an Icon
	 * depending on if the task is or not done
	 */
	const taskIconDone = () => {
		if(task.done){
			return (<i onClick={() => complete(task)} className='bi-toggle-on task-action' style={{color:'green', fontWeight: 'bold'}}></i>)
		} else {
			return (<i onClick={() => complete(task)} className='bi-toggle-off task-action' style={{color:'gray', fontWeight: 'bold'}}></i>)
		}
	}

	return (
		<tr className='fw-normal' id={ task.done ? 'task-done':'task-pending'}>
			<th>
				<span className='ms-2'>
				{ task.name }
				</span>
			</th>
			<td className='align-middle'>
				<span>
					{ task.description }
				</span>
			</td>
			<td className='align-middle'>
				<span>
					{/* Function that returns a badge element works out */}
					{ taskLevelBadge() }
				</span>
			</td>
			<td className='align-middle'>
				<span>
					{/* Function that returns a badge element works out */}
					{ taskIconDone()}
					<i onClick={() => remove(task)} className='bi-trash task-action'
					style={{color:'tomato'}}></i>
				</span>
			</td>
		</tr>
	);
};


TaskComponent.propTypes = {
	task: PropTypes.instanceOf(Task),
	complete: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};


export default TaskComponent;
