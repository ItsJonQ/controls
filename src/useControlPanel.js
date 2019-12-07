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
		broadcast.on('resetAttributes', updateState);

		if (!ref.current) {
			ref.current = true;
			updateState();
		}

		return () => {
			resetAttributes();
			broadcast.off('addAttribute', updateState);
			broadcast.off('updateAttribute', updateState);
			broadcast.off('resetAttributes', updateState);
		};
	}, [ref, setAttributes]);

	const attributeProps = mapStateToProps(state);

	return { ...knobs, attributes, attributeProps };
}

function mapStateToProps(state) {
	return state.reduce((props, item) => {
		return {
			...props,
			[item.prop]: item.value,
		};
	}, {});
}
