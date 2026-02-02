function calculateRealtimeBoundsUTC(now = new Date()) {
  const hourUTC = now.getUTCHours();

  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();     // 0-based
  const d = now.getUTCDate();

  const start = new Date(Date.UTC(
    y, m,
    hourUTC < 4 ? (d - 1) : d,
    0, 0, 0, 0
  ));

  const end = new Date(Date.UTC(
    y, m,
    hourUTC < 4 ? d : (d + 1),
    hourUTC < 4 ? 4 : 0,
    0, 0, 0
  ));

  return {
    realtime_start_ts: start,
    realtime_end_ts: end,
  };
}

function formatUTC(date) {
  const pad = n => String(n).padStart(2, "0");

  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ` +
         `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`;
}

const { realtime_start_ts, realtime_end_ts } = calculateRealtimeBoundsUTC();
const realtime_start_ts_calc = formatUTC(realtime_start_ts);
const realtime_end_ts_calc = formatUTC(realtime_end_ts);
module.exports = {
    realtime_start_ts_calc,
    realtime_end_ts_calc
}
