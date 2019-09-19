'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_X = 140;
var BAR_Y = 85;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TOTAL_BAR_WIDTH = BAR_WIDTH + BAR_GAP;
var RED = 'rgba(255, 0, 0, 1)';
var WHITE = '#fff';
var BLACK = '#000';
var BLACK_70 = 'rgba(0, 0, 0, 0.7)';
var TEXT_AXIS_X = 130;
var TEXT_AXIS_Y = 40;
var TEXT_Y_GAP = 20;

/**
 * Функция выводит на экран облако
 * @param {object} ctx
 * @param {number} x
 * @param {number} y
 * @param {string}  color
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
/**
 * Функция выводит на экран текст поздравления
 * @param {object} ctx
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {string} font
 * @param {string} color
 */
var renderText = function (ctx, text, x, y, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

/**
 *Функция определяет максимальный элемент в массиве
 * @param {array} arr
 * @return {number} максимальный элемент
 */

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

/**
 * Функция выводит произвольное значение насыщенности
 * @param {number} max
 * @param {number} min
 * @return {number} saturation
 */

var getRandomSaturation = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Функция выводит статистику на экран при победе
 * @param {object} ctx
 * @param {array} names
 * @param {array} times
 */

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, BLACK_70);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE);

  renderText(ctx, 'Ура, вы победили!', TEXT_AXIS_X, TEXT_AXIS_Y, '16px PT Mono', BLACK);
  renderText(ctx, 'Список результатов:', TEXT_AXIS_X, TEXT_AXIS_Y + TEXT_Y_GAP, '16px PT Mono', BLACK);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = BLACK;
    ctx.fillText(names[i], CLOUD_X + (GAP * 4) + TOTAL_BAR_WIDTH * i, BAR_Y + BAR_HEIGHT + GAP * 3);
    ctx.fillText(Math.round(times[i]), CLOUD_X + (GAP * 4) + TOTAL_BAR_WIDTH * i, BAR_Y);


    if (names[i] === 'Вы') {
      var barColor = RED;
    } else {
      barColor = 'hsl(' + 240 + ',' + getRandomSaturation(0, 101) + '%,' + 50 + '%)';
    }
    ctx.fillStyle = barColor;
    var barHeightProportion = BAR_HEIGHT * times[i] / maxTime;
    var barAxisX = BAR_X + TOTAL_BAR_WIDTH * i;
    var barAxisY = BAR_Y + GAP + BAR_HEIGHT - barHeightProportion;
    ctx.fillRect(barAxisX, barAxisY, BAR_WIDTH, barHeightProportion);
  }
};
