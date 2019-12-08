import colorUtil from 'tinycolor2';
import { is } from '@itsjonq/is';
import { addField, getValue } from './store';

function toNumber(value) {
	if (is.number(value)) return value;
	if (is.string(value) && !value.length) return value;

	const number = parseFloat(value);

	return isNaN(number) ? 0 : number;
}

function toBoolean(value) {
	if (is.boolean(value)) return value;
	if (is.string(value)) {
		const boolean = value.toLowerCase();
		return boolean === 'true';
	}

	return false;
}

function toColor(value) {
	return colorUtil(value).toHexString();
}

function toDate(value) {
	return new Date(value).toISOString().slice(0, 10);
}

export function boolean(prop, value) {
	addField({ prop, type: 'boolean', value, parseValue: toBoolean });

	return getValue(prop);
}

export function color(prop, value) {
	addField({ prop, value, type: 'color', parseValue: toColor });

	return getValue(prop);
}

export function date(prop, value, options) {
	addField({ prop, value, type: 'date', options, parseValue: toDate });

	return getValue(prop);
}

export function range(prop, value, options) {
	addField({ prop, value, type: 'range', options, parseValue: toNumber });

	return getValue(prop);
}

export function select(prop, options, value) {
	addField({ prop, value, type: 'select', options });

	return getValue(prop);
}

export function text(prop, value) {
	addField({ prop, value, type: 'text' });

	return getValue(prop);
}

export function textarea(prop, value) {
	addField({ prop, value, type: 'textarea' });

	return getValue(prop);
}

export function number(prop, value) {
	addField({ prop, value, type: 'number', parseValue: toNumber });

	return getValue(prop);
}
