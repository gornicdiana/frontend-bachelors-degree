sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "licenta/utils/AjaxClient", "licenta/utils/URLs"],
    function (Controller, MessageToast, AjaxClient, URLs) {
        "use strict";
        return Controller.extend("licenta.controller.BaseController", {

            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },

            get: function (url, data) {
                return AjaxClient.get(url, data);
            },

            post: function (url, data) {
                return AjaxClient.post(url, data);
            },

            delete: function (url) {
                return AjaxClient.delete(url);
            },

            put: function (url, data) {
                return AjaxClient.put(url, data);
            },

            errorHandler: function (errorMessageName) {
                let msg = this.getView()
                    .getModel("i18n")
                    .getResourceBundle()
                    .getText(errorMessageName);
                MessageToast.show(msg);
            }

        });
    });
