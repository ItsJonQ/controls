import { useRef, useEffect, useState } from 'react';

import { store, getFields, resetFields } from '../store';
import * as knobs from '../knobs';

/**
 * A special hook that "connects" the store with a rendered component.
 * The hook callback arguments provide knobs that allow for the user
 * to add fields to the store.
 */
export function useControls() {
	const [fields, setFields] = useState(getFields());
	const ref = useRef(false);

	useEffect(() => {
		const updateState = () => setFields(getFields());

		/**
		 * Forces an update during the initial render phase.
		 * This is required after the initial connection to the store.
		 * Otherwise, the added fields do not show on first render.
		 */
		if (!ref.current) {
			ref.current = true;
			updateState();
		}

		/**
		 * A subscription is established to the store to "connect" to store
		 * state together with this hook state.
		 */
		store.subscribe(updateState);

		return () => {
			/**
			 * The default behaviour is to remove all fields within the store
			 * the moment the component is unmounted from view.
			 */
			resetFields();
			/**
			 * The subscription is removed from the store on unmount.
			 */
			store.unsubscribe(updateState);
		};
	}, [ref, setFields]);

	const attributes = mapStateToProps(fields);

	return { ...knobs, fields, attributes };
}

/**
 * Remaps the collection of fields into a Object of key/value pairs.
 * @param {Array<Object>} state The fields.
 * @returns {Object}
 */
function mapStateToProps(state) {
	return state.reduce((props, item) => {
		return {
			...props,
			[item.prop]: item.value,
		};
	}, {});
}
