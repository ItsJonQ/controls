/**
 * Creates a factory to generate unique IDs
 * @param {string} prefix A prefix to add to the generated ID
 * @returns {string} The generated unique IDs
 */
export function createUniqueIdFactory(prefix) {
	let index = 0;

	return () => {
		index++;
		return prefix ? `${prefix}-${index++}` : index;
	};
}
