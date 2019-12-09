import colorUtil from 'tinycolor2';
import { is } from '@itsjonq/is';

/**
 * The base "transformValue" method. This library wraps the value returns in a
 * transformValue method to dynamically transform them, if required.
 *
 * For example, the color() knob requires the value to be transformed into
 * a valid hex value (#eeeeee). Therefore, the (raw) value needs to run
 * through a specific color transformer.
 *
 * @param {any} value The initial value.
 * @returns {any} The value, unaffected.
 */
export function toValue(value) {
	return value;
}

/**
 * Transforms a value to a valid boolean.
 * @param {any} value The initial value.
 * @returns {boolean} The boolean value.
 */
export function toBoolean(value) {
	if (is.boolean(value)) return value;
	if (is.string(value)) {
		const boolean = value.toLowerCase();
		return boolean === 'true';
	}

	return false;
}

/**
 * Transforms a value to a valid hex code value.
 * @param {any} value The initial value.
 * @returns {string} A hex code value.
 */
export function toColor(value) {
	return colorUtil(value).toHexString();
}

/**
 * Transforms a value to a valid date value.
 * @param {any} value The initial value.
 * @returns {string} A YYYY-MM-DD date value.
 */
export function toDate(value) {
	return new Date(value).toISOString().slice(0, 10);
}

/**
 * Transforms a value to a valid number.
 * @param {any} value The initial value.
 * @returns {number} A number value.
 */
export function toNumber(value) {
	if (is.number(value)) return value;
	if (is.string(value) && !value.length) return value;

	const number = parseFloat(value);

	return isNaN(number) ? 0 : number;
}
