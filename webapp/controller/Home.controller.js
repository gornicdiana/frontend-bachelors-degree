sap.ui.define([
    "licenta/controller/BaseController",
    "sap/ui/core/format/DateFormat",
	"sap/ui/model/json/JSONModel",
	"sap/ui/unified/library",

],
    function (BaseController, DateFormat, JSONModel) {
        "use strict";

        return BaseController.extend("licenta.controller.Home", {
            onInit: function () {
            },

            onListItemPress: function (oEvent) {
                let pageID = oEvent.getParameter("listItem").getCustomData()[0].getValue();
                this.getSplitAppObj().toDetail(this.createId(pageID));
            },
            
            onPressGoToMyTherapist: function () {
                this.getSplitAppObj().toMaster(this.createId("masterMyTherapist"));
            },
    
            onPressMasterBack: function () {
                this.getSplitAppObj().backMaster();
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