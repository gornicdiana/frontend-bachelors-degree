sap.ui.define(
  [
    "licenta/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("licenta.controller.HomeTherapist", {
      onInit: function () {
        this.getView().setModel(new JSONModel(), "therapistArticleModel");
        this.getView().setModel(new JSONModel(), "therapistModel");
      },

      onListItemPress: function (oEvent) {
        let pageID = oEvent
          .getParameter("listItem")
          .getCustomData()[0]
          .getValue();
        this.getSplitAppObj().toDetail(this.createId(pageID));
      },

      getSplitAppObj: function () {
        let result = this.byId("homeSplitAppID");
        if (!result) {
          this.errorHandler("splitAppErr");
        }
        return result;
      },

      onPressAddArticle: function () {
        if (!this.pDialog) {
          Fragment.load({
            id: "addArticleDialogID",
            name: "licenta.view.fragments.AddArticleDialog",
            controller: this,
          }).then((oDialog) => {
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
      },

      _createArticleCard: function () {
        const data = this.getView().getModel("therapistArticleModel").getData();
        debugger;
        let cardVBox = this.getView().byId("cardTherapistContentVBoxID");
        let articleContentVBox = new sap.m.VerticalLayout();
        let editButtonVBox = new sap.m.VerticalLayout();
        let articleTag = new sap.m.GenericTag();
        let authorFormattedText = new sap.m.FormattedText({
          htmlText:
            '<h6 style="color: #0854A0; font-weight: bold;">' +
            therapistModel.therapistName +
            "</h6>",
        });
        let contentFormattedText = new sap.m.FormattedText({
          htmlText: "<p>" + therapistArticleModel.articleContent + "</p>",
        });
        articleTag.setText(therapistArticleModel.category);
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
    });
  }
);
