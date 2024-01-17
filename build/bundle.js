/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _API_rest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _components_modals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _public_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);





const body = document.querySelector('body');

//modals
const modal = document.querySelector('.modal-confirmation');
const modalOverlay = document.querySelector('.overlay');

body.addEventListener('click', _components_modals_js__WEBPACK_IMPORTED_MODULE_2__.showConfirmationModal);
body.addEventListener('click', _components_modals_js__WEBPACK_IMPORTED_MODULE_2__.hideAllModals);
modal.addEventListener('click', _components_modals_js__WEBPACK_IMPORTED_MODULE_2__.deleteProduct);

// form
const form = document.querySelector('form');
form.addEventListener('click', _components_form_js__WEBPACK_IMPORTED_MODULE_1__.validateForm);

// calendar grid
const calendar = document.querySelector('.calendar');
const addBtn = document.querySelector('.header__add-button');

calendar.addEventListener('click', displayProductDetails);
addBtn.addEventListener('click', _components_form_js__WEBPACK_IMPORTED_MODULE_1__.handleForm);

const data = await _API_rest_js__WEBPACK_IMPORTED_MODULE_0__.rest.get();

if (data) {
  renderProductCards(data);
}

function renderProductCards(data) {
  const calendarContainers = document.querySelectorAll('.calendar__container');

  data.map((productFromDB) => {
    productFromDB.days.map((weekdayFromDB) => {
      calendarContainers.forEach((calendarDay, index) => {
        if (weekdayFromDB === calendarDay.classList[1]) {
          const { name, type, _id } = productFromDB;

          let card = `
         <button class="card" id="${_id}">
          <p>${name}</p>
          <p>${type}</p>
         </button>`;

          calendarContainers[index].innerHTML += card;
        }
      });
    });
  });
}

function displayProductDetails(e) {
  const id = e.target.id;
  localStorage.setItem('pId', id);

  const product = data.find(({ _id }) => _id === id);

  if (product) {
    modalOverlay.classList.add('active');
    modal.classList.add('active');

    modal.innerHTML = `
   <p>${product.name}</p>
   <p>${product.type}</p>
   <p>${product.days}</p>
   <button class="product-card__delete-button">Remove product</button>
   <button class="modal__cancel-button">Cancel</button>
 `;
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rest: () => (/* binding */ rest)
/* harmony export */ });
const rest = {
  get: async function () {
    return fetch(`/api/routine`)
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.error('Error:', error));
  },
  post: function (product) {
    const config = {
      method: 'post',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json',
      },
    };

    fetch(`/api/routine/`, config)
      .then((response) => {
        console.log('Success:', response);
        return response.json();
      })
      .catch((error) => console.error('Error:', error));
  },
  delete: function (id) {
    const config = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      },
    };

    fetch(`/api/routine/${id}`, config)
      .then((response) => {
        console.log('Success:', response);
        return response.json();
      })
      .catch((error) => console.error('Error:', error));
  },
};


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addNewProduct: () => (/* binding */ addNewProduct),
/* harmony export */   handleForm: () => (/* binding */ handleForm),
/* harmony export */   validateForm: () => (/* binding */ validateForm)
/* harmony export */ });
/* harmony import */ var _API_rest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



const form = document.querySelector('form');
const modalOverlay = document.querySelector('.overlay');

function handleForm(e) {
  form.classList.add('active');
  modalOverlay.classList.add('active');

  if ((0,_utils_styling__WEBPACK_IMPORTED_MODULE_1__.targetHasClass)(e.target, 'form__close-button')) {
    form.classList.remove('active');
    modalOverlay.classList.remove('active');
  }
}

function validateForm(e) {
  if ((0,_utils_styling__WEBPACK_IMPORTED_MODULE_1__.targetHasClass)(e.target, 'form__submit-button')) {
    const { product_name, product_type, exp_date } = form;
    if (
      product_name.value === '' ||
      product_type.value === '' ||
      exp_date.value === ''
    ) {
      e.preventDefault();
      document.querySelector('.alert').textContent =
        'Completa todos los campos';
    } else {
      addNewProduct(e);
    }
  }
}

