sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs"
], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("licenta.controller.Register", {
        onInit: function () {
            let registerModel = new JSONModel();
            this.getView().setModel(registerModel, "registerModel");
        },

        goToLogin: function () {
            this.getRouter().navTo("Login");
        },

        _isInputValid: function () {
            let inputs = this._getInputFields();
            let noValidationError = true;
            let isValid = true;
            inputs.forEach(sId => {
                isValid = this._validateInput(this.getView().byId(sId).getValue(), sId);
                noValidationError = isValid && noValidationError;
                if (! isValid) {
                    this.getView().byId(sId).setValueState("Error");
                } else {
                    this.getView().byId(sId).setValueState("None");
                }
            });
            return noValidationError;
        },

        _getInputFields: function () {
            return [
                "registrationNumberInput",
                "usernameInput",
                "emailInput",
                "passwordInput",
                "confirmPasswordInput",
            ]
        },

        _validateInput: function (sValue, sId) {
            switch (sId.slice(sId.lastIndexOf("-") + 1)) {
                case "registrationNumberInput":
                    return this._validateRegistrationNumber(sValue);
                case "usernameInput":
                    return this._validateUsername(sValue);
                case "emailInput":
                    return this._validateEmail(sValue);
                case "passwordInput":
                    return this._validatePassword(sValue);
                case "confirmPasswordInput":
                    return this._validateConfirmPassword(sValue);
                default:
                    return false;
            }
        },

        _validateRegistrationNumber: function (sValue) {
            if (sValue.length < 2) {
                return false;
            }
            return true;
        },

        _validateUsername: function (sValue) {
            if (sValue.length < 2) {
                return false;
            }
            return true;
        },

        _validateEmail: function (sValue) {
            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexEmail.test(sValue);
        },

        _validatePassword: function (sValue) {
            const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!-/:-`{-~])[A-Za-z\d!-/:-`{-~]{8,}$/;
            return regexPassword.test(sValue);
        },

        _validateConfirmPassword: function (sValue) {
            let password = this.getView().getModel("registerModel").getProperty("/password");
            if (sValue !== password) {
                return false;
            }
            return true;
        },

        onRegisterUser: function () {
            if (this._isInputValid()) {
                const email = this.byId("emailInput").getValue();
                this._findUserType(email);
            } else {
                this.errorHandler("registerError");
            }
        },

        _findUserType: function (email) {
            let studentUser = email.search("@student");
            if (studentUser != -1) {
                this.onRegisterStudent();
            } else {
                this.errorHandler("AccountNotPermitted");
            }
        },

        onRegisterStudent: function () {
            this.sendRegisterRequest();
            this.getRouter().navTo("Home");
        },

        sendRegisterRequest: function () {
            let registerModel = this.getView().getModel("registerModel").getData();
            const oRegisterData = {
                registrationNumber: registerModel.registrationNumber,
                email: registerModel.email,
                username: registerModel.username,
                password: registerModel.password,
                confirmPassword: registerModel.confirmPassword
            }
            this.post(URLs.postStudentUrl() + "/register", {oRegisterData}).then(data => {
                this.userToken = data;
            }).catch(err => {
                this.errorHandler("registerPostError")
            })
        },

        _emptyFields: function () {
            const aInputs = this._getInputFields();
            aInputs.forEach(sId => {
                this.getView().byId(sId).setValue("");
            })
        }
    });
});
