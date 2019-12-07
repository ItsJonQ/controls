export function createUniqueIdFactory(prefix) {
	let index = 0;
	return () => {
		index++;
		return prefix ? `${prefix}-${index++}` : index;
	};
}
