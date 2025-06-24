interface TimeOption {
  value: string;
  label: string;
}

export const generateTimeOptions = (): TimeOption[] => {
  const options: TimeOption[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (const min of [0, 15, 30, 45]) {
      const period = hour < 12 ? "AM" : "PM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const minuteStr = min.toString().padStart(2, "0");
      const hourStr = hour.toString().padStart(2, "0");

      options.push({
        value: `${hourStr}:${minuteStr}`,
        label: `${hour12}:${minuteStr} ${period}`,
      });
    }
  }

  return options;
};
