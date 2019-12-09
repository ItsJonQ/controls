import { store } from './store';

/**
 * Retrieves the fields from the store.
 * @returns {Array<Object>} Fields from the store.
 */
export function getFields() {
	return store.getState().fields || [];
}

/**
 * Retrieves a single field from the store, based on the prop (key).
 * @param {string} prop The prop to find from the store.
 * @returns {Object} A field from the store.
 */
export function getField(prop) {
	if (!prop) return undefined;

	return getFields().find(f => f.prop === prop);
}

/**
 * Retrieves the value of a single field from the store, based on the prop (key).
 * @param {string} prop The prop to find from the store.
 * @returns {any} The value of the field.
 */
export function getValue(prop) {
	if (!prop) return undefined;
	const field = getField(prop);

	return field ? field.value : undefined;
}
