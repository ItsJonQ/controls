import { useRef, useEffect, useState } from 'react';
import { store, getFields, resetFields } from './store';
import * as knobs from './knobs';

export function useControls() {
	const [fields, setFields] = useState(getFields());
	const ref = useRef(false);

	useEffect(() => {
		const updateState = () => setFields(getFields());

		if (!ref.current) {
			ref.current = true;
			updateState();
		}

		store.subscribe(updateState);

		return () => {
			resetFields();
			store.unsubscribe(updateState);
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
