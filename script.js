function calculateYield() {
    const TOTAL_ENA = 750000000;

    let apy = parseFloat(document.getElementById('apy').value) / 100;
    let period = parseInt(document.getElementById('period').value);
    let daysRemaining = parseInt(document.getElementById('daysRemaining').value);
    let ytAmount = parseFloat(document.getElementById('ytAmount').value);
    let enaPrice = parseFloat(document.getElementById('enaPrice').value);
    let totalPointsInput = document.getElementById('totalPoints').value;
    let totalPointsT = totalPointsInput ? parseFloat(totalPointsInput) : 9.83;

    // 将总积分从 T 转换为实际数量
    let totalPoints = totalPointsT * 1000000000000;

    // 根据周期数计算 APR
    let n;
    switch(period) {
        case 365:
            n = 365;
            break;
        case 52:
            n = 52;
            break;
        case 12:
            n = 12;
            break;
        default:
            n = 365;
    }
    let apr = n * (Math.pow((1 + apy), 1 / n) - 1);

    // 质押收益
    let dailyRate = apr / 365;
    let stakingYield = ytAmount * daysRemaining * dailyRate;

    // 积分收益
    let pointsEarned = ytAmount * 20 * daysRemaining;
    let pointsRatio = pointsEarned / totalPoints;
    let pointsYield = (TOTAL_ENA * pointsRatio) * enaPrice;

    // 总体收益
    let totalYield = stakingYield + pointsYield;

    document.getElementById('result').innerHTML = `总体收益: ${totalYield.toFixed(2)}`;
}