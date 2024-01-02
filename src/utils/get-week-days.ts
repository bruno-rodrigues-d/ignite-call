interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map(
      (day) => formatter.format(new Date(Date.UTC(2021, 5, day))), // Hack para pegar o dia da semana começando no domingo
    )
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toLocaleUpperCase()
      } else {
        return weekDay
          .substring(0, 1)
          .toUpperCase()
          .concat(weekDay.substring(1))
      }
    })
}
