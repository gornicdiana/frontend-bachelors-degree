sap.ui.define(["licenta/controller/BaseController"], function (BaseController) {
    "use strict";

    return BaseController.extend("licenta.controller.Welcome", {

        onInit: async function () {
            let oRouter = this.getRouter();
            oRouter.getRoute("Welcome").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: async function (oEvent) {
            this.removeChatBot();
        },

        goToLogin: function () {
            this.getRouter().navTo("Login");
        },

        goToRegister: function () {
            this.getRouter().navTo("Register");
        }
    });
});
