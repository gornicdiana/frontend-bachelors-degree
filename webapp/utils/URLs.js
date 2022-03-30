sap.ui.define(
  [],

  function () {
    "use strict";
    const origin = "http://localhost:5010";
    const student = "/students";
    const therapist = "/therapists";
    const atricle = "/articles";
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
    };
  }
);
