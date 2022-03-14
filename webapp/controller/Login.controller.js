sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs", "licenta/utils/Crypt"
],
    function (BaseController, JSONModel, URLs, Crypt) {
        "use strict";

        return BaseController.extend("licenta.controller.Login", {
            onInit: function () {
                let loginModel = new JSONModel();
                this.getView().setModel(loginModel, "loginModel");
            },

            validateEmail: function (inputText) {
                const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regexEmail.test(inputText);
            },

            pressToLogin: async function () {
                const data = this.getView().getModel("loginModel").getData();
                const email = data.loginEmail;
                const password = data.loginPassword;
                debugger;
                if (email == "") {
                    this.errorHandler("emptyMessage");
                } else if (password == "") {
                    this.errorHandler("passwordMessage");
                } else if (!this.validateEmail(email)) {
                    this.errorHandler("emailMessage");
                } else {
                    debugger;
                    await this.getUserData(email, password);
                }
                debugger;
            },

            getUserData: async function (email, password) {
                debugger;
                this.get(URLs.getStudentUrl() + "/login?email=" + email)
                    .then(data => {
                        let user = this.getView().getModel("userModel");
                        const decrypted = Crypt.decrypt(data.password);
                        if (decrypted == password) {
                            user.setData(data);
                            let oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
                            oStore.put("userModel", data);
                            this._updateUser(data.id);
                            this.getRouter().navTo("Home");
                        } else {
                            this.errorHandler("wrongPasswordMessage");
                            this.getView().byId("passwordInput").setValue("");
                        }
                    })
                    .catch(err => {
                        this.errorHandler("errorMessage");
                    });
            },

            goToRegister: function () {
                this.getRouter().navTo("Register");
            }

        });


    });