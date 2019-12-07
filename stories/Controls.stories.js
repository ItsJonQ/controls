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
	const [value, setValue] = useState(0);

	const props = {
		children: text('text', 'Hello'),
		range: range('range', 10, { min: 0, max: 100 }),
		color: color('color', 'red'),
		date: date('date', 'December 7, 2019'),
		textarea: textarea('textarea', 'Hello'),
		number: number('number', '123321'),
		boolean: boolean('boolean', false),
		select: select(
			'select',
			{
				One: 1,
				Two: 2,
				Three: 3,
			},
			1,
		),
	};

	return (
		<div>
			<ControlPanel />
			<button onClick={() => setValue(value + 1)}>Update</button>
			<br />
			{value}
			<br />
			{props.children}
			{props.color}
			{props.range}
			{props.number}
			{props.boolean}
			{props.select}
		</div>
	);
};

export const _default = () => (
	<>
		<Example />
	</>
);
