import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LEVELS } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';
import { FlashlightOffRounded } from '@mui/icons-material';

const Taskform = ({ add, tasksLength }) => {

	// const nameRef = useRef('');
	// const descriptionRef = useRef('');
	// const levelRef = useRef(LEVELS.NORMAL);

	// function addTask(e){
	// 	e.preventDefault();
	// 	const newTask = new Task(
	// 		nameRef.current.value,
	// 		descriptionRef.current.value,
	// 		false,
	// 		levelRef.current.value
	// 	);
	// 	add(newTask);
	// }

	const normalStyle = {
		color: 'blue',
		fontWeight: 'bold'
	}

	const urgentStyle = {
		color: 'yellow',
		fontWeight: 'bold'
	}

	const blockingStyle = {
		color: 'tomato',
		fontWeight: 'bold'
	}

	function addTask(values){
		const newTask = new Task(
			values.name,
			values.description,
			false,
			values.level
		);
		add(newTask);
	}

	let initialValues = {
		name: '',
		description: '',
		level: LEVELS.NORMAL
	}

	return (
		<div>
			<Formik
			className='d-flex justify-content-center align-items-center mb-4'
			initialValues={initialValues}
			onSubmit={addTask}
			>
			{({ values,
				touched,
				errors,
				inSubmitting,
				handleChange,
				handleBlur }) => (
					<Form className='form-outline flex-fill'>

						<Field
						className='form-control form-control-lg'
						id='name'
						name='name'
						placeholder='Your task name'
						/>
						<Field
						className='form-control form-control-lg'
						id='description'
						name='description'
						placeholder='Your task description'
						/>
						<Field className='form-control form-control-lg' name="level" as="select">
							<option style={normalStyle} value={LEVELS.NORMAL}>
								{LEVELS.NORMAL}
							</option>
							<option style={urgentStyle} value={LEVELS.URGENT}>
								{LEVELS.URGENT}
							</option>
							<option style={blockingStyle} value={LEVELS.BLOCKING}>
								{LEVELS.BLOCKING}
							</option>
						</Field>

						<button type='submit' className='btn btn-success btn-lg ms-3'>
							{ tasksLength > 0 ? 'Add new task' : 'Create your first task'}
						</button>
						{inSubmitting ? (<p>Loginning into your credentials</p>) : null}
					</Form>
				)
			}
			</Formik>

			{/* <form onSubmit={addTask} className='d-flex justify-content-center align-items-center mb-4'>

					<div className='form-outline flex-fill'>
					<input ref={nameRef} id='inputName' type='text' className='form-control form-control-lg' required autoFocus placeholder='Task title' />

					<input ref={descriptionRef} id='descriptionName' type='text' className='form-control form-control-lg' required placeholder='Task description' />

					<select className='form-control form-control-lg' ref={levelRef} defaultValue={LEVELS.NORMAL} id='selectLevel'>
						<option style={normalStyle} value={LEVELS.NORMAL}>
							{LEVELS.NORMAL}
						</option>
						<option style={urgentStyle} value={LEVELS.URGENT}>
							{LEVELS.URGENT}
						</option>
						<option style={blockingStyle} value={LEVELS.BLOCKING}>
							{LEVELS.BLOCKING}
						</option>
					</select>
					<button type='submit' className='btn btn-success btn-lg ms-3'>
					{ tasksLength > 0 ? 'Add new task' : 'Create your first task'}
					</button>
				</div>
			</form> */}
		</div>
	);
}

Taskform.propTypes = {
	tasksLength: PropTypes.number.isRequired
}

export default Taskform;
