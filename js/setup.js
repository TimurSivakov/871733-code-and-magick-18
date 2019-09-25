'use strict';

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupPlayer = setup.querySelector('.setup-player');
var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardCoatInput = setupPlayer.querySelector('input[name="coat-color"]');
var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
var wizardEyesInput = setupPlayer.querySelector('input[name="eyes-color"]');
var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballInput = setupFireball.querySelector('input');
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_ARRAY_LENGTH = 4;
var SetupSimilar = document.querySelector('.setup-similar');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

/**
 * Функция удаляет у элемента класс .hidden
 * @param {{}} className
 * @return {void} возвращает элемент без класса .hidden
 */
var setupFunction = function (className) {
  return className.classList.remove('hidden');
};

/**
 * Функция возвращает рандомный элемент из массива характеристик волшебника
 * @param {*[]} parameters
 * @return {string} возвращает элемент массива
 */
var getRandomArrayElement = function (parameters) {
  return parameters[Math.floor(Math.random() * parameters.length)];
};

/**
 * @typedef {{
 *   coatColor: string,
 *   eyesColor: string,
 *   name: string
 * }} Wizard
 */

/**
 * Функция создает массив волшебников, сгенерированных случайным образом
 * @param {string[]} firstNames массив имен волшебника
 * @param {string[]} lastNames массив фамилий волшебника
 * @param {string[]} coatColors массив цветов плаща волшебника
 * @param {string[]} eyesColors массив цветов глаз волшебника
 * @return {Wizard[]} массив из волшебников.
 */
var generateWizardsArray = function (firstNames, lastNames, coatColors, eyesColors) {
  var wizards = [];
  for (var i = 0; i < WIZARDS_ARRAY_LENGTH; i++) {
    var wizard = {
      name: getRandomArrayElement(firstNames) + ' ' + getRandomArrayElement(lastNames),
      coatColor: getRandomArrayElement(coatColors),
      eyesColor: getRandomArrayElement(eyesColors)
    };
    wizards.push(wizard);
  }
  return wizards;
};

/**
 * Создает новый узел с дополнительными атрибутами
 * @param {Wizard} wizard
 * @return {Node}
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Функция закрывает popup по нажатию на кнопку Esc
 * @param {{}} evt
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

/**
 * Функция открывает popup
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/**
 * Функция закрывает popup
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
/**
 * Функция меняет цвет у выбранного параметра волшебника в окне настроек персонажа
 * @param {HTMLElement|Element} wizardItem Элемент, у которого будет меняться цвет
 * @param {string[]} color массив цветов
 * @param {HTMLElement|Element} input скрытое поле ввода
 * @param {string} inputProperty свойство, через которое меняется цвет
 */
var changeSetupWizardsColor = function (wizardItem, color, input, inputProperty) {
  var wizardItemColor = getRandomArrayElement(color);
  wizardItem['style'][inputProperty] = wizardItemColor;
  input.value = wizardItemColor;
};

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', function () {
  changeSetupWizardsColor(setupWizardCoat, WIZARDS_COLORS, wizardCoatInput, 'fill');
});

setupWizardEyes.addEventListener('click', function () {
  changeSetupWizardsColor(setupWizardEyes, EYES_COLORS, wizardEyesInput, 'fill');
});

setupFireball.addEventListener('click', function () {
  changeSetupWizardsColor(setupFireball, FIREBALL_COLORS, fireballInput, 'backgroundColor');
});

var fragment = document.createDocumentFragment();
var wizards = generateWizardsArray(FIRST_NAMES, LAST_NAMES, WIZARDS_COLORS, EYES_COLORS);
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
setupFunction(SetupSimilar);

