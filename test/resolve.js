import test from 'ava';
import listPromise from '../src/list-promise';
import { delay } from './helpers/delay';

function testResolve(actual, assert) {
	const expected = [
		'fooabc',
		'barabc',
		'bazabc'
	];

	return listPromise()
		.map(item => item + 'a')
		.map(item => delay(item + 'b', 200))
		.map(async item => item + await delay('c'))
		.resolve(actual)
		.then(result => assert.same(result, expected));
}

test('promised list of promised values', async assert => {
	const actual = Promise.all([
		delay('foo', 200),
		delay('bar'),
		'baz'
	]);

	return testResolve(actual, assert);
});
