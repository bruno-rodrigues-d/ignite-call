export function convertTimeStringToMinutes(timeString: string) {
  const [horas, minutes] = timeString.split(':').map(Number)

  return horas * 60 + minutes
}
