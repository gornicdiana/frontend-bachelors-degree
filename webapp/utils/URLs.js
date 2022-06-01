sap.ui.define([], function () {
    "use strict";
    const origin = "https://diana-licenta-backend.cfapps.eu10.hana.ondemand.com";
    const student = "/students";
    const therapist = "/therapists";
    const atricle = "/articles";
    const appointment = "/appointments"
    const slash = "/";
    return {
        getStudentUrl: function () {
            return origin + student;
        },

        postStudentUrl: function () {
            return origin + student;
        },

        getStudentByIdUrl: function () {
            return origin + student + slash;
        },

        getTherapistUrl: function () {
            return origin + therapist;
        },

        postTherapistUrl: function () {
            return origin + therapist;
        },

        getTherapistByIdUrl: function () {
            return origin + therapist + slash;
        },

        getArticleUrl: function () {
            return origin + atricle;
        },

        postArticleUrl: function () {
            return origin + atricle;
        },

        getArticleByIdUrl: function () {
            return origin + atricle + slash;
        },

        deleteArticleByUrl: function () {
            return origin + atricle + slash;
        },

        getAppointmentUrl: function () {
            return origin + appointment;
        }
    };
});
