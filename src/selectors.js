import { createSelector } from 'reselect';
import { store } from './store';

const baseGetFields = () => store.getState().fields;

export const getFields = createSelector(baseGetFields);

export const getField = createSelector(getFields, (fields, prop) => {
	console.log(fields);
	return fields.find(f => f.prop === prop);
});

export const getValue = () => '';
