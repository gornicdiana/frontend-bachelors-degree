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
        },

        getStudentData: async function () {
            const data = await this.get(URLs.getStudentUrl() + "/info", this.userToken);
            this.getView().getModel("studentModel").setProperty("/email", data.email);
            this.getView().getModel("studentModel").setProperty("/username", data.username);
        },

        getAllArticles: async function () {
            const articles = await this.get(URLs.getArticleUrl() + "/allArticles");

            articles.forEach((article) => {
                article.author = '<h5 style="color: #0854A0; font-weight: bold;">' + article.author + '</h5>'
            })
            this.getView().getModel("articleModel").setData(articles);
        },

        getStudentCalendar: async function () {
            const appointments = await this.get(URLs.getAppointmentUrl() + '/studentCalendar', this.userToken);

            appointments.forEach((appointment) => {
                appointment.startDate = new Date(appointment.startDate);
                appointment.endDate = new Date(appointment.endDate);
            })
            this.getView().getModel("appointmentModel").setData(appointments);
        },

        getAllTherapists: async function () {
            const therapists = await this.get(URLs.getTherapistUrl() + "/allTherapists");
            this.getView().getModel("therapistModel").setData(therapists);
        },

        // SPLIT APP PAGES NAVIGATION
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

        onPressContactTherapistFromArticle: function () {},

        // ALL THERAPISTS PAGE
        onPressMakeAppointment: function () {},

        // MY THERAPIST PAGE
        // TO DO: sterge secundele din DateTimePicker
        onCreateAppointment: function () {
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

        // PROFILE PAGE
        onPressLogout: function () {
            this.getRouter().navTo("Welcome");
        }


    });


});