function addNewProduct(e) {
  const newProduct = {
    name: e.target.form.product_name.value,
    type: e.target.form.product_type.value,
    date: e.target.form.exp_date.value.toString(),
    days: [],
  };

  const daysOfUseCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );

  for (let checkbox of daysOfUseCheckboxes) {
    if (checkbox.checked) {
      newProduct.days.push(checkbox.value);
    }
  }
  _API_rest__WEBPACK_IMPORTED_MODULE_0__.rest.post(newProduct);
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   targetHasClass: () => (/* binding */ targetHasClass)
/* harmony export */ });
const targetHasClass = (target, className) =>
  target.classList.contains(className);


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),
/* harmony export */   hideAllModals: () => (/* binding */ hideAllModals),
/* harmony export */   showConfirmationModal: () => (/* binding */ showConfirmationModal)
/* harmony export */ });
/* harmony import */ var _utils_styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _API_rest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



const modalConfirmation = document.querySelector('.modal-confirmation');
const modalProduct = document.querySelector('.modal-product');
const modalOverlay = document.querySelector('.overlay');

function showConfirmationModal(e) {
  if ((0,_utils_styling__WEBPACK_IMPORTED_MODULE_0__.targetHasClass)(e.target, 'product-card__delete-button')) {
    modalProduct.classList.remove('active');
    modalConfirmation.classList.add('active');

    modalConfirmation.innerHTML = `
     <p>¿Estás seguro/a?</p>
     <button type="button" class="modal__delete-button">
       Eliminar producto
     </button>
     <button type="button" class="modal__cancel-button">Cancelar</button>
   `;
  }
}

function hideAllModals(e) {
  if ((0,_utils_styling__WEBPACK_IMPORTED_MODULE_0__.targetHasClass)(e.target, 'modal__cancel-button')) {
    modalConfirmation.remove('active');
    modalProduct.classList.remove('active');
    modalOverlay.classList.remove('active');
  }
}

