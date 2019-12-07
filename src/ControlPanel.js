import React from 'react';
import usePortal from 'react-useportal';
import { View } from '@itsjonq/elm';
import { updateAttribute } from './store';
import { useControlPanel } from './useControlPanel';
import { Field } from './Field';

export function BaseControlPanel(props) {
	const { attributes } = useControlPanel();

	const { isDark, title, padding, ...restProps } = props;

	const handleOnChange = prop => nextValue => {
		updateAttribute({ prop, value: nextValue });
	};

	const headerTitle = title || 'Control Panel';

	return (
		<Wrapper {...restProps} isDark={isDark}>
			<Header>{headerTitle}</Header>
			<Body padding={padding || 8}>
				{attributes.map(item => (
					<Field
						{...item}
						key={item.prop}
						onChange={handleOnChange(item.prop)}
					/>
				))}
			</Body>
		</Wrapper>
	);
}

export function ControlPanel(props) {
	const { Portal } = usePortal();

	return (
		<Portal>
			<BaseControlPanel {...props} />
		</Portal>
	);
}

function Wrapper(props) {
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

function Header(props) {
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

function Body(props) {
	return <View overflowY="auto" flex={1} {...props} />;
}
