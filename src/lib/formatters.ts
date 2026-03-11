export function formatPrice(price: number): string {
  return `${price.toFixed(price % 1 === 0 ? 0 : 2)} ج.م`;
}

export function formatDistance(km: number): string {
  return `${km.toFixed(1)} كم`;
}

export const arabicDays = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

export function getWeekDates(): { day: string; date: number; isToday: boolean }[] {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      day: arabicDays[d.getDay() === 0 ? 1 : d.getDay() === 6 ? 0 : d.getDay()],
      date: d.getDate(),
      isToday: i === 0,
    });
  }
  return dates;
}