async function deleteProduct(e) {
  let id = localStorage.getItem('pId');

  if ((0,_utils_styling__WEBPACK_IMPORTED_MODULE_0__.targetHasClass)(e.target, 'modal__delete-button') && id) {
    let productToDelete = document.querySelectorAll(`[id="${id}"]`);

    if (productToDelete.length) {
      productToDelete.forEach((item) => {
        item.remove();
        _API_rest__WEBPACK_IMPORTED_MODULE_1__.rest.delete(item.id);
      });

      localStorage.removeItem('pId');

      modalConfirmation.classList.remove('active');
      modalOverlay.classList.remove('active');
    }
  }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 7 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fonts_simplicity_ttf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _fonts_Misses_otf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_fonts_simplicity_ttf__WEBPACK_IMPORTED_MODULE_2__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_fonts_Misses_otf__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0px;\n  padding: 0px;\n  text-align: center;\n  font-size: 16px;\n}\n\n@font-face {\n  font-family: 'Simplicity';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n  font-family: 'Misses';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n.top-bar {\n  position: absolute;\n  top: 0;\n\n  width: 100%;\n  max-height: 4rem;\n\n  background-color: AF3364;\n}\n\nheader {\n  h1 {\n    text-align: center;\n    font-family: 'Misses';\n    font-size: 50px;\n    line-height: 0em;\n    margin-bottom: 1em;\n  }\n\n  img {\n    margin-top: 1rem;\n    width: 3rem;\n  }\n}\n\nbutton {\n  margin-top: 1em;\n  padding: 20px 15px;\n  border: none;\n  border-radius: 5px;\n}\n\n& button:hover {\n  background-color: #990637;\n  color: white;\n  border: none;\n  cursor: grabbing;\n}\n\n.calendar {\n  margin: 2em 0.5em;\n  width: 98vw;\n  gap: 0.5em;\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n}\n.calendar div {\n  background-color: #f5f4e8;\n  border-radius: 15px;\n}\n.calendar .calendar__day-title {\n  height: 3em;\n  display: grid;\n  align-content: center;\n}\n.calendar .calendar__container {\n  min-height: 55vh;\n  height: fit-content;\n  align-items: start;\n}\n\n.card {\n  word-wrap: break-word;\n  position: relative;\n  background-color: #990637;\n  border-radius: 10px;\n  max-width: 80%;\n  height: fit-content;\n  color: white;\n  margin: 0.5em auto;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n\n  p {\n    pointer-events: none;\n  }\n\n  .date {\n    display: none;\n  }\n}\n.card p:last-of-type {\n  font-size: 0.8em;\n}\n.card i {\n  font-size: 0.8em;\n  position: absolute;\n  margin: 0.3em;\n  right: 0.5em;\n  color: #f5f4e8;\n  opacity: 0.3;\n}\n\nform {\n  position: fixed;\n  display: none;\n  z-index: 11;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  top: 10%;\n  background-color: #c7c5c5;\n  color: black;\n  width: 15em;\n  padding: 1em;\n  border-radius: 20px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n\n  &.active {\n    display: block;\n  }\n}\nform button {\n  width: fit-content;\n  justify-self: center;\n  margin: 0.5em;\n}\nform .form__close-button {\n  background-color: transparent;\n  border: none;\n  padding: 0;\n  right: 5%;\n  top: 1%;\n  position: absolute;\n}\nform .form__close-button:focus {\n  outline: 0;\n}\nform .form__close-button i {\n  pointer-events: none;\n}\nform input {\n  border-radius: 10px;\n  border: none;\n  width: 90%;\n  justify-self: center;\n  margin: 10px;\n}\nform input[type='checkbox'] {\n  margin: 20px 0;\n  width: 20px;\n}\nform i {\n  position: relative;\n  justify-self: end;\n  margin-bottom: 0.5em;\n  color: #909090;\n}\nform i:hover {\n  color: #990637;\n}\nform .alert {\n  background-color: #990637;\n  border-radius: 15px;\n  color: beige;\n  margin: 0.5em;\n}\n\n.modal {\n  background-color: #c7c5c5;\n  display: none;\n  padding: 2em;\n  position: fixed;\n  width: 40%;\n  z-index: 11;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  top: 15%;\n  border-radius: 20px;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n\n  &.active {\n    display: block;\n  }\n}\n\n.overlay {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 100vh;\n  width: 100vw;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1;\n\n  &.active {\n    display: block;\n  }\n}\n\n@media screen and (max-width: 1020px) {\n  .calendar {\n    margin: auto;\n    margin-top: 2em;\n    grid-template-columns: 1fr;\n    width: 70vw;\n    height: auto;\n  }\n\n  .card {\n    width: 100%;\n  }\n  .card i {\n    left: 88%;\n  }\n\n  .modal {\n    width: 60%;\n  }\n\n  .monday {\n    grid-row-start: 2;\n  }\n\n  .tuesday {\n    grid-row-start: 4;\n  }\n\n  .wednesday {\n    grid-row-start: 6;\n  }\n\n  .thursday {\n    grid-row-start: 8;\n  }\n\n  .friday {\n    grid-row-start: 10;\n  }\n\n  .saturday {\n    grid-row-start: 12;\n  }\n}\n@media screen and (max-width: 425px) {\n  .header__add-button,\n  .header__reset-button {\n    display: block;\n    margin: auto;\n    margin-top: 0.5em;\n  }\n}\n\n.product-modal {\n  display: none;\n  position: absolute;\n  z-index: 2;\n  background-color: pink;\n  width: 300px;\n  height: 500px;\n\n  &.active {\n    display: block;\n  }\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 8 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 9 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/simplicity.ttf");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/Misses.otf");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;