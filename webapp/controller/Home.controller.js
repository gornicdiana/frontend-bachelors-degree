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

            onBeforeRendering: function () {
                this.onInitUI();
            },

            onInitUI: function () {
                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                debugger;
                let therapistCardModel = new JSONModel({
                    contactDetailsHeader: '<h5 style="color: #0854A0; font-weight: bold;">' + oResourceBundle.getText("contactDetailsHeader") + "</h5>",
                    phoneHeader: '<p style="color: #6A6D70;">' + oResourceBundle.getText("phoneHeader") + "</p>",
                    emailHeader: '<p style="color: #6A6D70;">' + oResourceBundle.getText("emailHeader") + "</p>",
                    informationHeader: '<h5 style="color: #0854A0; font-weight: bold;">' + oResourceBundle.getText("informationHeader") + "</h5>",
                });

                this.getView().setModel(therapistCardModel, "therapistCardModel");

                let testDataTherapist = {
                    "therapistName" : "Doctor Quanda Banks-Montanez",
                    "therapistDescription": "anxiety, self-esteem",
                    "phoneDetails": "+0123456789",
                    "emailDetails": "quandabanks@doctor.upt.ro",
                    "information": "I am a Licensed Clinical Mental Health Counselor in the state of North Carolina with over 3 years of experience working as a therapist. I have worked with a wide array of clients that have a board range of concerns such as, depression, anxiety, self-esteem issues and family dynamic distress.",
                };
                this.getView().getModel("therapistModel").setData(testDataTherapist);
                debugger;
                // this.getView().getModel("therapistModel").setProperty("therapistName");
                // this.getView().getModel("therapistModel").setProperty("therapistDescription");
                // this.getView().getModel("therapistModel").setProperty("phoneDetails");
                // this.getView().getModel("therapistModel").setProperty("emailDetails");
                // this.getView().getModel("therapistModel").setProperty("information");

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