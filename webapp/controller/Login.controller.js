sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs", "licenta/utils/Crypt",
], function (BaseController, JSONModel, URLs, Crypt) {
    "use strict";

    return BaseController.extend("licenta.controller.Login", {
        onInit: function () {
            this.onSetModels();
            let loginModel = new JSONModel();
            this.getView().setModel(loginModel, "loginModel");
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
            let existentStudent = await this.loginStudent(data);
            if (existentStudent) {
                this.getRouter().navTo("Home");
            } else {
                this.errorHandler("StudentNotExist");
            }
        },

        loginStudent: async function (userData) {
            let res;
            await this.post(URLs.getStudentUrl() + "/login", userData).then(async (data) => {
                this.userToken = data;
                this.getStudentData();
                res = true;
            }).catch(async (err) => {
                this.errorHandler("errorMessage");
                res = false;
            });
            return res;
        },

        getStudentData: function () {
            this.get(URLs.getStudentUrl() + "/info", this.userToken).then((data) => {
                this.getView().getModel("studentModel").setProperty("/email", data.email);
                this.getView().getModel("studentModel").setProperty("/username", data.username);
            });
        },

        onLoginTherapist: async function () {
            const data = this.getView().getModel("loginModel").getData();
            let existentTherapist = await this.loginTherapist(data);
            if (existentTherapist) {
                this.getRouter().navTo("HomeTherapist", {token: this.userToken});
            } else {
                this.errorHandler("TherapistNotExist");
            }
        },

        loginTherapist: async function (userData) {
            let res;
            const loginUser = await this.post(URLs.getTherapistUrl() + "/login", userData);
            this.userToken = loginUser;

            res = true;
            return res;
        },

        goToRegister: function () {
            this.getRouter().navTo("Register");
        }
    });
});
