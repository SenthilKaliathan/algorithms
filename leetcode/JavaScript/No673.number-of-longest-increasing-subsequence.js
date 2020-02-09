/**
 * Difficulty:
 * Medium
 *
 * Desc:
 * Given an unsorted array of integers, find the number of longest increasing subsequence.
 *
 * Example:
 * Input: [1,3,5,4,7]
 * Output: 2
 * Explanation: The two longest increasing subsequence are [1, 3, 4, 7] and [1, 3, 5, 7].
 *
 * Input: [2,2,2,2,2]
 * Output: 5
 * Explanation:
 * The length of longest continuous increasing subsequence is 1, and there are 5 subsequences' length is 1, so output 5.
 *
 * Note:
 * Length of the given array will be not exceed 2000 and the answer is guaranteed to be fit in 32-bit signed int.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS_1 = function(nums) {
  const tmp = [];
  let count = 0;
  let max = 0;

  for (let i = nums.length - 1; i >= 0; i -= 1) {
    const num = nums[i];
    tmp[i] = {
      len: 1,
      count: 1
    };

    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[j] <= num) continue;

      if (tmp[j].len + 1 === tmp[i].len) {
        tmp[i].count += tmp[j].count;
      } else if (tmp[j].len + 1 > tmp[i].len) {
        tmp[i].len = tmp[j].len + 1;
        tmp[i].count = tmp[j].count;
      }
    }

    if (tmp[i].len >= max) {
      if (tmp[i].len > max) {
        count = tmp[i].count;
      } else {
        count += tmp[i].count;
      }
      max = tmp[i].len;
    }
  }

  if (max === 1) return Math.max(new Set(nums).size, count);
  return count;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS_2 = function(nums) {
  const tmp = []
  let maxLen = 1

  for (let i = 0; i < nums.length; i += 1) {
    tmp[i] = {
      count: 1,
      length: 1
    }

    for (let j = 0; j < i; j += 1) {
      if (nums[j] < nums[i]) {
        if (tmp[j].length === tmp[i].length) {
          tmp[i].length = tmp[j].length + 1
          tmp[i].count = tmp[j].count
        } else if (tmp[j].length + 1 === tmp[i].length) {
          tmp[i].count += tmp[j].count
        }
        maxLen = Math.max(tmp[i].length, maxLen)
      }
    }
  }

  return tmp.filter(item => item.length === maxLen).reduce((num, item) => num + item.count, 0)
}

// Test case
console.log(findNumberOfLIS_2([1,3,5,4,7])); // 2
console.log(findNumberOfLIS_2([2,2,2,2,2])); // 5
console.log(findNumberOfLIS_2([3, 2, 1])); // 3
console.log(findNumberOfLIS_2([2, 2, 3, 3, 3])); // 6
console.log(findNumberOfLIS_2([2, 3, 2, 3])); // 3
console.log(findNumberOfLIS_2([2, 3, 2, 3, 2, 3])); // 6
console.log(findNumberOfLIS_2([1, 1, 1, 2, 2, 2, 3, 3, 3])); // 27
console.log(findNumberOfLIS_2([1,2,3,1,2,3,1,2,3])); // 10
