/**
 * Difficulty:
 * Hard
 *
 * Desc:
 * Given n balloons, indexed from 0 to n-1.
 * Each balloon is painted with a number on it represented by array nums.
 * You are asked to burst all the balloons. If the you burst balloon i you will get nums[left] * nums[i] * nums[right] coins. Here left and right are adjacent indices of i.
 * After the burst, the left and right then becomes adjacent.
 * Find the maximum coins you can collect by bursting the balloons wisely.
 *
 * Note:
 * - You may imagine nums[-1] = nums[n] = 1. They are not real therefore you can not burst them.
 * - 0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
 *
 * Example:
 * Input: [3,1,5,8]
 * Output: 167
 * Explanation:
 * nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
 * coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167
 */

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 分治
 * 先决定谁是最后一个戳破的气求
 */
var maxCoins_1 = function(nums) {
  nums.unshift(1);
  nums.push(1);
  const tmp = {};

  const burstBalloon = (left, right) => {
    if (left + 1 === right) return 0;
    const key = `${left}-${right}`;
    if (tmp[key]) return tmp[key];

    let max = 0;
    for (let i = left + 1; i < right; i += 1) {
      max = Math.max(
        max,
        nums[i] * nums[left] * nums[right] + burstBalloon(left, i) + burstBalloon(i, right)
      );
    }
    tmp[key] = max;
    return max;
  }

  return burstBalloon(0, nums.length - 1);
};


/**
 * @param {number[]} nums
 * @return {number}
 *
 * 动态规划
 * Burst Balloons（leetcode戳气球，困难）从指数级时间复杂度到多项式级时间复杂度的超详细优化思路（回溯到分治到动态规划）
 * https://www.cnblogs.com/niuyourou/p/11964842.html
 */
var maxCoins_2 = function(nums) {
  if (!nums.length) return 0
  nums.push(1)
  nums.unshift(1)

  const dp = []

  for (let i = nums.length - 2; i >= 0; i -= 1) {
    if (!dp[i]) dp[i] = []
    for (let j = i + 2; j <= nums.length - 1; j += 1) {
      if (dp[i][j] === undefined) dp[i][j] = 0
      for (let k = i + 1; k < j; k += 1) {
        dp[i][j] = Math.max(
          dp[i][j],
          (dp[i][k] || 0) + (dp[k][j] || 0) + nums[i] * nums[k] * nums[j]
        )
      }
    }
  }

  return dp[0][nums.length - 1]
}
