import React, { useRef, useState } from 'react';
import usePortal from 'react-useportal';
import { View } from '@itsjonq/elm';
import { useControlPanel } from './useControlPanel';
import { updateAttribute } from './store';
import { Field } from './Field';
import { createUniqueIdFactory } from './utils';

const panelId = createUniqueIdFactory();

export function ControlPanel(props) {
	const { Portal } = usePortal();
	const componentIdRef = useRef(panelId());
	const { attributes, idRef } = useControlPanel();

	if (componentIdRef.current !== idRef) {
		return null;
	}

	const { isDark, title, padding, style: styleProp, ...restProps } = props;

	const handleOnChange = prop => nextValue => {
		updateAttribute({ prop, value: nextValue });
	};

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

	const headerTitle = title || 'Control Panel';

	return (
		<Portal>
			<View {...styleProps} {...restProps} style={componentStyles}>
				<View
					fontSize={12}
					fontWeight="bold"
					padding="6px 8px"
					borderBottom="2px solid var(--controlPanelBorderColor)"
				>
					{headerTitle}
				</View>
				<View overflowY="auto" flex={1} padding={padding || 8}>
					{attributes.map(item => (
						<Field
							{...item}
							key={item.prop}
							onChange={handleOnChange(item.prop)}
						/>
					))}
				</View>
			</View>
		</Portal>
	);
}
