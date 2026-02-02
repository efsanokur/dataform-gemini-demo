function subtractDaysAndFormat(date, days, formatType = 'BQ_DATE') {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    const isoString = newDate.toISOString().slice(0, 10);

    if (formatType === 'BQ_DATE') {
        return isoString;
    } else if (formatType === 'YYYYMMDD') {
        return isoString.replace(/-/g, '');
    }

}

function arrayToSQLInClause(array) {
    return `(${array.map(item => `'${item}'`).join(', ')})`;
}

function generateTeamNamesSQLCondition(teamNames) {
    const specialCondition = teamNames.includes("Getcontact")
        ? `(teamName = 'Getcontact' AND appName = 'Getcontact')`
        : '';

    const otherConditions = teamNames
        .filter(name => name !== "Getcontact")
        .map(name => `teamName = '${name}'`)
        .join(' OR ');

    const sqlCondition = specialCondition
        ? `${specialCondition} OR ${otherConditions}`
        : otherConditions;

    return sqlCondition;
}

// Chanable constants. Please change those constants based on pipeline needs.
const PERIOD_SUBSTRACT_NUMBER = 7;
const account_numbers = ["119043258", "120745796", "126509429", "125341237"];
const bucket_names = ["pubsite_prod_rev_03926357277569992133", "pubsite_prod_6848854852165279509",
                                "pubsite_prod_9040509023617123630", "pubsite_prod_rev_02119997977524526557"];
const team_names = ["Getcontact", "Alivex", "Astral Coach &amp;amp; Moyra"];
const business_names = ["Getcontact - Getverify LDA", "Rockads - Kompanion Fitself"]
const team_names_condition = '((teamName = "Getcontact" AND appName = "Getcontact") OR (teamName = "Astral Coach &amp;amp; Moyra" AND appName = "Moyra") OR teamName = "Alivex")';


// Subscription MRR Cohort Constants
const subscription_mrr_cohort_start_date = "2023-01-01";
const ios_account_number = "119043258";
const android_account_number = "pubsite_prod_rev_03926357277569992133";
const web_account_number = "Alivex";


// Predefined constants. Do not change them!
const today = new Date();
const formattedBQPeriodStartDateBqDate = subtractDaysAndFormat(today, PERIOD_SUBSTRACT_NUMBER, 'BQ_DATE');
const formattedBQPeriodStartDateYYYYMMDD = subtractDaysAndFormat(today, PERIOD_SUBSTRACT_NUMBER, 'YYYYMMDD');
const formattedDate1DayAgoBqDate = subtractDaysAndFormat(today, 1, 'BQ_DATE');
const formattedDate1DayAgoYYYYMMDD = subtractDaysAndFormat(today, 1, 'YYYYMMDD');
const currentDate = subtractDaysAndFormat(today, 0, 'BQ_DATE');
const accountNumbersSqlInClause = arrayToSQLInClause(account_numbers);
const bucketNamesSqlInClause = arrayToSQLInClause(bucket_names);
const teamNamessqlCondition = generateTeamNamesSQLCondition(team_names);
const teamNamesSqlInCondition = arrayToSQLInClause(team_names);
const businessNamesSqlInCondition = arrayToSQLInClause(business_names);


module.exports = {
    formattedBQPeriodStartDateBqDate,
    formattedBQPeriodStartDateYYYYMMDD,
    formattedDate1DayAgoBqDate,
    formattedDate1DayAgoYYYYMMDD,
    currentDate,
    accountNumbersSqlInClause,
    bucketNamesSqlInClause,
    teamNamessqlCondition,
    teamNamesSqlInCondition,
    businessNamesSqlInCondition,
    subscription_mrr_cohort_start_date,
    ios_account_number,
    android_account_number,
    web_account_number,
    team_names_condition
};