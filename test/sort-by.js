import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testSortBy(actual, t) {
	const expected = [
		{foo: 1},
		{foo: 1},
		{foo: 2},
		{foo: 3}
	];

	const itemsSync = await listPromise(actual)
		.sortBy(item => item.foo);

	const itemsAsync = await listPromise(actual)
		.sortBy(async item => await item.foo + 1);

	const itemsDelay = await listPromise(actual)
		.sortBy(delay(item => item.foo));

	t.deepEqual(itemsSync, expected);
	t.deepEqual(itemsAsync, expected);
	t.deepEqual(itemsDelay, expected);
}

test('list of items', async t => {
	const actual = [
		{foo: 2},
		{foo: 1},
		{foo: 3},
		{foo: 1}
	];

	return testSortBy(actual, t);
});

test('list of promised items', async t => {
	const actual = [
		delay({foo: 1}),
		delay({foo: 2}),
		delay({foo: 3}),
		delay({foo: 1})
	];

	return testSortBy(actual, t);
});

test('promised list of items', async t => {
	const actual = delay([
		{foo: 3},
		{foo: 2},
		{foo: 1},
		{foo: 1}
	]);

	return testSortBy(actual, t);
});

test('promised list of promised items', async t => {
	const actual = delay([
		delay({foo: 1}),
		delay({foo: 3}),
		delay({foo: 2}),
		delay({foo: 1})
	]);

	return testSortBy(actual, t);
});
