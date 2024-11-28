"use strict";
exports.id = "component---src-pages-profile-js";
exports.ids = ["component---src-pages-profile-js"];
exports.modules = {

/***/ "./src/components/css/profile.module.css":
/*!***********************************************!*\
  !*** ./src/components/css/profile.module.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "profileBox": () => (/* binding */ profileBox),
/* harmony export */   "profileIcon": () => (/* binding */ profileIcon),
/* harmony export */   "profileItem": () => (/* binding */ profileItem),
/* harmony export */   "userJob": () => (/* binding */ userJob),
/* harmony export */   "userName": () => (/* binding */ userName)
/* harmony export */ });
// Exports
var profileBox = "profile-module--profileBox--9f04d";
var profileIcon = "profile-module--profileIcon--39843";
var userName = "profile-module--userName--6e50e";
var userJob = "profile-module--userJob--e60b2";
var profileItem = "profile-module--profileItem--ef5b3";


/***/ }),

/***/ "./src/pages/profile.js?export=default":
/*!*********************************************!*\
  !*** ./src/pages/profile.js?export=default ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_602374650_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/602374650.json */ "./public/page-data/sq/d/602374650.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_css_profile_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/css/profile.module.css */ "./src/components/css/profile.module.css");
/* harmony import */ var _images_profile_img_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/profile_img.jpg */ "./src/images/profile_img.jpg");


// CSS読み込み

// プロフィールアイコン(画像もインポートじゃないと読み込めない)


/**
 * なぜかPageQueryでは動かなかったので↓のStaticQueryに書き換え
*/
const ProfilePage = () => {
  const data = _public_page_data_sq_d_602374650_json__WEBPACK_IMPORTED_MODULE_0__.data;

  // console.log(data,'Profile')
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: _components_css_profile_module_css__WEBPACK_IMPORTED_MODULE_2__.profileBox
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
    className: _components_css_profile_module_css__WEBPACK_IMPORTED_MODULE_2__.profileIcon,
    src: _images_profile_img_jpg__WEBPACK_IMPORTED_MODULE_3__["default"],
    alt: "profile_icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: _components_css_profile_module_css__WEBPACK_IMPORTED_MODULE_2__.userName
  }, " ", data.allSite.edges[0].node.siteMetadata.user.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: _components_css_profile_module_css__WEBPACK_IMPORTED_MODULE_2__.userJob
  }, " ", data.allSite.edges[0].node.siteMetadata.user.job), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: _components_css_profile_module_css__WEBPACK_IMPORTED_MODULE_2__.profileItem
  }, " ", data.allSite.edges[0].node.siteMetadata.profile)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfilePage);

/***/ }),

/***/ "./src/images/profile_img.jpg":
/*!************************************!*\
  !*** ./src/images/profile_img.jpg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/profile_img-8f03c49ada15897ada862f60549be989.jpg");

/***/ }),

/***/ "./public/page-data/sq/d/602374650.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/602374650.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"allSite":{"edges":[{"node":{"siteMetadata":{"user":{"email":"web.tm.mail@gmail.com","job":"プログラマー","name":"taka"},"profile":"\\n    いつでも転職希望の業務経験7年目(2023時点)のエンジニアです。\\n    \\n    仕事の合間にすこしずつ転職活動はしていますが、条件が合う場合ぜひTwitterなどでご連絡頂けると嬉しいです。\\n\\n希望条件は基本的に残業は1日x1h程度。収入は一旦現状維持。\\nある程度で構わないので、保守運用が管理されていて、精神的に安心して働ける環境が良いです。\\n\\n経験言語はHTML、CSS、javascript、PHP、MySQL、Docker、Vuejs、Laravel\\n\\nこのブログは完全に自作で静的ジェネレータで作りました。\\nこの範囲で言えば React.js Gatsby.js GraphQLも経験があります。\\n\\n最近はAIがどう社会に受け入れられ、日常になっていくのかの行く末が気になっています。\\n今までの人生で一番変化を感じて不思議な感覚です。\\n    "}}}]}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-profile-js.js.map