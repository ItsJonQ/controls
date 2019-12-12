import React, { useState } from 'react';
import { useControls, Controls } from '../src/index';

export default {
	title: 'LocalState',
};

const SubComponent = ({ value }) => {
	return <div>{value ? 'Yes' : 'No'}</div>;
};

const This = () => <div>This</div>;
const That = () => <div>That</div>;

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

	return (
		<div>
			<button onClick={() => setState(state + 1)}>Re-Render View</button>
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
