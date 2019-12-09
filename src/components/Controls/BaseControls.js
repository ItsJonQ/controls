import React from 'react';

import { updateField } from '../../store';
import { useControls } from '../../hooks';
import { Field } from '../Field';
import { Wrapper, Header, Body } from './Controls.styles';

/**
 * <BaseControls /> was separated from the preferred <Controls /> component
 * to provide a non-portaled way to render and test the component.
 */
export function BaseControls(props) {
	const { fields } = useControls();

	if (!fields.length) return <div />;

	const { isDark, title, padding, ...restProps } = props;

	const handleOnChange = prop => nextValue => {
		updateField({ prop, value: nextValue });
	};

	const headerTitle = title || 'Control Panel';

	return (
		<Wrapper {...restProps} isDark={isDark}>
			<Header>{headerTitle}</Header>
			<Body padding={padding || 8}>
				{fields.map(field => (
					<Field
						{...field}
						key={field.prop}
						onChange={handleOnChange(field.prop)}
					/>
				))}
			</Body>
		</Wrapper>
	);
}
