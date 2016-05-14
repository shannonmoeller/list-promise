import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testReduce(actual, t) {
	const expected = [
		{ a: 1 },
		{ b: 2 },
		{ c: 3 }
	];

	const items = await listPromise(actual);

	t.same(items, expected);
}

test('TODO - list of items', async t => {
	const actual = [
		{ a: 1 },
		{ b: 2 },
		{ c: 3 }
	];

	return testReduce(actual, t);
});

test('TODO - list of promised items', async t => {
	const actual = [
		delay({ a: 1 }),
		delay({ b: 2 }),
		delay({ c: 3 })
	];

	return testReduce(actual, t);
});

test('TODO - promised list of items', async t => {
	const actual = delay([
		{ a: 1 },
		{ b: 2 },
		{ c: 3 }
	]);

	return testReduce(actual, t);
});

test('TODO - promised list of promised items', async t => {
	const actual = delay([
		delay({ a: 1 }),
		delay({ b: 2 }),
		delay({ c: 3 })
	]);

	return testReduce(actual, t);
});
