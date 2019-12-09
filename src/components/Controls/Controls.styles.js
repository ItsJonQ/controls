import React from 'react';
import { View } from 'styled-view';

export function Wrapper(props) {
	const { isDark, style: styleProp = {} } = props;

	const backgroundColor = isDark ? 'black' : 'white';
	const borderColor = isDark ? 'white' : 'black';

	const componentStyles = {
		...styleProp,
		'--controlPanelBackgroundColor': backgroundColor,
		'--controlPanelBorderColor': borderColor,
	};

	const styleProps = {
		fontFamily: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
		border: '2px solid',
		backgroundColor: 'var(--controlPanelBackgroundColor)',
		borderColor: 'var(--controlPanelBorderColor)',
		color: 'var(--controlPanelBorderColor)',
		fontSize: 11,
		position: 'fixed',
		top: 8,
		right: 8,
		maxHeight: 'calc(100% - 16px)',
		zIndex: 99999999,
		width: 200,
		flexDirection: 'column',
		display: 'flex',
	};

	return <View {...styleProps} {...props} style={componentStyles} />;
}

export function Header(props) {
	return (
		<View
			fontWeight="bold"
			padding="6px 8px"
			borderBottom="2px solid var(--controlPanelBorderColor)"
			textTransform="uppercase"
			{...props}
		/>
	);
}

export function Body(props) {
	return <View overflowY="auto" flex={1} {...props} />;
}
