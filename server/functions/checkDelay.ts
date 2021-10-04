export default (time: Date) => {
	const now: string = new Date().toString()
	const DELAY_TIME_IN_SECONDES = 15
	const DELAY_TIME_IN_MS = DELAY_TIME_IN_SECONDES * 1000
	const diffInMs = Date.parse(now) - Date.parse(time.toString())

	if (Math.floor(diffInMs / 1000) > DELAY_TIME_IN_SECONDES) {
		return 0
	}

	return Math.floor((DELAY_TIME_IN_MS - diffInMs) / 1000);
}