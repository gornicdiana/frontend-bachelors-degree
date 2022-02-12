sap.ui.define([
    "sap/ui/core/mvc/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("licenta.controller.Welcome", {
            onInit: function () {

            },

            goToLogin: function () {
                this.getRouter().navTo("Login");
            },
    
            goToRegister: function () {
                this.getRouter().navTo("Register");
            },
        });
    });
