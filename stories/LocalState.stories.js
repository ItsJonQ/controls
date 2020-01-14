import React, { useState } from 'react';
import { useControls, Controls, updateFields } from '../src/index';

export default {
	title: 'LocalState',
};

const SubComponent = ({ value }) => {
	return <span>{value ? 'Yes' : 'No'}</span>;
};

const This = () => <span>This</span>;
const That = () => <span>That</span>;

const Example = props => {
	const [state, setState] = useState(0);
	const {
		boolean,
		color,
		date,
		number,
		range,
		select,
		text,
		textarea,
		attributes,
	} = useControls();

	text('text', 'Hello');
	color('color', 'red');
	range('range', 10, { min: 0, max: 20 });
	number('number', '123321');
	boolean('boolean', props.boolean || false);

	select(
		'select',
		{
			One: 1,
			Two: 2,
			Three: 3,
			Four: 4,
		},
		1,
	);
	date('date', 'December 7, 2019');
	textarea('textarea', 'Hello');

	const showThis = attributes.boolean;
	const showThat = !showThis;

	const handleOnUpdate = () => {
		setState(state + 1);
		updateFields({
			text: 'Hallo There!',
			color: 'blue',
		});
	};

	return (
		<div>
			<button onClick={handleOnUpdate}>Override Field Values</button>
			<br />
			<p>
				<strong>text</strong>
				<br />
				{attributes.text}
			</p>
			<p>
				<strong>color</strong>
				<br />
				{attributes.color}
			</p>
			<p>
				<strong>range</strong>
				<br />
				{attributes.range}
			</p>
			<p>
				<strong>number</strong>
				<br />
				{attributes.number}
			</p>
			<p>
				<strong>boolean</strong>
				<br />
				<SubComponent value={attributes.boolean} />
				{showThis && <This />}
				{showThat && <That />}
			</p>
			<p>
				<strong>select</strong>
				<br />
				{attributes.select}
			</p>
			<p>
				<strong>date</strong>
				<br />
				{attributes.date}
			</p>
			<p>
				<strong>textarea</strong>
				<br />
				{attributes.textarea}
			</p>
		</div>
	);
};

const ExampleWrapper = () => {
	const [show, setShow] = useState(true);

	return (
		<>
			<Controls />
			<button onClick={() => setShow(!show)}>Toggle View</button>
			<hr />
			{show ? <Example boolean={true} /> : null}
		</>
	);
};

export const _default = () => <ExampleWrapper />;
