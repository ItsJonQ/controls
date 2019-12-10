import React from 'react';
import styled from '@emotion/styled';
import { View } from 'styled-view';

export const Swatch = React.forwardRef((props, ref) => {
	const { value, ...restProps } = props;

	return (
		<SwatchButton type="button" {...restProps} ref={ref} tabIndex={0}>
			<View
				borderRadius={2}
				height={16}
				style={{ backgroundColor: value }}
				boxShadow="0 0 0 1px rgba(0, 0, 0, 0.2) inset"
			/>
		</SwatchButton>
	);
});

const SwatchButton = styled.button`
	appearance: none;
	border: 1px solid black;
	box-sizing: border-box;
	cursor: pointer;
	display: block;
	max-width: 50px;
	padding: 3px;
	width: 100%;
`;
