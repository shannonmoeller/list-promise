import test from 'blue-tape';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testFilter(actual, t) {
	const expected = [
		{ a: 2 },
		{ a: 4 }
	];

	const items = await listPromise(actual)
		.filter(item => item.a > 1)
		.filter(async item => await item.a < 5)
		.filter(delay(item => !item.b));

	t.deepEqual(items, expected);
}

test('list of items', async t => {
	const actual = [
		{ a: 1 },
		{ a: 2 },
		{ a: 3, b: 1 },
		{ a: 4 },
		{ a: 5 }
	];

	return testFilter(actual, t);
});

test('list of promised items', async t => {
	const actual = [
		delay({ a: 1 }),
		delay({ a: 2 }),
		delay({ a: 3, b: 1 }),
		delay({ a: 4 }),
		delay({ a: 5 })
	];

	return testFilter(actual, t);
});

test('promised list of items', async t => {
	const actual = delay([
		{ a: 1 },
		{ a: 2 },
		{ a: 3, b: 1 },
		{ a: 4 },
		{ a: 5 }
	]);

	return testFilter(actual, t);
});

test('promised list of promised items', async t => {
	const actual = delay([
		delay({ a: 1 }),
		delay({ a: 2 }),
		delay({ a: 3, b: 1 }),
		delay({ a: 4 }),
		delay({ a: 5 })
	]);

	return testFilter(actual, t);
});
