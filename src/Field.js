import React, { useState } from 'react';
import { View } from '@itsjonq/elm';
import { createUniqueIdFactory } from './utils';

const fieldId = createUniqueIdFactory('Field');

function createBaseHandleOnChange(onChange) {
	return event => {
		onChange && onChange(event.target.value);
	};
}

export function Label(props) {
	const { children, label, ...restProps } = props;
	return (
		<View as="label" {...restProps}>
			<View fontSize="0.9em" marginBottom={2} opacity={0.6}>
				{label}
			</View>
			{children}
		</View>
	);
}

export function BaseInputField(props) {
	return (
		<View
			as="input"
			autoComplete="off"
			backgroundColor="transparent"
			border="1px solid var(--controlPanelBorderColor)"
			color="inherit"
			display="block"
			fontFamily="inherit"
			fontSize="inherit"
			padding={2}
			type="text"
			width="100%"
			{...props}
		/>
	);
}

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
	return <TextField {...props} type="color" padding={0} width={50} />;
}

export function DateField(props) {
	return <TextField {...props} type="date" />;
}

export function NumberField(props) {
	return <TextField {...props} />;
}

export function RangeField(props) {
	const { options, ...restProps } = props;
	return <TextField {...restProps} type="range" />;
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

const FieldComponents = {
	boolean: BooleanField,
	color: ColorField,
	date: DateField,
	number: NumberField,
	select: SelectField,
	range: RangeField,
	text: TextField,
	textarea: TextAreaField,
};

export function Field(props) {
	const [id] = useState(fieldId());
	const { prop, type, ...restProps } = props;
	const Component = FieldComponents[type];

	if (!Component) return null;

	return (
		<View marginBottom={8}>
			<Label label={prop} htmlFor={id} />
			<Component {...restProps} id={id} />
		</View>
	);
}
