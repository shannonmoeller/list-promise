import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testSortBy(actual, t) {
	const expected = [
		{foo: 3},
		{foo: 2},
		{foo: 1}
	];

	const itemsSync = await listPromise(actual)
		.reverse();

	const itemsAsync = await listPromise(actual)
		.reverse();

	const itemsDelay = await listPromise(actual)
		.reverse();

	t.deepEqual(itemsSync, expected);
	t.deepEqual(itemsAsync, expected);
	t.deepEqual(itemsDelay, expected);
}

test('list of items', t => {
	const actual = [
		{foo: 1},
		{foo: 2},
		{foo: 3}
	];

	return testSortBy(actual, t);
});

test('list of promised items', t => {
	const actual = [
		delay({foo: 1}),
		delay({foo: 2}),
		delay({foo: 3})
	];

	return testSortBy(actual, t);
});

test('promised list of items', t => {
	const actual = delay([
		{foo: 1},
		{foo: 2},
		{foo: 3}
	]);

	return testSortBy(actual, t);
});

test('promised list of promised items', t => {
	const actual = delay([
		delay({foo: 1}),
		delay({foo: 2}),
		delay({foo: 3})
	]);

	return testSortBy(actual, t);
});
