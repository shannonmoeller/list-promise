import test from 'ava';
import listPromise from '../src/list-promise';
import { delay } from './helpers/delay';

function testFilter(actual, assert) {
	const expected = [
		{ a: 5, b: 6 }
	];

	return listPromise(actual)
		.filter(item => item.a > 1)
		.filter(item => delay(item.b < 8))
		.filter(async item => item.b > await delay(4))
		.then(result => assert.same(result, expected));
}

test('list of values', async assert => {
	const actual = [
		{ a: 1, b: 2 },
		{ a: 3, b: 4 },
		{ a: 5, b: 6 },
		{ a: 7, b: 8 }
	];

	return testFilter(actual, assert);
});

test('list of promised values', async assert => {
	const actual = [
		delay({ a: 1, b: 2 }, 300),
		delay({ a: 3, b: 4 }),
		delay({ a: 5, b: 6 }, 200),
		delay({ a: 7, b: 8 })
	];

	return testFilter(actual, assert);
});

test('promised list of values', async assert => {
	const actual = Promise.all([
		{ a: 1, b: 2 },
		{ a: 3, b: 4 },
		{ a: 5, b: 6 },
		{ a: 7, b: 8 }
	]);

	return testFilter(actual, assert);
});

test('promised list of promised values', async assert => {
	const actual = Promise.all([
		delay({ a: 1, b: 2 }, 300),
		delay({ a: 3, b: 4 }),
		delay({ a: 5, b: 6 }, 200),
		delay({ a: 7, b: 8 })
	]);

	return testFilter(actual, assert);
});
