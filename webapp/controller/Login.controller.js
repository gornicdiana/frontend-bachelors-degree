sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs", "licenta/utils/Crypt"
], function (BaseController, JSONModel, URLs, Crypt) {
    "use strict";

    return BaseController.extend("licenta.controller.Login", {
        onInit: function () {
            let loginModel = new JSONModel();
            this.getView().setModel(loginModel, "loginModel");
        },

        _validateEmail: function (inputText) {
            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexEmail.test(inputText);
        },

        pressToLogin: async function () {
            const data = this.getView().getModel("loginModel").getData();
            const email = data.email;
            const password = data.password;
            if (email == "") {
                this.errorHandler("emptyMessage");
            } else if (password == "") {
                this.errorHandler("passwordMessage");
            } else if (!this._validateEmail(email)) {
                this.errorHandler("emailMessage");
            } else {
                await this.loginUser(data);
            }
        },

        loginUser: async function (userData) {
            this.post(URLs.getStudentUrl() + "/login", {userData}).then(data => {
                this.userToken = data;
                this.getRouter().navTo("Home");

            }).catch(err => {
                this.errorHandler("errorMessage");
            });
        },

        goToRegister: function () {
            this.getRouter().navTo("Register");
        }

    });


});
