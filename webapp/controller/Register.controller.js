sap.ui.define([
    "licenta/controller/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("licenta.controller.Register", {
            onInit: function () {},

            goToHome: function () {
                this.getRouter().navTo("Home");
            },

            goToLogin: function () {
                this.getRouter().navTo("Login");
            }

        });
    });