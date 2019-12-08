import createStore from 'unistore';
import memoize from 'memoize-one';
import deepEqual from 'deep-equal';
import { broadcast } from './broadcast';

export const store = createStore({ fields: [] });

function parseValue(value) {
	return value;
}

function createField(prop, value, props) {
	const parseValueFn = props.parseValue || parseValue;

	return {
		prop,
		parseValue,
		...props,
		value: parseValueFn(value),
	};
}

function __addField(props) {
	const { prop, value } = props;
	const prevFields = getFields();
	const prevField = prevFields.find(field => field.prop === prop);

	if (prevField) {
		return updateField(prop, value, props);
	}

	const nextField = createField(prop, value, props);

	const nextFields = [...prevFields, nextField];
	store.setState({ fields: nextFields });

	broadcast.emit('addField', nextField);

	return value;
}

export const addField = memoize(__addField, deepEqual);

function __updateField(props = {}) {
	const { prop, value } = props;

	const prevFields = getFields();
	const prevField = prevFields.find(field => field.prop === prop);

	if (!prevField) {
		return value;
	}

	const { value: prevValue, parseValue: parseValueProp } = prevField;
	const nextValue = parseValueProp(value);

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

	const nextField = nextFields.find(field => field.prop === prop);

	store.setState({ fields: nextFields });

	broadcast.emit('updateField', nextField);

	return value;
}

export const updateField = memoize(__updateField, deepEqual);

export function resetAttributes() {
	const prevFields = getFields();
	const nextFields = prevFields.filter(() => false);

	store.setState({ fields: nextFields });

	broadcast.emit('resetAttributes');
}

export function getFields() {
	return store.getState().fields;
}

export function getValue(prop) {
	const item = getFields().find(field => field.prop === prop);
	return item ? item.value : undefined;
}
