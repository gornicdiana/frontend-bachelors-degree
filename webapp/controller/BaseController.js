sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "licenta/utils/AjaxClient",
    "licenta/utils/URLs",
], function (Controller, JSONModel, MessageToast, AjaxClient, URLs) {
    "use strict";
    return Controller.extend("licenta.controller.BaseController", {
        onSetModels: function () {
            this.getView().setModel(new JSONModel(), "therapistModel");
            this.getView().setModel(new JSONModel(), "studentModel");
            this.getView().setModel(new JSONModel(), "therapistArticleModel");
            this.getView().setModel(new JSONModel(), "articleModel");
            this.getView().setModel(new JSONModel(), "appointmentModel");
            this.getView().setModel(new JSONModel(), "therapistCardModel");
            this.getView().setModel(new JSONModel(), "therapistProfileModel");
            this.getView().setModel(new JSONModel(), "newAppointmentModel");
            this.userToken = "";
            this.appointmentID = "";
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        get: function (url, data) {
            return AjaxClient.get(url, data);
        },

        post: function (url, data, token) {
            return AjaxClient.post(url, data, token);
        },

        delete: function (url, data, token) {
            return AjaxClient.delete(url, data, token);
        },

        put: function (url, data, token) {
            return AjaxClient.put(url, data, token);
        },

        errorHandler: function (errorMessageName) {
            let msg = this.getView().getModel("i18n").getResourceBundle().getText(errorMessageName);
            MessageToast.show(msg);
        },

        removeChatBot: function () {
            if (document.getElementById("cai-webchat")) {
                document.body.removeChild(document.getElementById("cai-webchat-div"))
            }
        }

    });
});
