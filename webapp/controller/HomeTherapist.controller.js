sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs", "sap/ui/core/Fragment",
], function (BaseController, JSONModel, URLs, Fragment) {
    "use strict";

    return BaseController.extend("licenta.controller.HomeTherapist", {
        onInit: async function () {
            this.getView().setModel(new JSONModel(), "appointmentDetailsModel");
            this.onSetModels();
            let oRouter = this.getRouter();
            oRouter.getRoute("HomeTherapist").attachPatternMatched(this._onObjectMatched, this);
        },

        // GET DATA
        _onObjectMatched: async function (oEvent) {
            let articleModel = new JSONModel();
            this.getView().setModel(articleModel, "articleModel");
            this.userToken = oEvent.getParameter("arguments").token;
            await this.getTherapistData();
            await this.getTherapistArticles();
            await this.getTherapistCalendar();
        },

        getTherapistData: async function () {
            const getdata = await this.get(URLs.getTherapistUrl() + "/info", this.userToken);
            this.getView().getModel("therapistModel").setProperty("/email", getdata.email);
            this.getView().getModel("therapistModel").setProperty("/username", getdata.username);
            this.getView().getModel("therapistModel").setProperty("/phone", getdata.phone);
            this.getView().getModel("therapistModel").setProperty("/firstname", '<h5 style="color: #0854A0;">' + getdata.firstname + '</h5>');
            this.getView().getModel("therapistModel").setProperty("/lastname", '<h5 style="color: #0854A0; font-weight: bold;">' + getdata.lastname + '</h5>');
        },

        getTherapistArticles: async function () {
            const articles = await this.get(URLs.getArticleUrl() + "/myArticles", this.userToken);
            this.getView().getModel("therapistArticleModel").setData(articles);
        },

        getTherapistCalendar: async function () {
            const appointments = await this.get(URLs.getAppointmentUrl() + '/therapistCalendar', this.userToken);

            appointments.forEach((appointment) => {
                appointment.startDate = new Date(appointment.startDate);
                appointment.endDate = new Date(appointment.endDate);
            })
            this.getView().getModel("appointmentModel").setData(appointments);
        },

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
        // TO DO: STERGE SI EDITEAZA ARTICOLE
        onPressAddArticle: function () {
            if (!this.pDialog) {
                Fragment.load({id: "addArticleDialogID", name: "licenta.view.fragments.AddArticleDialog", controller: this}).then((oDialog) => {
                    this.getView().addDependent(oDialog);
                    this.pDialog = oDialog;
                    this.pDialog.open();
                });
            } else {
                this.pDialog.open();
            }
        },

        onGetSelectedItem: function (oEvent) {
            let newCategory = oEvent.getSource().getSelectedItem().getText();
            this.getView().getModel("articleModel").setProperty("/category", newCategory);
        },

        onSaveArticle: async function (oEvent) {
            const newArticleData = this.getView().getModel("articleModel").getData();
            await this.post(URLs.getArticleUrl() + "/add", newArticleData, this.userToken).then(async (data) => {})
            this.onCloseDialog();
            this.getTherapistArticles();
        },

        onCloseDialog: function () {
            this.pDialog.close();
        },

        // CALENDAR PAGE
        // TO DO: NU ARATA BINE ORA INITIAL IN CALENDAR
        onAppointmentSelect: function (oEvent) {
            let source = oEvent.getSource();
            let appointment = oEvent.getParameter("appointment");
            let startDate = appointment.getStartDate();
            startDate = startDate.toLocaleTimeString();
            let endDate = appointment.getEndDate();
            endDate = endDate.toLocaleTimeString();
            let name = appointment.getTitle();
            debugger;
            this.getView().getModel("appointmentDetailsModel").setProperty("/startDate", startDate);
            this.getView().getModel("appointmentDetailsModel").setProperty("/endDate", endDate);
            this.getView().getModel("appointmentDetailsModel").setProperty("/name", name);
            debugger;
            if (!this.pDetailsPopover) {
                debugger;
                Fragment.load({id: "detailsPopoverID", name: "licenta.view.fragments.AppointmentDetailsPopOver", controller: this}).then((oDetailsPopover) => {
                    this.getView().addDependent(oDetailsPopover);
                    oDetailsPopover.openBy(source);
                });
            } else {
                oDetailsPopover.openBy(source);
            }

        },
        onHeaderDaySelect: function () {},
        onCreateAppointment: function () {},

        handleStartDateChange: function (oEvent) {
            var oStartDate = oEvent.getParameter("date");
        }

    });
});
