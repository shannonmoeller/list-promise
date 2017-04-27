const concat = Array.prototype.concat;

function shallowResolve(value) {
	return (value && value.shallowPromise) ||
		Promise.resolve(value);
}

function deepResolve(value) {
	return shallowResolve(value)
		.then(val => Array.isArray(val) ?
			Promise.all(val) :
			val
		);
}

export default function listPromise(items) {
	const shallowPromise = shallowResolve(items);
	const deepPromise = deepResolve(items);

	return Object.assign(deepPromise, {
		concat() {
			async function asyncConcat(prev, item) {
				item = await item;

				return concat.call(prev, item);
			}

			return deepPromise
				.reduce(asyncConcat, []);
		},

		concatMap(mapper) {
			return deepPromise
				.map(mapper)
				.concat();
		},

		filter(filterer) {
			async function asyncFilter(prev, item, i) {
				filterer = await filterer;
				item = await item;

				if (await filterer(item, i)) {
					prev.push(item);
				}

				return prev;
			}

			return deepPromise
				.reduce(asyncFilter, []);
		},

		map(mapper) {
			async function asyncMap(item, i) {
				mapper = await mapper;
				item = await item;

				return mapper(item, i);
			}

			const localPromise = shallowPromise
				.then(x => x.map(asyncMap));

			return listPromise(localPromise);
		},

		mapProp(prop, mapper) {
			async function asyncMapProp(item, i) {
				mapper = await mapper;
				item = await item;

				if (item && prop in item) {
					const subItem = await item[prop];

					item[prop] = await mapper(subItem, i, item);
				}

				return item;
			}

			return deepPromise
				.map(asyncMapProp);
		},

		reduce(reducer, init) {
			async function asyncReduce(prev, item, i) {
				reducer = await reducer;
				prev = await prev;
				item = await item;

				return reducer(prev, item, i);
			}

			const localPromise = deepPromise
				.then(x => x.reduce(asyncReduce, init));

			return listPromise(localPromise);
		},

		reverse() {
			const localPromise = shallowPromise
				.then(x => x.slice().reverse());

			return listPromise(localPromise);
		},

		sortBy(sorter) {
			async function asyncSortBy(item, i) {
				sorter = await sorter;

				const value = await item;
				const sortValue = await sorter(value, i);

				return {value, sortValue};
			}

			function sortBySortValue(a, b) {
				const aSortValue = a.sortValue;
				const bSortValue = b.sortValue;

				if (aSortValue < bSortValue) {
					return -1;
				}

				if (aSortValue > bSortValue) {
					return 1;
				}

				return 0;
			}

			const localPromise = deepPromise
				.map(asyncSortBy)
				.then(list => list.sort(sortBySortValue))
				.then(list => list.map(item => item.value));

			return listPromise(localPromise);
		}
	});
}
