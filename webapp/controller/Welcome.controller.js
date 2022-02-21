sap.ui.define([
    "licenta/controller/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("licenta.controller.Welcome", {
        
            goToLogin: function () {
                this.getRouter().navTo("Login");
            },
    
            goToRegister: function () {
                this.getRouter().navTo("Register");
            },
        });
    });
