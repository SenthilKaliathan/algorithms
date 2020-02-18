/*
 * Difficulty:
 * Medium
 *
 * Desc:
 * Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. 
 * Return the sum of the three integers. You may assume that each input would have exactly one solution.
 *
 * Example:
 * given array S = {-1 2 1 -4}, and target = 1.
 * The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 *
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。
 * 找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案
 */

var getTowClosest = function(nums, target) {
  var mapped = new Set();
  var result = nums[0] + nums[1];
  var i = 0;
  var j = nums.length - 1;

  while(i < j) {
    var num1 = nums[i];
    var num2 = nums[j];
    var num = num1 + num2;
    if (Math.abs(target - num) < Math.abs(target - result)) {
      result = num;
    }
    if (num > target) {
      j -= 1;
    } else if (num < target) {
      i += 1;
    } else {
      break;
    }
  }
  return result;
};

/**
* @param {number[]} nums
* @param {number} target
* @return {number}
* =========== 解法一 ===========
*/
var threeSumClosest_1 = function(nums, target) {
  nums.sort((a, b) => a - b);
  var length = nums.length;
  var mapped = new Set();
  var result = nums[0] + nums[1] + nums[2];
  if (length === 3) return result;

  for (var i = 0; i < length; i += 1) {
    if (length - i < 3) break;
    var num = nums[i];
    if (mapped.has(num)) continue;
    mapped.add(num);
    var towArray = nums.slice(i + 1);
    var closest = getTowClosest(towArray, target - num) + num;
    if (Math.abs(closest - target) < Math.abs(result - target)) {
      result = closest;
      if (result === target) break;
    }
  }
  return result;
};


/**
 * ====================== Solution 2 ======================
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 双指针
 */
var threeSumClosest = function(nums, target) {
  nums.sort((n1, n2) => n1 - n2)
  let min = Infinity

  const search = (i, j, base) => {
    while (i < j) {
      const sum = base + nums[i] + nums[j]
      if (Math.abs(target - sum) < Math.abs(target - min)) min = sum
      if (min === target) break

      if (sum > target) {
        j -= 1
      } else {
        i += 1
      }
    }
  }

  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === nums[i - 1]) continue
    search(i + 1, nums.length - 1, nums[i])
    if (min === target) break
  }
  return min
}
