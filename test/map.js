import test from 'ava';
import listPromise from '../src/list-promise';
import { delay } from './helpers/delay';

function testMap(actual, assert) {
	const expected = [
		'fooabc',
		'barabc',
		'bazabc'
	];

	return listPromise(actual)
		.map(item => item + 'a')
		.map(item => delay(item + 'b', 200))
		.map(async item => item + await delay('c'))
		.then(result => assert.same(result, expected));
}

test('list of values', async assert => {
	const actual = [
		'foo',
		'bar',
		'baz'
	];

	return testMap(actual, assert);
});

test('list of promised values', async assert => {
	const actual = [
		delay('foo', 200),
		delay('bar'),
		'baz'
	];

	return testMap(actual, assert);
});

test('promised list of values', async assert => {
	const actual = Promise.all([
		'foo',
		'bar',
		'baz'
	]);

	return testMap(actual, assert);
});

test('promised list of promised values', async assert => {
	const actual = Promise.all([
		delay('foo', 200),
		delay('bar'),
		'baz'
	]);

	return testMap(actual, assert);
});
