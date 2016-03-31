async function deepResolve(value) {
	value = await value;

	return Array.isArray(value)
		? Promise.all(value)
		: value;
}

async function applyAction(list, { type, fn, init }) {
	list = await list;

	async function asyncMap(item, i) {
		return fn(await item, i, list);
	}

	async function asyncReduce(prev, item, i) {
		return fn(await prev, await item, i, list);
	}

	async function asyncFilter(prev, item, i) {
		prev = await prev;
		item = await item;

		if (await fn(item, i, list)) {
			prev.push(item);
		}

		return prev;
	}

	switch (type) {
		case 'map':
			return list.map(asyncMap);

		case 'reduce':
			return list.reduce(asyncReduce, init);

		case 'filter':
			return list.reduce(asyncFilter, []);

		default:
			return list;
	}
}

async function applyActions(list, actions) {
	list = await list;

	return actions.reduce(applyAction, list);
}

/**
 * @method listPromise
 * @param {Array|Promise<Array>}
 * @return {Promise}
 */
export default function listPromise(list) {
	const actions = [];
	const methods = {
		map(fn) {
			actions.push({ type: 'map', fn });

			return this;
		},

		reduce(fn, init) {
			actions.push({ type: 'reduce', fn, init });

			return this;
		},

		filter(fn) {
			actions.push({ type: 'filter', fn });

			return this;
		},

		resolve(list = []) {
			const promise = applyActions(list, actions)
				.then(deepResolve);

			return Object.assign(promise, methods);
		}
	};

	return methods.resolve(list);
}
