const concat = Array.prototype.concat;

function shallowResolve(value) {
	return value
		&& value.shallowPromise
		|| Promise.resolve(value);
}

function deepResolve(value) {
	return shallowResolve(value)
		.then(val => Array.isArray(val)
			? Promise.all(val)
			: val
		);
}

export default function listPromise(items) {
	const shallowPromise = shallowResolve(items);
	const deepPromise = deepResolve(items);

	return Object.assign(deepPromise, {
		shallowPromise,

		concat() {
			async function asyncConcat(prev, item) {
				return concat.call(prev, item);
			}

			return deepPromise.reduce(asyncConcat, []);
		},

		filter(filterer) {
			async function asyncFilter(prev, item, i) {
				filterer = await filterer;

				if (await filterer(item, i)) {
					return concat.call(prev, item);
				}

				return prev;
			}

			return deepPromise.reduce(asyncFilter, []);
		},

		map(mapper) {
			async function asyncMap(item, i) {
				mapper = await mapper;
				item = await item;

				return mapper(item, i, items);
			}

			const localPromise = shallowPromise
				.then(items => items.map(asyncMap));

			return listPromise(localPromise);
		},

		reduce(reducer, init) {
			async function asyncReduce(prev, item, i) {
				reducer = await reducer;
				prev = await prev;
				item = await item;

				return reducer(prev, item, i);
			}

			const localPromise = deepPromise
				.then(items => items.reduce(asyncReduce, init));

			return listPromise(localPromise);
		}
	});
}
