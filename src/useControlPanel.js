import { useRef, useEffect, useState } from 'react';
import { broadcast } from './broadcast';
import { getAttributes, resetAttributes } from './store';
import * as knobs from './knobs';

export function useControlPanel() {
	const [attributes, setAttributes] = useState(getAttributes());
	const ref = useRef(false);

	useEffect(() => {
		const updateState = () => {
			setAttributes(getAttributes());
		};

		broadcast.on('addAttribute', updateState);
		broadcast.on('updateAttribute', updateState);

		if (!ref.current) {
			ref.current = true;
			updateState();
		}

		return () => {
			resetAttributes();
			broadcast.off('addAttribute', updateState);
			broadcast.off('updateAttribute', updateState);
		};
	}, [ref, setAttributes]);

	return { ...knobs, attributes };
}
