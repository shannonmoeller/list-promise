import test from 'ava';
import listPromise from '../src/list-promise';
import delay from './helpers/delay';

test('should be a promise', async t => {
	const promise = listPromise();

	t.is(typeof promise.then, 'function');
	t.is(typeof promise.catch, 'function');
});

test('should handle nothing', async t => {
	t.is(undefined, await listPromise());
	t.is(null, await listPromise(null));
});

test('should handle a value', async t => {
	t.is(1, await listPromise(1));
	t.same({ b: 2 }, await listPromise({ b: 2 }));
});

test('should handle a promised value', async t => {
	t.is(1, await listPromise(delay(1)));
	t.same({ b: 2 }, await listPromise(delay({ b: 2 })));
});

test('should handle a list', async t => {
	t.same([1], await listPromise([1]));
	t.same([{ b: 2 }], await listPromise([{ b: 2 }]));
});

test('should handle a promised list', async t => {
	t.same([1], await listPromise(delay([1])));
	t.same([{ b: 2 }], await listPromise(delay([{ b: 2 }])));
});
