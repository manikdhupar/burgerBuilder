export const updateObject = (oldObject, updatedProperty) => {
	return {
		...oldObject,
		...updatedProperty
	};
};
