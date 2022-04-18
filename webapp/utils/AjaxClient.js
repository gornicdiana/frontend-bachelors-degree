sap.ui.define([], function () {
    "use strict";
    return {
        get: function (sUrl, token, data) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: sUrl,
                    type: "GET",
                    data: data,
                    headers: {
                        authorization: token
                    },
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (xhr, status) {
                        reject(xhr, status);
                    }
                });
            });
        },

        post: function (sUrl, data, token) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: sUrl,
                    type: "POST",
                    data: JSON.stringify(data),
                    headers: {
                        authorization: token
                    },
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (xhr, status) {
                        reject(xhr, status);
                    }
                });
            });
        },

        put: function (sUrl, data, token) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: sUrl,
                    type: "PUT",
                    data: JSON.stringify(data),
                    headers: {
                        authorization: token
                    },
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (xhr, status) {
                        reject(xhr, status);
                    }
                });
            });
        },

        delete: function (sUrl, data, token) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: sUrl,
                    type: "DELETE",
                    data: JSON.stringify(data),
                    headers: {
                        authorization: token
                    },
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (xhr, status) {
                        reject(xhr, status);
                    }
                });
            });
        }
    };
});
