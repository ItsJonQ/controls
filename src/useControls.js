import { useRef, useEffect, useState } from 'react';
import { broadcast } from './broadcast';
import { getFields, resetAttributes } from './store';
import * as knobs from './knobs';

export function useControls() {
	const [fields, setFields] = useState(getFields());
	const ref = useRef(false);

	useEffect(() => {
		const updateState = () => {
			setFields(getFields());
		};

		broadcast.on('addField', updateState);
		broadcast.on('updateField', updateState);
		broadcast.on('resetAttributes', updateState);

		if (!ref.current) {
			ref.current = true;
			updateState();
		}

		return () => {
			resetAttributes();
			broadcast.off('addField', updateState);
			broadcast.off('updateField', updateState);
			broadcast.off('resetAttributes', updateState);
		};
	}, [ref, setFields]);

	const attributes = mapStateToProps(fields);

	return { ...knobs, fields, attributes };
}

function mapStateToProps(state) {
	return state.reduce((props, item) => {
		return {
			...props,
			[item.prop]: item.value,
		};
	}, {});
}
