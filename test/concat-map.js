import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testConcatMap(actual, t) {
	const expected = [
		{a: 1}, {e: 5}, ['d', 4], {e: 5},
		{b: 2}, {e: 5}, ['d', 4], {e: 5},
		{c: 3}, {e: 5}, ['d', 4], {e: 5}
	];

	const items = await listPromise(actual)
		.concatMap(item => [
			item,
			['d', 4]
		])
		.concatMap(async item => [
			await item,
			delay({e: 5})
		]);

	t.deepEqual(items, expected);
}

test('list of items', t => {
	const actual = [
		{a: 1},
		{b: 2},
		{c: 3}
	];

	return testConcatMap(actual, t);
});

test('list of promised items', t => {
	const actual = [
		delay({a: 1}),
		delay({b: 2}),
		delay({c: 3})
	];

	return testConcatMap(actual, t);
});

test('promised list of items', t => {
	const actual = delay([
		{a: 1},
		{b: 2},
		{c: 3}
	]);

	return testConcatMap(actual, t);
});

test('promised list of promised items', t => {
	const actual = delay([
		delay({a: 1}),
		delay({b: 2}),
		delay({c: 3})
	]);

	return testConcatMap(actual, t);
});
