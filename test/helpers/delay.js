export default function delay(value, ms) {
	return new Promise(resolve => setTimeout(
		() => resolve(value),
		(ms || 100) * Math.random()
	));
}
