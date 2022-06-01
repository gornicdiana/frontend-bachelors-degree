sap.ui.define([
    "licenta/controller/BaseController",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/m/FormattedText",
    "licenta/utils/URLs",
    "sap/ui/core/Fragment"

], function (BaseController, DateFormat, JSONModel, FormattedText, URLs, Fragment) {
    "use strict";

    return BaseController.extend("licenta.controller.Home", {
        // PAGE INITIALIZATION
        onInit: async function () {
            this.onSetModels();
            let oRouter = this.getRouter();
            oRouter.getRoute("Home").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: async function (oEvent) {
            this.userToken = oEvent.getParameter("arguments").token;
            await this.getStudentData();
            await this.getAllArticles();
            await this.getStudentCalendar();
            await this.getAllTherapists();
            await this.formatTherapistCardsText();
        },

        getStudentData: async function () {
            const data = await this.get(URLs.getStudentUrl() + "/info", this.userToken);
            this.getView().getModel("studentModel").setProperty("/email", data.email);
            this.getView().getModel("studentModel").setProperty("/username", data.username);
        },

        getAllArticles: async function () {
            const articles = await this.get(URLs.getArticleUrl() + "/allArticles");

            // articles.forEach((article) => {
            //     article.author = '<h5 style="color: #0854A0; font-weight: bold;">' + article.author + '</h5>'
            // })
            this.getView().getModel("articleModel").setData(articles);
        },

        getStudentCalendar: async function () {
            const appointments = await this.get(URLs.getAppointmentUrl() + '/studentCalendar', this.userToken);

            appointments.forEach((appointment) => {
                appointment.create = true;
                appointment.startDate = new Date(appointment.startDate);
                appointment.endDate = new Date(appointment.endDate);
            })
            this.getView().getModel("appointmentModel").setData(appointments);
        },

        getAllTherapists: async function () {
            const therapists = await this.get(URLs.getTherapistUrl() + "/allTherapists");
            // therapists.forEach((therapist) => {
            //     therapist.firstname = '<h3 style="color: #0854A0; font-weight: bold;">' + therapist.firstname + '</h3>';
            //     therapist.lastname = '<h3 style="color: #0854A0; font-weight: bold;">' + therapist.lastname + '</h3>';
            // })
            this.getView().getModel("therapistModel").setData(therapists);

        },

        formatTherapistCardsText: async function () {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            let therapistCardModel = this.getView().getModel("therapistCardModel");
            therapistCardModel.contactDetailsHeader = oResourceBundle.getText("contactDetailsHeader"),
            therapistCardModel.name = '<p style="color: #435c78f0; font-size: large;">' + oResourceBundle.getText("name") + '</p>',
            therapistCardModel.phoneHeader = '<p style="color: #435c78f0; font-size: large;">' + oResourceBundle.getText("phoneHeader") + '</p>',
            therapistCardModel.emailHeader = '<p style="color: #435c78f0; font-size: large;">' + oResourceBundle.getText("emailHeader") + '</p>',
            therapistCardModel.informationHeader = '<p style="color: #435c78f0; font-size: large;">' + oResourceBundle.getText("informationHeader") + '</p>'
            this.getView().getModel("therapistCardModel").setData(therapistCardModel);
        },

        // SPLIT APP PAGES NAVIGATION
        onListItemPress: function (oEvent) {
            let pageID = oEvent.getParameter("listItem").getCustomData()[0].getValue();
            this.getSplitAppObj().toDetail(this.createId(pageID));
        },

        getSplitAppObj: function () {
            let result = this.byId("homeSplitAppID");
            if (! result) {
                this.errorHandler("splitAppErr");
            }
            return result;
        },

        // ARTICLES PAGE
        // TO DO: nu se afiseaza frumos tag-urile
        onPressCategoryLabel: function (oEvent) {
            let allArticles = this.getView().getModel("articleModel").getData();
            let category = oEvent.getSource().getProperty("text");

            allArticles.forEach((article) => {
                if (article.category != category) { // this.getView().getModel("articleModel").setProperty("/visible", false);
                    article.visible = false;
                } else { // this.getView().getModel("articleModel").setProperty("/visible", true);
                    article.visible = true;
                }
            })
            this.getView().getModel("articleModel").setData(allArticles);
        },

        onPressAll: function () {
            let allArticles = this.getView().getModel("articleModel").getData();

            allArticles.forEach((article) => {
                article.visible = true;
            })
            this.getView().getModel("articleModel").setData(allArticles);
        },

        _findAuthorOfArticle: function (oEvent) {
            let selectedArticlePath = oEvent.getSource().getBindingContext("articleModel").getPath();
            selectedArticlePath = selectedArticlePath.slice(-1);
            let selectedArticle = this.getView().getModel("articleModel").getData()[selectedArticlePath];
            let therapists = this.getView().getModel("therapistModel").getData();
            therapists.forEach((therapist) => {
                if (therapist.email == selectedArticle.email) {
                    this.getView().getModel("therapistProfileModel").setData(therapist);
                }
            })
        },

        _findTherapist: function (oEvent) {
            debugger;
            let selectedTherapistPath = oEvent.getSource().getBindingContext("articleModel").getPath();
            selectedTherapistPath = selectedTherapistPath.slice(-1);
            let selectedTherapist = this.getView().getModel("articleModel").getData()[selectedTherapistPath].email;
            let therapists = this.getView().getModel("therapistModel").getData();
            therapists.forEach((therapist) => {
                if (therapist.email == selectedTherapist) {
                    debugger;
                    this.getView().getModel("therapistProfileModel").setData(therapist);
                }
            })

        },

        // TO DO: sa nu poti alege alt therapist aici
        onPressContactTherapistFromArticle: function (oEvent) {
            if (oEvent.getSource().getProperty("text") == "Contact Therapist") {
                this._findTherapist(oEvent);
            }
            if (!this.pProfilePopover) {
                Fragment.load({name: "licenta.view.fragments.TherapistProfileDialog", controller: this}).then((oProfilePopover) => {
                    this.pProfilePopover = oProfilePopover;
                    this.getView().addDependent(this.pProfilePopover);
                    this.pProfilePopover.open();
                });
            } else {
                this.pProfilePopover.open();
            }
        },

        onCloseProfileDialog: function () {
            this.pProfilePopover.close();
        },

        // ALL THERAPISTS PAGE
        // TO DO: sa nu apara make appointment in dialogul cu profile aici
        onPressMakeAppointment: function () {
            if (!this.pCreatePopover) {
                Fragment.load({name: "licenta.view.fragments.CreateAppointmentDialog", controller: this}).then((oCreatePopover) => {
                    this.pCreatePopover = oCreatePopover
                    this.getView().addDependent(this.pCreatePopover);
                    this.pCreatePopover.open();
                });
            } else {
                this.pCreatePopover.open();
            }
        },

        onCloseAppointmentDialog: function () {
            this.pCreatePopover.close();
        },

        onSaveNewAppointment: async function (oEvent) {
            const newAppointmentData = this.getView().getModel("newAppointmentModel").getData();
            let allTherapists = this.getView().getModel("therapistModel").getData();
            allTherapists.forEach((therapist) => {
                if ((therapist.lastname + " " + therapist.firstname) === newAppointmentData.therapist) {
                    newAppointmentData.therapist = therapist.email;
                }
            })
            await this.post(URLs.getAppointmentUrl() + "/add", newAppointmentData, this.userToken).then(async (data) => {
                console.log(data);
            });
            this.onCloseAppointmentDialog();
            this.getStudentCalendar();
        },

        // PROFILE PAGE
        onPressLogout: function () {
            this.getRouter().navTo("Welcome");
        }


    });


});
