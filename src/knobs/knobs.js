import { addField, getValue } from '../store';
import { toBoolean, toColor, toDate, toNumber } from './transformValue';

/**
 * A knob to create and control a boolean value.
 * @param {string} prop The key (name) for the field.
 * @param {boolean} value The value of the field.
 * @returns {boolean} The value of the field.
 */
export function boolean(prop, value) {
	addField({ prop, type: 'boolean', value, transformValue: toBoolean });

	return getValue(prop);
}

/**
 * A knob to create and control a color value.
 * @param {string} prop The key (name) for the field.
 * @param {string} value The value of the field.
 * @returns {string} The value of the field.
 */
export function color(prop, value) {
	addField({ prop, value, type: 'color', transformValue: toColor });

	return getValue(prop);
}

/**
 * A knob to create and control a date value.
 * @param {string} prop The key (name) for the field.
 * @param {string} value The value of the field.
 * @returns {string} The value of the field.
 */
export function date(prop, value, options) {
	addField({ prop, value, type: 'date', options, transformValue: toDate });

	return getValue(prop);
}

/**
 * A knob to create and control a number value.
 * @param {string} prop The key (name) for the field.
 * @param {number} value The value of the field.
 * @returns {number} The value of the field.
 */
export function number(prop, value) {
	addField({ prop, value, type: 'number', transformValue: toNumber });

	return getValue(prop);
}

/**
 * A knob to create and control a range value.
 * @param {string} prop The key (name) for the field.
 * @param {number} value The value of the field.
 * @param {Object} options Options used for an input[type="range"].
 * @returns {number} The value of the field.
 */
export function range(prop, value, options) {
	addField({ prop, value, type: 'range', options, transformValue: toNumber });

	return getValue(prop);
}

/**
 * A knob to create and control a select value.
 * @param {string} prop The key (name) for the field.
 * @param {any} value The value of the field.
 * @param {Object} options Options used to render a <select>...</select>
 * @returns {any} The value of the field.
 */
export function select(prop, options, value) {
	addField({ prop, value, type: 'select', options });

	return getValue(prop);
}

/**
 * A knob to create and control a text value.
 * @param {string} prop The key (name) for the field.
 * @param {string} value The value of the field.
 * @returns {string} The value of the field.
 */
export function text(prop, value) {
	addField({ prop, value, type: 'text' });

	return getValue(prop);
}

/**
 * A knob to create and control a textarea value.
 * @param {string} prop The key (name) for the field.
 * @param {string} value The value of the field.
 * @returns {string} The value of the field.
 */
export function textarea(prop, value) {
	addField({ prop, value, type: 'textarea' });

	return getValue(prop);
}
