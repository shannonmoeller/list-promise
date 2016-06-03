export default function delay(value, ms = 100) {
	return new Promise(resolve => setTimeout(
		() => resolve(value),
		ms * Math.random()
	));
}
