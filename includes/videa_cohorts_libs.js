
function generateDailyRevenues() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,15,30,60,90,120,150,180,210,240,270,300,330,360];

  for (let i = 0; i <= 360; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(CAST(CASE WHEN  ${i} <= days_since_install AND  i.day_difference = ${i} THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS revenue_${i},\n`;

        }
    }
  return result;
}

function generateDailyCost() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,15,30,60,90,120,150,180,210,240,270,300,330,360];

  for (let i = 0; i <= 360; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(IFNULL(CAST(total_cost AS STRING),'')) AS cost_${i},\n`;
        }
    }

  return result;
}

function generateDailyInstalls() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,15,30,60,90,120,150,180,210,240,270,300,330,360];

  for (let i = 0; i <= 360; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(IFNULL(CAST(total_installs AS STRING),'')) AS installs_${i},\n`;
        }
    }

  return result;
}


function generateDailyUsers() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,15,30,60,90,120,150,180,210,240,270,300,330,360];

  for (let i = 0; i <= 360; i++) {
    if (valuesToPrint.includes(i)) {
    result += `(CASE WHEN ${i} <= days_since_install AND  i.day_difference = ${i} THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS userid_${i},\n`;
        }
    }
  result += `(CASE WHEN 360 <= days_since_install AND  i.day_difference = 360 THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS userid_grandtotal,\n`;

  return result;
}
function generateDailyLTV() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,15,30,60,90,120,150,180,210,240,270,300,330,360];

  for (let i = 0; i <= 360; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(CAST(CASE WHEN  ${i} <= days_since_install AND  i.day_difference <= ${i} THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS ltv_${i},\n`;
        }
    }
  result += `ARRAY_AGG(CAST(CASE WHEN  i.day_difference <= 360 THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS ltv_grandtotal,\n`;

  return result;
}
function generateDailyCumulativeUsers() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,15,30,60,90,120,150,180,210,240,270,300,330,360];

  for (let i = 0; i <= 360; i++) {
    if (valuesToPrint.includes(i)) {
    result += `(CASE WHEN ${i} <= days_since_install AND  i.day_difference <= ${i} THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS cumuserid_${i},\n`;
        }
    }
  result += `(CASE WHEN i.day_difference <= 360 THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS cumuserid_grandtotal, \n`;

  return result;
}

function generateWeeklyRevenues() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,52];

  for (let i = 0; i <= 52; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(CAST(CASE WHEN ${i} <= weeks_since_install AND  i.week_difference = ${i} THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS revenue_${i},\n`;
        }
    }
  return result;
}

function generateWeeklyCost() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,52];

  for (let i = 0; i <= 52; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(IFNULL(CAST(total_cost AS STRING),'')) AS cost_${i},\n`;
        }
    }
  return result;
}
function generateWeeklyInstalls() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,52];

  for (let i = 0; i <= 52; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(IFNULL(CAST(total_installs AS STRING),'')) AS installs_${i},\n`;
        }
    }
  return result;
}


function generateWeeklyUsers() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,52];

  for (let i = 0; i <= 52; i++) {
    if (valuesToPrint.includes(i)) {
    result += `(CASE WHEN ${i} <= weeks_since_install AND i.week_difference = ${i} THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS userid_${i},\n`;
        }
    }
  result += `(CASE WHEN i.week_difference = 52 THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS userid_grandtotal,\n`;

  return result;
}
function generateWeeklyLTV() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,52];

  for (let i = 0; i <= 52; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(CAST(CASE WHEN ${i} <= weeks_since_install AND  i.week_difference <= ${i} THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS ltv_${i},\n`;
        }
    }
  result += `ARRAY_AGG(CAST(CASE WHEN  i.week_difference <= 52 THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS ltv_grandtotal,\n`;

  return result;
}
function generateWeeklyCumulativeUsers() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,52];

  for (let i = 0; i <= 52; i++) {
    if (valuesToPrint.includes(i)) {
    result += `(CASE WHEN ${i} <= weeks_since_install AND i.week_difference <= ${i} THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS cumuserid_${i},\n`;
        }
    }
  result += `(CASE WHEN  i.week_difference <= 52 THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS cumuserid_grandtotal,\n`;

  return result;
}

function generateMonthlyRevenues() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  for (let i = 0; i <= 12; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(CAST(CASE WHEN ${i} <= months_since_install AND i.month_difference = ${i} THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS revenue_${i},\n`;

        }
    }
  return result;
}

function generateMonthlyCost() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  for (let i = 0; i <= 12; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(IFNULL(CAST(total_cost AS STRING),'')) AS cost_${i},\n`;
        }
    }
  return result;
}
function generateMonthlyInstalls() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  for (let i = 0; i <= 12; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(IFNULL(CAST(total_installs AS STRING),'')) AS installs_${i},\n`;
        }
    }
  return result;
}


function generateMonthlyUsers() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  for (let i = 0; i <= 12; i++) {
    if (valuesToPrint.includes(i)) {
    result += `(CASE WHEN ${i} <= months_since_install AND i.month_difference = ${i} THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS userid_${i},\n`;
        }
    }
  result += `(CASE WHEN i.month_difference = 12 THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS userid_grandtotal,\n`;

  return result;
}
function generateMonthlyLTV() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  for (let i = 0; i <= 12; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ARRAY_AGG(CAST(CASE WHEN ${i} <= months_since_install AND i.month_difference <= ${i} THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS ltv_${i},\n`;
        }
    }
    result += `ARRAY_AGG(CAST(CASE WHEN  i.month_difference <= 12 THEN IFNULL(revenue, 0) ELSE 0 END AS STRING)) AS ltv_grandtotal,\n`;

  return result;
}
function generateMonthlyCumulativeUsers() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12];

  for (let i = 0; i <= 12; i++) {
    if (valuesToPrint.includes(i)) {
    result += `(CASE WHEN ${i} <= months_since_install AND i.month_difference <= ${i} THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS cumuserid_${i},\n`;
        }
    }
    result += `(CASE WHEN i.month_difference <= 12 THEN ARRAY_AGG(DISTINCT IFNULL(customer_user_id, '')) ELSE NULL END)  AS cumuserid_grandtotal,\n`;

  return result;
}


const daily_revenues = generateDailyRevenues();
const daily_users = generateDailyUsers();
const daily_ltv = generateDailyLTV();
const daily_cumulative_users = generateDailyCumulativeUsers();
const daily_cost = generateDailyCost();
const daily_installs = generateDailyInstalls();
const weekly_revenues = generateWeeklyRevenues();
const weekly_users = generateWeeklyUsers();
const weekly_ltv = generateWeeklyLTV();
const weekly_cumulative_users = generateWeeklyCumulativeUsers();
const weekly_cost = generateWeeklyCost();
const weekly_installs = generateWeeklyInstalls();
const monthly_revenues = generateMonthlyRevenues();
const monthly_users = generateMonthlyUsers();
const monthly_ltv = generateMonthlyLTV();
const monthly_cumulative_users = generateMonthlyCumulativeUsers();
const monthly_cost = generateMonthlyCost();
const monthly_installs = generateMonthlyInstalls();

module.exports = {

    daily_users,
    daily_revenues,
    daily_ltv,
    daily_cumulative_users,
    daily_cost,
    daily_installs,
    weekly_users,
    weekly_revenues,
    weekly_ltv,
    weekly_cumulative_users,
    weekly_cost,
    weekly_installs,
    monthly_users,
    monthly_revenues,
    monthly_ltv,
    monthly_cumulative_users,
    monthly_cost,
    monthly_installs
}


