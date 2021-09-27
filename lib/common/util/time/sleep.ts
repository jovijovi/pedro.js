const Sleep = async (ms: number): Promise<number> => new Promise(resolve => setTimeout(() => resolve(ms), ms));
const SleepSeconds = async (s: number): Promise<number> => Sleep(s * 1000);
const SleepMinutes = async (m: number): Promise<number> => SleepSeconds(m * 60);
const SleepHours = async (h: number): Promise<number> => SleepMinutes(h * 60);
const SleepDays = async (d: number): Promise<number> => SleepHours(d * 24);

export {
	Sleep,
	Sleep as sleepMilliseconds,
	SleepSeconds,
	SleepMinutes,
	SleepHours,
	SleepDays,
}
