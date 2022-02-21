sap.ui.define([
    "licenta/controller/BaseController",
    "sap/ui/core/Fragment",

],
    function (BaseController, Fragment) {
        "use strict";

        return BaseController.extend("licenta.controller.Home", {
            onInit: function () {

                if (!this.articleFragment) {
                    this.articleFragment = this.loadFragment({name: "licenta.view.fragments.ArticlesFragment"});
                }
                this.articleFragment.then(function (oarticleFragment) {
                    oarticleFragment.open();
                });
            },

            onListItemPress: function (oEvent) {
                let sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
                debugger;
                this.getSplitAppObj().toDetail(this.createId(sToPageId));
            },

            getSplitAppObj: function () {
                let result = this.byId("homeSplitAppID");
                if (!result) {
                    this.errorHandler("splitAppErr");
                }
                return result;
            },

        });


    });