import React from 'react';
import usePortal from 'react-useportal';

import { BaseControls } from './BaseControls';

/**
 * The default and portal'ed version of the <Controls /> UI.
 */
export function Controls(props) {
	const { Portal } = usePortal();

	return (
		<Portal>
			<BaseControls {...props} />
		</Portal>
	);
}
