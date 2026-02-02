const subscriptionPackages = [
    { contentId: "cleaner.weekly_ft_plus", columnName: "weekly_ft_plus" },
    { contentId: "cleaner.weekly_7ft", columnName: "weekly_7ft" },
    { contentId: "cleaner.weekly_lite_ft", columnName: "weekly_lite_ft" },
    { contentId: "cleaner.weekly_ft_1", columnName: "weekly_ft_1" },
    { contentId: "cleaner.weekly_ft", columnName: "weekly_ft" },
    { contentId: "cleaner.weekly_offer", columnName: "weekly_offer" },
    { contentId: "cleaner.annual", columnName: "annual" },
    { contentId: "cleaner.annual_offer", columnName: "annual_offer" },
    { contentId: "cleaner.annual_plus", columnName: "annual_plus" },
    { contentId: "cleaner.annual_pro", columnName: "annual_pro" }
  ];

  const daysToCalculate = [0, 1, 2, 3, 30];
  
  function generateAllMetricsForAgg() {
    let result = "";
    
    for (const day of daysToCalculate) {

      result += `ROUND(
          SUM(
            CASE
              WHEN
                ${day} <= days_since_install
                AND day_difference <= ${day}
                AND event_name LIKE "%rc_%"
                THEN revenue
              ELSE NULL
              END),
          1) AS ltv_${day},
        ROUND(
          SUM(
            CASE
              WHEN
                ${day} <= days_since_install
                AND day_difference <= ${day}
                AND event_name LIKE "%rc_%"
                AND event_name != "rc_non_subscription_purchase_event"
                THEN revenue
              ELSE NULL
              END),
          1) AS subscription_ltv_${day},
        CAST(
          COUNT(DISTINCT CASE WHEN day_difference = ${day} THEN customer_user_id END)
          AS FLOAT64) AS user_count_${day},
        ROUND(
          SUM(
            CASE
              WHEN day_difference = ${day} AND event_name LIKE "%rc_%" THEN revenue
              ELSE 0
              END),
          1) AS revenue_${day},
        `;
      
      result += `ROUND(COUNT(CASE WHEN day_difference = ${day} THEN 1 ELSE 0 END), 1)
          AS event_count_${day},
        ROUND(
          COUNT(
            DISTINCT
              CASE
                WHEN day_difference = ${day} AND event_name != "sessions"
                  THEN event_name
                ELSE NULL
                END),
          1) AS unique_event_count_${day},
        ROUND(
          COUNT(
            CASE
              WHEN day_difference = ${day} AND event_name LIKE "%rc_%" THEN 1
              ELSE 0
              END),
          1) AS rc_event_count_${day},
        `;

      result += `ROUND(
          SUM(CASE WHEN day_difference = ${day} THEN unique_session_count ELSE 0 END),
          1) AS unique_session_count_${day},
        CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN day_difference = ${day} AND unique_session_count != 0
                  THEN customer_user_id
                END)
          AS FLOAT64) AS session_starting_user_count_${day},
        `;
      
      if (day === 0) {
        result += `CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN day_difference = ${day} AND event_name = 'rc_trial_started_event'
                  THEN customer_user_id
                END)
          AS FLOAT64) AS trial_started_user_count_${day},
        CAST(
          COUNT(
            CASE
              WHEN day_difference = ${day} AND event_name = 'rc_trial_started_event'
                THEN 1
              ELSE 0
              END)
          AS INT64) AS trial_started_count_${day},
        CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN
                  day_difference = ${day}
                  AND event_name = 'rc_initial_purchase_event'
                  THEN customer_user_id
                END)
          AS FLOAT64) AS initial_purchase_user_count_${day},
        CAST(
          COUNT(
            CASE
              WHEN day_difference = ${day} AND event_name = 'rc_initial_purchase_event'
                THEN 1
              ELSE 0
              END)
          AS INT64) AS initial_purchase_count_${day},
        `;
      }
      
      if (day === 1 || day === 2 || day === 3) {
        result += `CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN
                  day_difference = ${day}
                  AND event_name = 'rc_trial_converted_event'
                  THEN customer_user_id
                END)
          AS FLOAT64) AS trial_converted_user_count_${day},
        CAST(
          COUNT(
            CASE
              WHEN day_difference = ${day} AND event_name = 'rc_trial_converted_event'
                THEN 1
              ELSE 0
              END)
          AS INT64) AS trial_converted_count_${day},
        CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN
                  day_difference = ${day}
                  AND event_name = 'rc_trial_cancelled_event'
                  THEN customer_user_id
                END)
          AS FLOAT64) AS trial_cancelled_user_count_${day},
        CAST(
          COUNT(
            CASE
              WHEN day_difference = ${day} AND event_name = 'rc_trial_cancelled_event'
                THEN 1
              ELSE 0
              END)
          AS INT64) AS trial_cancelled_count_${day},
        `;
      }

      if (day === 30) {
        result += `CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN
                  day_difference = ${day}
                  AND event_name = 'rc_renewal_event'
                  THEN customer_user_id
                END)
          AS FLOAT64) AS renewal_user_count_${day},
        CAST(
          COUNT(
            CASE
              WHEN day_difference = ${day} AND event_name = 'rc_renewal_event'
                THEN 1
              ELSE 0
              END)
          AS INT64) AS renewal_count_${day},
        CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN
                  day_difference = ${day}
                  AND event_name = 'rc_cancellation_event'
                  THEN customer_user_id
                END)
          AS FLOAT64) AS churn_user_count_${day},
        CAST(
          COUNT(
            CASE
              WHEN day_difference = ${day} AND event_name = 'rc_cancellation_event'
                THEN 1
              ELSE 0
              END)
          AS INT64) AS churn_count_${day},
        `;
      }
      
      result += `CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN
                  ${day} <= days_since_install
                  AND day_difference <= ${day}
                  AND event_name LIKE "%rc_%"
                  AND event_name != "rc_non_subscription_purchase_event"
                  THEN customer_user_id
                ELSE NULL
                END)
          AS FLOAT64) AS subscription_user_count_${day},
        `;
      
      for (const pkg of subscriptionPackages) {
        result += `CAST(
          COUNT(
            DISTINCT
              CASE
                WHEN
                  ${day} <= days_since_install
                  AND day_difference <= ${day}
                  AND event_name LIKE "%rc_%"
                  AND event_name != "rc_non_subscription_purchase_event"
                  AND content_id = "${pkg.contentId}"
                  THEN customer_user_id
                ELSE NULL
                END)
          AS FLOAT64) AS ${pkg.columnName}_user_count_${day},
        `;
      }
    }
    
    return result.trim().slice(0, -1);
  }

  function generateDailyJoinedColumns() {
    let result = "";
    
    for (const day of daysToCalculate) {
      result += `ltv_${day},
        subscription_ltv_${day},
        user_count_${day},
        revenue_${day},
        event_count_${day},
        unique_event_count_${day},
        rc_event_count_${day},
        unique_session_count_${day},
        session_starting_user_count_${day},
        `;
      
      if (day === 0) {
        result += `trial_started_user_count_${day},
        trial_started_count_${day},
        initial_purchase_user_count_${day},
        initial_purchase_count_${day},
        `;
      }
      
      if (day === 1 || day === 2 || day === 3) {
        result += `trial_converted_user_count_${day},
        trial_converted_count_${day},
        trial_cancelled_user_count_${day},
        trial_cancelled_count_${day},
        `;
      }
      
      if (day === 30) {
        result += `renewal_user_count_${day},
        renewal_count_${day},
        churn_user_count_${day},
        churn_count_${day},
        `;
      }

      result += `subscription_user_count_${day},
        `;
      
      for (const pkg of subscriptionPackages) {
        result += `${pkg.columnName}_user_count_${day},
        `;
      }
    }
    
    return result.trim().slice(0, -1);
  }

  const agg_metrics = generateAllMetricsForAgg();
  const daily_joined_columns = generateDailyJoinedColumns();
  
  module.exports = {
    agg_metrics: agg_metrics,
    daily_joined_columns: daily_joined_columns
  };