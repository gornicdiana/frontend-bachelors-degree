sap.ui.define([],

    function () {
        "use strict";
        return {
            get: function (sUrl, data) {
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: sUrl,
                        type: "GET",
                        data: data,
                        success: function (data) {
                            resolve(data);
                        },
                        error: function (xhr, status) {
                            reject(xhr, status);
                        }
                    });
                });
            },

            post: function (sUrl, oBody) {
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: sUrl,
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        data: JSON.stringify(oBody),

                        success: function (data) {
                            resolve(data);
                        },
                        error: function (xhr, status) {
                            reject(xhr, status);
                        }
                    });
                });
            },

            put: function (sUrl, oBody) {
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: sUrl,
                        type: "PUT",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(oBody),
                        success: function (data) {
                            resolve(data);
                        },
                        error: function (xhr, status) {
                            reject(xhr, status);
                        }
                    });
                });
            },

            delete: function (sUrl) {
                var that = this;
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: sUrl,
                        type: "DELETE",
                        success: function (data) {
                            resolve(data);
                        },
                        error: function (xhr, status) {
                            reject(xhr, status);
                        }
                    });
                });
            }
        }
    })