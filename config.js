"use strict"

/** Shared config for application. */

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3000;

module.exports = {
    SECRET_KEY,
    PORT
};

