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

        _findUserType: function (email) {
            let studentUser = email.search("@student.upt");
            let therapistUser = email.search("@cs.upt.ro");
            debugger;
            if (studentUser != -1) {
                this.onLoginStudent();
                debugger;
            } else if (therapistUser != -1) {
                this.onLoginTherapist();
            } else {
                this.errorHandler("AccountNotPermitted");
            }
        },

        onLoginStudent: async function () {
            const data = this.getView().getModel("loginModel").getData();
            let existentStudent = await this.loginUser(data);
            if (existentStudent == true) {
                this.getRouter().navTo("Home");
            } else {
                errorHandler("StudentNotExist");
            }
        },

        onLoginTherapist: async function () {
            const data = this.getView().getModel("loginModel").getData();
            let existentTherapist = await this.loginUser(data);
            if (existentTherapist == true) {
                this.getRouter().navTo("HomeTherapist");
            } else {
                errorHandler("TherapistNotExist");
            }
        },

        pressToLogin: function () {
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
                this._findUserType(email);
            }
        },

        loginUser: async function (userData) {
            debugger;
            this.post(URLs.getStudentUrl() + "/login", {userData}).then(data => {
                debugger;
                this.userToken = data;
            }).catch(err => {
                this.errorHandler("errorMessage");
                return false;
            });
            debugger;
            return true;
        },

        goToRegister: function () {
            this.getRouter().navTo("Register");
        }

    });


});
