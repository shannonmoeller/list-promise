import test from 'ava';
import listPromise from '../src/list-promise';
import { delay } from './helpers/delay';

function testReduce(actual, assert) {
	const expected = 10;

	return listPromise(actual)
		.reduce((x, y) => x.concat({ ab: y.a + y.b }), [])
		.reduce((x, y) => delay(x + y.ab), 0)
		.then(result => assert.same(result, expected));
}

test('list of values', async assert => {
	const actual = [
		{ a: 1, b: 2 },
		{ a: 3, b: 4 }
	];

	return testReduce(actual, assert);
});

test('list of promised values', async assert => {
	const actual = [
		delay({ a: 1, b: 2 }, 200),
		delay({ a: 3, b: 4 })
	];

	return testReduce(actual, assert);
});

test('promised list of values', async assert => {
	const actual = Promise.all([
		{ a: 1, b: 2 },
		{ a: 3, b: 4 }
	]);

	return testReduce(actual, assert);
});

test('promised list of promised values', async assert => {
	const actual = Promise.all([
		delay({ a: 1, b: 2 }, 200),
		delay({ a: 3, b: 4 })
	]);

	return testReduce(actual, assert);
});
