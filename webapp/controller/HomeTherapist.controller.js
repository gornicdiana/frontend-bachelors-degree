sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/model/json/JSONModel", "licenta/utils/URLs", "sap/ui/core/Fragment",
], function (BaseController, JSONModel, URLs, Fragment) {
    "use strict";

    return BaseController.extend("licenta.controller.HomeTherapist", {
        onInit: async function () {
            this.onSetModels();
            let oRouter = this.getRouter();
            oRouter.getRoute("HomeTherapist").attachPatternMatched(this._onObjectMatched, this);
            debugger;

        },

        _onObjectMatched: async function (oEvent) {
            debugger;
            this.userToken = oEvent.getParameter("arguments").token;
            await this.getTherapistData();
            await this.getTherapistArticles();
            await this.initializeExistentArticles();
        },

        getTherapistData: async function () {
            const getdata = await this.get(URLs.getTherapistUrl() + "/info", this.userToken);
            this.getView().getModel("therapistModel").setProperty("/email", getdata.email);
            this.getView().getModel("therapistModel").setProperty("/username", getdata.username);
            this.getView().getModel("therapistModel").setProperty("/phone", getdata.phone);
            this.getView().getModel("therapistModel").setProperty("/firstname", getdata.firstname);
            this.getView().getModel("therapistModel").setProperty("/lastname", getdata.lastname);
        },

        getTherapistArticles: async function () {
            const articles = await this.get(URLs.getArticleUrl() + "/myArticles", this.userToken);
            this.getView().getModel("therapistArticleModel").setData(articles);
        },

        initializeExistentArticles: async function () {
            debugger;
            let myArticles = this.getView().getModel("therapistArticleModel").getData();
            debugger;
            myArticles.forEach((article) => {
                Fragment.load({id: "therapistArticleCardID", name: "licenta.view.fragments.ArticleTherapistCard", controller: this}).then(this._createArticleCard(article))
            });
        },

        _createArticleCard: function (article) {
            let therapist = this.getView().getModel("therapistModel").getData();
            let cardVBox = this.byId("cardTherapistContentVBoxID");
            debugger;
            let articleContentVBox = new sap.m.VBox();
            let editButtonVBox = new sap.m.VBox();
            let articleTag = new sap.m.GenericTag();
            let authorFormattedText = new sap.m.FormattedText({
                htmlText: '<h6 style="color: #0854A0; font-weight: bold;">' + therapist.therapistName + "</h6>"
            });
            let contentFormattedText = new sap.m.FormattedText({
                htmlText: "<p>" + article.articleContent + "</p>"
            });
            articleTag.setText(article.category);
            articleTag.setDesign("StatusIconHidden");
            articleTag.setStatus("Information");
            articleTag.addStyleClass("sapUiSmallMarginBottom");

            articleContentVBox.addStyleClass("sapUiSmallMargin");
            articleContentVBox.addItem(articleTag);
            articleContentVBox.addItem(authorFormattedText);
            articleContentVBox.addDependent(contentFormattedText);

            editButtonVBox.addStyleClass("sapUiSmallMargin");

            cardVBox.addItem(articleTag);
            cardVBox.addItem(articleContentVBox);
            cardVBox.addItem(editButtonVBox);
        },

        onSaveAddArticle: function (oEvent) {
            this._createArticleCard();
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

        onCloseDialog: function () {
            this.pDialog.close();
        }
    });
});
