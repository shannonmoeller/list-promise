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
	return actions.reduce(applyAction, await list);
}

/**
 * @method awaitList
 * @param {Array|Promise<Array>}
 * @return {Promise}
 */
export default function awaitlist(list) {
	const actions = [];
	const promise = applyActions(list, actions)
		.then(deepResolve);

	promise.map = function (fn) {
		actions.push({ type: 'map', fn });
		return promise;
	};

	promise.reduce = function (fn, init) {
		actions.push({ type: 'reduce', fn, init });
		return promise;
	};

	promise.filter = function (fn) {
		actions.push({ type: 'filter', fn });
		return promise;
	};

	return promise;
}
