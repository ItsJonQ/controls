import createStore from 'unistore';
import memoize from 'memoize-one';
import deepEqual from 'deep-equal';
import { getFields } from './selectors';

export * from './selectors';

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

	return value;
}

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

	store.setState({ fields: nextFields });

	return value;
}

function __resetFields() {
	const prevFields = getFields();
	const nextFields = prevFields.filter(() => false);

	store.setState({ fields: nextFields });
}

export const addField = memoize(__addField, deepEqual);
export const updateField = memoize(__updateField, deepEqual);
export const resetFields = __resetFields;
