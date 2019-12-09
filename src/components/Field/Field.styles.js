import React from 'react';
import { View } from 'styled-view';

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

export function FieldGroup(props) {
	return <View marginBottom={8} {...props} />;
}
