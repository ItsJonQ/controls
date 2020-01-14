import createStore from 'unistore';
import { is } from '@itsjonq/is';

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
 * @param {string} prop The id (prop) of the field to update.
 * @param {any} value The next value for the field.
 * @returns {any} The next value of the field.
 */
export function updateField(prop, value) {
	const prevField = getField(prop);

	if (!prevField) {
		return value;
	}

	const { value: prevValue, transformValue: transformValueProp } = prevField;
	const nextValue = transformValueProp(value);

	if (prevValue === nextValue) {
		return nextValue;
	}

	updateFields({ [prop]: value });

	return value;
}

/**
 * Updates several fields in the store.
 * @param {Object} fields Fields to be updated. Key is the id, value is the next value.
 * @returns {Array} The updated fields.
 */
export function updateFields(fields = {}) {
	if (!is.plainObject(fields)) {
		return [];
	}

	const props = Object.keys(fields);
	const prevFields = getFields();
	let diffs = 0;

	const nextFields = prevFields.map(field => {
		const { prop, value } = field;

		if (props.includes(prop)) {
			const nextValue = fields[prop];
			if (value !== nextValue) {
				diffs++;
			}

			return {
				...field,
				value: nextValue,
			};
		}

		return field;
	});

	// Prevents unnecessary re-renders if there are no changes.
	if (diffs) {
		store.setState({ fields: nextFields });
	}

	return nextFields;
}

/**
 * A forceful way to override the fields. Hope you know what you're doing!
 * @param {Array|Object} fields The next fields to forcefully update to.
 * @returns {any} The next fields, if successful.
 */
export function unsafeOverrideFields(fields = {}) {
	let nextFields;

	if (is.plainObject(fields)) {
		nextFields = Object.keys(fields).reduce((next, prop) => {
			const value = fields[prop];
			return [
				...next,
				{
					prop,
					value,
				},
			];
		}, []);
	}

	if (is.array) {
		nextFields = fields;
	}

	if (nextFields) {
		store.setState({ fields: nextFields });
	}

	return nextFields;
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
