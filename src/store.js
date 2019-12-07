import createStore from 'unistore';
import memoize from 'memoize-one';
import deepEqual from 'deep-equal';
import { broadcast } from './broadcast';

export const store = createStore({ attributes: [] });

function parseValue(value) {
	return value;
}

function createAttribute(prop, value, props) {
	const parseValueFn = props.parseValue || parseValue;

	return {
		prop,
		parseValue,
		...props,
		value: parseValueFn(value),
	};
}

function __addAttribute(props) {
	const { prop, value } = props;
	const prevAttrs = getAttributes();
	const prevAttr = prevAttrs.find(attr => attr.prop === prop);

	if (prevAttr) {
		return updateAttribute(prop, value, props);
	}

	const nextAttr = createAttribute(prop, value, props);

	const nextAttrs = [...prevAttrs, nextAttr];
	store.setState({ attributes: nextAttrs });

	broadcast.emit('addAttribute', nextAttr);

	return value;
}

export const addAttribute = memoize(__addAttribute, deepEqual);

function __updateAttribute(props = {}) {
	const { prop, value } = props;

	const prevAttrs = getAttributes();
	const prevAttr = prevAttrs.find(attr => attr.prop === prop);

	if (!prevAttr) {
		return value;
	}

	const { value: prevValue, parseValue: parseValueProp } = prevAttr;
	const nextValue = parseValueProp(value);

	if (prevValue === nextValue) {
		return nextValue;
	}

	const nextAttrs = prevAttrs.map(attr => {
		if (attr.prop === prop) {
			return {
				...attr,
				...props,
				value: nextValue,
			};
		}
		return attr;
	});

	const nextAttr = nextAttrs.find(attr => attr.prop === prop);

	store.setState({ attributes: nextAttrs });

	broadcast.emit('updateAttribute', nextAttr);

	return value;
}

export const updateAttribute = memoize(__updateAttribute, deepEqual);

export function resetAttributes() {
	const prevAttrs = getAttributes();
	const nextAttrs = prevAttrs.filter(() => false);

	store.setState({ attributes: nextAttrs });

	broadcast.emit('resetAttributes');
}

export function getAttributes() {
	return store.getState().attributes;
}

export function getValue(prop) {
	const item = getAttributes().find(attr => attr.prop === prop);
	return item ? item.value : undefined;
}
