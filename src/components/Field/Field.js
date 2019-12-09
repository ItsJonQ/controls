import React, { useState } from 'react';

import { FieldVariants } from './Field.Variants';
import { Label, FieldGroup } from './Field.styles';
import { createUniqueIdFactory } from '../../utils';

const fieldId = createUniqueIdFactory('Field');

/**
 * Renders an interactive input component to control the associated
 * field from state. This component renders into the <Controls /> component.
 */
export function Field(props) {
	const [id] = useState(fieldId());
	const { prop, type, ...restProps } = props;
	const Component = FieldVariants[type];

	if (!Component) return null;

	return (
		<FieldGroup marginBottom={8}>
			<Label label={prop} htmlFor={id} />
			<Component {...restProps} id={id} />
		</FieldGroup>
	);
}
