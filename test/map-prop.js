import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

async function testMap(actual, t) {
	const expected = [
		{a: 1, foo: 4},
		{b: 2, foo: 5},
		{c: 3}
	];

	const items = await listPromise(actual)
		.mapProp('foo', foo => foo + 1)
		.mapProp('foo', async foo => foo + 1)
		.mapProp('foo', delay(async foo => foo + 1));

	t.deepEqual(items, expected);
}

test('list of items', t => {
	const actual = [
		{a: 1, foo: 1},
		{b: 2, foo: 2},
		{c: 3}
	];

	return testMap(actual, t);
});

test('list of promised items', t => {
	const actual = [
		delay({a: 1, foo: 1}),
		delay({b: 2, foo: 2}),
		delay({c: 3})
	];

	return testMap(actual, t);
});

test('promised list of items', t => {
	const actual = delay([
		{a: 1, foo: 1},
		{b: 2, foo: 2},
		{c: 3}
	]);

	return testMap(actual, t);
});

test('promised list of promised items', t => {
	const actual = delay([
		delay({a: 1, foo: 1}),
		delay({b: 2, foo: delay(2)}),
		delay({c: 3})
	]);

	return testMap(actual, t);
});
