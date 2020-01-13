import createStore from 'unistore';

import { getFields, getField } from './selectors';
import { toValue } from '../knobs/transformValue';

export * from './selectors';

/**
 * The store for the Controls fields. Using a dedicated store allows for updates
 * and re-renders to happen outside of the React render cycle. Effectively,
 * creating an alternate stream. This is the key to enabling the knobs like
 * text(), color(), and date() to work without them being React hooks.
 *
 * This alternative state stream is a technique used by libraries like
 * React Redux or Emotion.
 *
 * We're using unistore to create to store due to it's simplicity and
 * (light) weight.
 */
export const store = createStore({ fields: [] });

/**
 * Creates a specific "field" object (shape) to be added to the store.
 * @param {string} prop The unique key for the field.
 * @param {any} value The value for the field.
 * @param {Object} props Additional props for the field. e.g. Options for a select()
 * @returns {Object} A field to be added to the store.
 */
function createField(prop, value, props) {
	const transformValue = props.transformValue || toValue;

	return {
		prop,
		transformValue,
		...props,
		value: transformValue(value),
	};
}

/**
 * Adds a field to the store. If the field already exists, it would be
 * updated instead. Fields within the store have to have a unique key (prop).
 * @param {Object} props Data to be parsed and added to the store as a field.
 * @returns {any} The value of the field.
 */
export function addField(props) {
	const { prop, value } = props;
	const prevField = getField(prop);

	if (prevField) {
		return;
	}

	const prevFields = getFields();
	const nextField = createField(prop, value, props);

	const nextFields = [...prevFields, nextField];

	store.setState({ fields: nextFields });

	return value;
}

/**
 * Updates a field to the store.
 * @param {Object} props Data to be parsed and updatre to the store as a field.
 * @returns {any} The value of the field.
 */
export function updateField(props = {}) {
	const { prop, value } = props;

	const prevField = getField(prop);

	if (!prevField) {
		return value;
	}

	const prevFields = getFields();

	const { value: prevValue, transformValue: transformValueProp } = prevField;
	const nextValue = transformValueProp(value);

	if (prevValue === nextValue) {
		return nextValue;
	}

	const nextFields = prevFields.map(field => {
		if (field.prop === prop) {
			return {
				...field,
				...props,
				value: nextValue,
			};
		}
		return field;
	});

	store.setState({ fields: nextFields });

	return value;
}

/**
 * Resets (empties) the all of the fields within the store. This enables
 * the default behaviour of removing fields when the component that
 * triggers the control via useControl is unmounted.
 */
export function resetFields() {
	const prevFields = getFields();
	const nextFields = prevFields.filter(() => false);

	store.setState({ fields: nextFields });
}
