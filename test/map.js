import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testMap(actual, t) {
	const expected = [
		{a: 1, d: 4, e: 5, f: 6},
		{b: 2, d: 4, e: 5, f: 6},
		{c: 3, d: 4, e: 5, f: 6}
	];

	const items = await listPromise(actual)
		.map(item => {
			item.d = 4;

			return item;
		})
		.map(async item => {
			item.e = await 5;

			return item;
		})
		.map(delay(async item => {
			item.f = 6;

			return item;
		}));

	t.deepEqual(items, expected);
}

test('list of items', async t => {
	const actual = [
		{a: 1},
		{b: 2},
		{c: 3}
	];

	return testMap(actual, t);
});

test('list of promised items', async t => {
	const actual = [
		delay({a: 1}),
		delay({b: 2}),
		delay({c: 3})
	];

	return testMap(actual, t);
});

test('promised list of items', async t => {
	const actual = delay([
		{a: 1},
		{b: 2},
		{c: 3}
	]);

	return testMap(actual, t);
});

test('promised list of promised items', async t => {
	const actual = delay([
		delay({a: 1}),
		delay({b: 2}),
		delay({c: 3})
	]);

	return testMap(actual, t);
});
