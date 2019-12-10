import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Manager, Reference, Popper } from 'react-popper';
import { View } from 'styled-view';

import { Swatch } from './Swatch';
import { Picker } from './Picker';

export function ColorPicker(props) {
	const [isOpen, setIsOpen] = useState(false);
	const { value, onChange } = props;
	const popperRef = useRef(null);

	useOpenCloseHandlers(popperRef, isOpen, setIsOpen);

	const handleOnChange = data => {
		onChange && onChange(data.hex);
	};

	const openPopper = () => setIsOpen(!isOpen);

	return (
		<Manager>
			<Reference>
				{({ ref }) => (
					<Swatch ref={ref} onClick={openPopper} value={value} />
				)}
			</Reference>
			{isOpen && (
				<Popper
					placement="right-start"
					modifiers={{
						preventOverflow: { boundariesElement: 'window' },
					}}
				>
					{({ ref, style, placement }) => (
						<div ref={popperRef}>
							<div
								ref={ref}
								style={{ ...style, zIndex: 8 }}
								data-placement={placement}
							>
								<Picker
									disableAlpha={true}
									color={value}
									onChangeComplete={handleOnChange}
								/>
							</div>
						</div>
					)}
				</Popper>
			)}
		</Manager>
	);
}

function useOpenCloseHandlers(ref, isOpen, setIsOpen) {
	useEffect(() => {
		const node = ref.current;
		const handleBodyClick = event => {
			const { target } = event;

			if (node !== target && !node.contains(target)) {
				setIsOpen(false);
			}
		};

		const handleOnEscPress = event => {
			if (isOpen && event.keyCode === 27) {
				setIsOpen(false);
			}
		};

		if (node && isOpen) {
			document.addEventListener('click', handleBodyClick);
			document.addEventListener('keydown', handleOnEscPress);
		}

		return () => {
			if (node && isOpen) {
				document.removeEventListener('click', handleBodyClick);
				document.removeEventListener('keydown', handleOnEscPress);
			}
		};
	}, [ref, isOpen, setIsOpen]);
}
