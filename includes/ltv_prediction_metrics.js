
function generateDailyMetrics() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,45,60,75,90,120];

  for (let i = 0; i <= 120; i++) {
    if (valuesToPrint.includes(i)) {
    result += `ROUND(SUM(CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%" THEN revenue ELSE NULL END), 1) AS ltv_${i},\n`;
    result += `ROUND(SUM(CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name = "rc_non_subscription_purchase_event" THEN revenue ELSE NULL END), 1) AS coin_ltv_${i},\n`;
    result += `ROUND(SUM(CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" THEN revenue ELSE NULL END), 1) AS subscription_ltv_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference = ${i} THEN customer_user_id END) AS FLOAT64) AS user_count_${i},\n`;
    /*result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name = "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS coin_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS subscription_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_bronze" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_bronze_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_gold" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_gold_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_offer" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_offer_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_silver" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_silver_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.annual" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS annual_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference = ${i} AND event_name = "rc_cancellation_event" AND content_id LIKE "%weekly%" THEN customer_user_id END) AS FLOAT64) AS weekly_cancelling_user_count_${i},\n`;
    */
    result += `ROUND(SUM(CASE WHEN day_difference = ${i} AND event_name LIKE "%rc_%" THEN revenue ELSE 0 END), 1) AS revenue_${i},\n`;
    result += `ROUND(COUNT(CASE WHEN day_difference = ${i} THEN 1 ELSE 0 END), 1) AS event_count_${i},\n`;
    result += `ROUND(COUNT(DISTINCT CASE WHEN day_difference = ${i} AND event_name != "sessions" THEN event_name ELSE NULL END), 1) AS unique_event_count_${i},\n`;
    result += `ROUND(COUNT(CASE WHEN day_difference = ${i} AND event_name LIKE "%rc_%" THEN 1 ELSE 0 END), 1) AS rc_event_count_${i},\n`;
    result += `ROUND(SUM(CASE WHEN day_difference = ${i} THEN unique_session_count ELSE 0 END), 1) AS unique_session_count_${i},\n`;  
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference = ${i} AND unique_session_count != 0 THEN customer_user_id END) AS FLOAT64) AS session_starting_user_count_${i},\n`;   
        }
    }
      
    result += `ROUND(SUM(CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%" THEN revenue ELSE NULL END), 1) AS ltv_grand_total,\n`;
    result += `ROUND(SUM(CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%" AND event_name = "rc_non_subscription_purchase_event"  THEN revenue ELSE NULL END), 1) AS coin_ltv_grand_total,\n`;
    result += `ROUND(SUM(CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%" AND event_name != "rc_non_subscription_purchase_event"  THEN revenue ELSE NULL END), 1) AS subscription_ltv_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference <= 120 THEN customer_user_id END) AS FLOAT64) AS user_count_grand_total,\n`;
   /*
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install  AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name = "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS coin_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS subscription_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_bronze" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_bronze_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_gold" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_gold_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_offer" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_offer_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_silver" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_silver_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.annual" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS annual_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference <= 120 AND event_name = "rc_cancellation_event" AND content_id LIKE "%weekly%"  THEN customer_user_id END) AS FLOAT64) AS weekly_cancelling_user_count_grand_total,\n`;
  */  
    result += `ROUND(SUM(CASE WHEN day_difference <= 120 AND event_name LIKE "%rc_%" THEN revenue ELSE 0 END), 1) AS revenue_grand_total,\n`; 
    result += `ROUND(COUNT(CASE WHEN day_difference <= 120 THEN 1 ELSE 0 END), 1) AS event_count_grand_total,\n`;
    result += `ROUND(COUNT(DISTINCT CASE WHEN day_difference <= 120 THEN event_name ELSE NULL END), 1) AS unique_event_count_grand_total,\n`;
    result += `ROUND(COUNT(CASE WHEN day_difference <= 120 AND event_name LIKE "%rc_%" THEN 1 ELSE 0 END), 1) AS rc_event_count_grand_total,\n`;
    result += `ROUND(SUM(CASE WHEN day_difference <= 120 AND 120 >= days_since_install THEN unique_session_count ELSE 0 END), 1) AS unique_session_count_grand_total,\n`;   
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference <= 120 AND unique_session_count != 0 THEN customer_user_id END) AS FLOAT64) AS session_starting_user_count_grand_total,\n`;   
 
  return result;
}

function generateMetrics() {
  let result = "";
  const valuesToPrint = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,45,60,75,90,120];

  for (let i = 0; i <= 120; i++) {
    if (valuesToPrint.includes(i)) {
result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name = "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS coin_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS subscription_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_bronze" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_bronze_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_gold" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_gold_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_offer" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_offer_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_silver" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_silver_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN ${i} <= days_since_install AND day_difference <= ${i} AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.annual" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS annual_user_count_${i},\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference = ${i} AND event_name = "rc_cancellation_event" AND content_id LIKE "%weekly%" THEN customer_user_id END) AS FLOAT64) AS weekly_cancelling_user_count_${i},\n`;
         }
    }
      

    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install  AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name = "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS coin_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS subscription_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_bronze" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_bronze_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_gold" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_gold_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_offer" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_offer_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.weekly_silver" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS weekly_silver_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN 120 >= days_since_install AND day_difference <= 120 AND event_name LIKE "%rc_%"  AND event_name != "rc_non_subscription_purchase_event" AND content_id = "videoai.annual" THEN customer_user_id ELSE NULL END) AS FLOAT64) AS annual_user_count_grand_total,\n`;
    result += `CAST(COUNT(DISTINCT CASE WHEN day_difference <= 120 AND event_name = "rc_cancellation_event" AND content_id LIKE "%weekly%"  THEN customer_user_id END) AS FLOAT64) AS weekly_cancelling_user_count_grand_total,\n`;
   
  return result;
}

const daily_metrics = generateDailyMetrics();


module.exports = {
    daily_metrics
}


