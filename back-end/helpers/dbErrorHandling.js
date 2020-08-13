"use strict";

/* 
	Get Uerror field name
*/

const uniqueMesage = (error) => {
  let output;
  try {
    let fieldname = error.message.split(".$")[1];
    field = field.split("dub key")[0];
    field = field.substring(0, field.lastIndexOf("_"));
    require.flash("errors", [
      {
        mesage: "An acount with this " + field + "already exists",
      },
    ]);

    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "already exists";
  }

  return output;
};

/*
	Get the error message from err object
*/

exports.errorHandler = (error) => {
  let message = "";
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMesage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message) {
        messsage = error.errorors[errorName].message;
      }
    }
  }
  return message;
};
