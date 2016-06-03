import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testReduce(actual, t) {
	const expected = { a: 1, b: 2, c: 3 };

	const items = await listPromise(actual)
		.reduce(delay(async (prev, item) => {
			return { ...prev, ...item };
		}));

	t.deepEqual(items, expected);
}

test('list of items', async t => {
	const actual = [
		{ a: 1 },
		{ b: 2 },
		{ c: 3 }
	];

	return testReduce(actual, t);
});

test('list of promised items', async t => {
	const actual = [
		delay({ a: 1 }),
		delay({ b: 2 }),
		delay({ c: 3 })
	];

	return testReduce(actual, t);
});

test('promised list of items', async t => {
	const actual = delay([
		{ a: 1 },
		{ b: 2 },
		{ c: 3 }
	]);

	return testReduce(actual, t);
});

test('promised list of promised items', async t => {
	const actual = delay([
		delay({ a: 1 }),
		delay({ b: 2 }),
		delay({ c: 3 })
	]);

	return testReduce(actual, t);
});
