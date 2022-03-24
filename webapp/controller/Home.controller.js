sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/core/format/DateFormat", "sap/ui/model/json/JSONModel", "sap/ui/unified/library",

], function (BaseController, DateFormat, JSONModel) {
    "use strict";

    return BaseController.extend("licenta.controller.Home", {
        onInit: function () {
            this.getView().setModel(new JSONModel(), "articleModel");
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
                informationHeader: '<h5 style="color: #0854A0; font-weight: bold;">' + oResourceBundle.getText("informationHeader") + "</h5>"
            });

            this.getView().setModel(therapistCardModel, "therapistCardModel");

            let testDataTherapist = {
                "therapistName": "Doctor Quanda Banks-Montanez",
                "therapistDescription": "anxiety, self-esteem",
                "phoneDetails": "+0123456789",
                "emailDetails": "quandabanks@doctor.upt.ro",
                "information": "I am a Licensed Clinical Mental Health Counselor in the state of North Carolina with over 3 years of experience working as a therapist. I have worked with a wide array of clients that have a board range of concerns such as, depression, anxiety, self-esteem issues and family dynamic distress."
            };

            let testDataArticle = {
                "articleName": "How do you overcome anxiety?",
                "articleCategory": "anxiety",
                "authorName": '<h6 style="color: #0854A0; font-weight: bold;">' + "Doctor Quanda Banks-Montanez" + '</h6>',
                "articleContent": "Fear can create strong signals of response when we`re in emergencies, for instance, if we are caught in a fire or are being attacked It can also take effect when you`re faced with non-dangerous events, like exams, public speaking, a new job, a date, or even a party. It’s a natural response to a threat that can be either perceived or real. Anxiety is a word we use for some types of fear that are usually to do with the thought of a threat or something going wrong in the future, rather than right now. Fear and anxiety can last for a short time and then pass, but they can also last much longer and you can get stuck with them. In some cases they can take over your life, affecting your ability to eat, sleep, concentrate, travel, enjoy life, or even leave the house or go to work or school. This can hold you back from doing things you want or need to do, and it also affects your health. Some people become overwhelmed by fear and want to avoid situations that might make them frightened or anxious. It can be hard to break this cycle, but there are lots of ways to do it. You can learn to feel less fearful and to cope with fear so that it doesn`t stop you from living."
            }
            this.getView().getModel("articleModel").setData(testDataArticle);
            this.getView().getModel("therapistModel").setData(testDataTherapist);
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
            if (! result) {
                this.errorHandler("splitAppErr");
            }
            return result;
        },

        onPressMakeAppointment: function () {},

        onPressCategoryLabel: function () {},

        onPressContactTherapistFromArticle: function () {}

    });


});
