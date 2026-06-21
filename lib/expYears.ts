export function calcExpYears(): number {
  const start = new Date(2017, 10, 1) // Nov 2017
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const monthDiff = now.getMonth() - start.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < 1)) years--
  return years
}
