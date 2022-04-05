sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs", "sap/ui/core/Fragment",
], function (BaseController, JSONModel, URLs, Fragment) {
    "use strict";

    return BaseController.extend("licenta.controller.HomeTherapist", {
        onInit: async function () {
            this.onSetModels();
            let oRouter = this.getRouter();
            oRouter.getRoute("HomeTherapist").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: async function (oEvent) {
            let articleModel = new JSONModel();
            this.getView().setModel(articleModel, "articleModel");
            this.userToken = oEvent.getParameter("arguments").token;
            await this.getTherapistData();
            await this.getTherapistArticles();
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
        }

        // TO DO: STERGE SI EDITEAZA ARTICOLE
    });
});
