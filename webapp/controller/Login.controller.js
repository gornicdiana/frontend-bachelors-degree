sap.ui.define([
    "licenta/controller/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("licenta.controller.Login", {
            onInit: function () {},


            goToHome: function () {
                this.getRouter().navTo("Home");
                
            },

            goToRegister: function () {
                this.getRouter().navTo("Register");
            }

        });


    });