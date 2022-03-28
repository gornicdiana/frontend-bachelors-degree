sap.ui.define([
    "licenta/controller/BaseController", "sap/ui/core/Fragment", "sap/ui/richtexteditor/RichTextEditor"
], function (BaseController, Fragment, RichTextEditor) {
    "use strict";

    return BaseController.extend("licenta.controller.HomeTherapist", {

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

        _onCreateRichText: function () {
            let oRichTextEditor = new RichTextEditor("articleRTE", {
                width: "100%",
                height: "300px",
                showGroupClipboard: true,
                showGroupStructure: true,
                showGroupFont: true,
                showGroupInsert: true,
                showGroupLink: true,
                showGroupUndo: true
            });
            Fragment.byId("addArticleFragmentID", "richTextEditorID").addItem(oRichTextEditor);
        },

        onPressAddArticle: function () {
            let oView = this.getView();
            if (!this.pDialog) {
                this.pDialog = Fragment.load({id: "addArticleFragmentID", name: "licenta.view.fragments.ArticleRichTextDialog", controller: this}).then((oDialog) => {
                    oView.addDependent(oDialog);
                    this._onCreateRichText();
                    return oDialog;
                });
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            this.byId("addProductDialog").close();
        },

        onSaveAddArticle: function (oEvent) {
            debugger;
        }

    });
});
