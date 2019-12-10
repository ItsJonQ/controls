import React from 'react';

import { ColorPicker } from '../ColorPicker';
import { BaseInputField } from './Field.styles';

export const FieldVariants = {
	boolean: BooleanField,
	color: ColorField,
	date: DateField,
	number: NumberField,
	select: SelectField,
	range: RangeField,
	text: TextField,
	textarea: TextAreaField,
};

export function BooleanField(props) {
	const { value, onChange } = props;

	const handleOnChange = event => {
		onChange && onChange(event.target.checked);
	};

	return (
		<BaseInputField
			{...props}
			type="checkbox"
			checked={value}
			onChange={handleOnChange}
			padding={0}
			margin={0}
		/>
	);
}

export function ColorField(props) {
	return <ColorPicker {...props} />;
}

export function DateField(props) {
	return <TextField {...props} type="date" />;
}

export function NumberField(props) {
	return <TextField {...props} />;
}

export function RangeField(props) {
	const { options, ...restProps } = props;
	return <TextField {...restProps} {...options} type="range" />;
}

export function SelectField(props) {
	const { options, onChange, ...restProps } = props;
	const handleOnChange = createBaseHandleOnChange(onChange);

	const items = Object.keys(options).reduce((collection, key) => {
		return [...collection, { label: key, key, value: options[key] }];
	}, []);

	return (
		<BaseInputField as="select" {...restProps} onChange={handleOnChange}>
			{items.map(item => (
				<option {...item} />
			))}
		</BaseInputField>
	);
}

export function TextField(props) {
	const { onChange } = props;
	const handleOnChange = createBaseHandleOnChange(onChange);

	return <BaseInputField {...props} onChange={handleOnChange} />;
}

export function TextAreaField(props) {
	return (
		<TextField
			{...props}
			as="textarea"
			resize="vertical"
			minHeight={19}
			rows={3}
		/>
	);
}

function createBaseHandleOnChange(onChange) {
	return event => {
		onChange && onChange(event.target.value);
	};
}
