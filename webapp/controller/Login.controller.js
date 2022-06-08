sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs", "licenta/utils/Crypt",
], function (BaseController, JSONModel, URLs, Crypt) {
    "use strict";

    return BaseController.extend("licenta.controller.Login", {
        onInit: async function () {
            this.onSetModels();
            let loginModel = new JSONModel();
            this.getView().setModel(loginModel, "loginModel");
            let oRouter = this.getRouter();
            oRouter.getRoute("Login").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: async function (oEvent) {
            this.removeChatBot();
            this.clearFields();
        },

        clearFields: function () {
            let loginModel = this.getView().getModel("loginModel").getData();
            debugger;
            if (loginModel.email != "undefined" && loginModel.password != "undefined") {
                debugger;
                this.getView().getModel("loginModel").setProperty("/email", "");
                this.getView().getModel("loginModel").setProperty("/password", "");
            }
        },

        onGoBackToWelcome: function () {
            this.getRouter().navTo("Welcome");
        },

        pressToLogin: function () {
            const data = this.getView().getModel("loginModel").getData();
            const email = data.email;
            const password = data.password;
            if (email == undefined) {
                this.errorHandler("emptyMessage");
            } else if (password == undefined) {
                this.errorHandler("passwordMessage");
            } else if (!this._validateEmail(email)) {
                this.errorHandler("emailMessage");
            } else {
                this._findUserType(email);
            }
        },

        _validateEmail: function (inputText) {
            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexEmail.test(inputText);
        },

        _findUserType: function (email) {
            let studentUser = email.search("@student.upt");
            let therapistUser = email.search("@cs.upt.ro");
            if (studentUser != -1) {
                this.onLoginStudent();
            } else if (therapistUser != -1) {
                this.onLoginTherapist();
            } else {
                this.errorHandler("AccountNotPermitted");
            }
        },

        onLoginStudent: async function () {
            const data = this.getView().getModel("loginModel").getData();

            this.post(URLs.getStudentUrl() + "/login", data).then(data => {
                this.userToken = data;
                this.getRouter().navTo("Home", {token: this.userToken});
            }).catch(err => {
                this.errorHandler("wrongAccount")
            })
        },

        onLoginTherapist: async function () {
            const data = this.getView().getModel("loginModel").getData();
            this.post(URLs.getTherapistUrl() + "/login", data).then(data => {
                this.userToken = data;
                this.getRouter().navTo("HomeTherapist", {token: this.userToken});
            }).catch(err => {
                this.errorHandler("wrongAccount")
            })
        },

        goToRegister: function () {
            this.getRouter().navTo("Register");
        }
    });
});
