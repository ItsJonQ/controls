import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import colorize from 'tinycolor2';

import { SketchPicker } from 'react-color';

export function Picker(props) {
	const isLight = colorize(props.color).isLight();

	return (
		<ColorPickerWrapper isLight={isLight}>
			<SketchPicker disableAlpha={true} {...props} />
		</ColorPickerWrapper>
	);
}

const isLight = ({ isLight }) => {
	if (isLight) {
		return css`
			--borderColor: rgba(0, 0, 0, 0.3);
		`;
	} else {
		return css`
			--borderColor: rgba(255, 255, 255, 0.3);
		`;
	}
};

const ColorPickerWrapper = styled.div`
	${isLight};
	.sketch-picker {
		background: white !important;
		border: 1px solid black !important;
		border-radius: 0px !important;
		color: black !important;
		font-family: inherit;
		user-select: none;

		* {
			color: black !important;
			user-select: none;
		}

		input {
			background: white !important;
			border: 1px solid black !important;
			box-shadow: none !important;
			user-select: initial;
		}

		.flexbox-fix {
			&:last-child {
				border-top: 1px solid black !important;
			}
		}
	}
`;
