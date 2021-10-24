export default function () {
  return Array.apply(null, { length: 20 }).map((item, index) => ({
    highway: '南昌',
    start: `K${30 + index}+${60 + index}～K${30 + index}+${78 + index}`,
    // start: `K30+60～K30+78`,
    startTime: '2021-09-22 08:20:46',
    endTime: index % 2 === 0 ? '2021-09-23 08:20:46' : ''
  }))
}