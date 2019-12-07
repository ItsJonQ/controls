import React, { useState } from 'react';
import { useControlPanel, ControlPanel } from '../src/index';

export default {
	title: 'Controls',
};

const Example = () => {
	const {
		boolean,
		color,
		date,
		number,
		range,
		select,
		text,
		textarea,
	} = useControlPanel();

	const props = {
		text: text('text', 'Hello'),
		color: color('color', 'red'),
		range: range('range', 10, { min: 0, max: 100 }),
		number: number('number', '123321'),
		boolean: boolean('boolean', false),

		select: select(
			'select',
			{
				One: 1,
				Two: 2,
				Three: 3,
				Four: 4,
			},
			1,
		),
		date: date('date', 'December 7, 2019'),
		textarea: textarea('textarea', 'Hello'),
	};

	return (
		<div>
			<p>
				<strong>text</strong>
				<br />
				{props.text}
			</p>
			<p>
				<strong>color</strong>
				<br />
				{props.color}
			</p>
			<p>
				<strong>range</strong>
				<br />
				{props.range}
			</p>
			<p>
				<strong>number</strong>
				<br />
				{props.number}
			</p>
			<p>
				<strong>boolean</strong>
				<br />
				{props.boolean ? 'true' : 'false'}
			</p>
			<p>
				<strong>select</strong>
				<br />
				{props.select}
			</p>
			<p>
				<strong>date</strong>
				<br />
				{props.date}
			</p>
			<p>
				<strong>textarea</strong>
				<br />
				{props.textarea}
			</p>
		</div>
	);
};

const ExampleWrapper = () => {
	const [show, setShow] = useState(true);

	return (
		<>
			<ControlPanel />
			<button onClick={() => setShow(!show)}>Toggle View</button>
			{show ? <Example /> : null}
		</>
	);
};

export const _default = () => <ExampleWrapper />;
