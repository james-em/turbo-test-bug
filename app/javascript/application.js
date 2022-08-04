// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import {Turbo} from "@hotwired/turbo-rails";
import "controllers";

document.addEventListener("turbo:load", () => {
  if (location.pathname === "/") {
    document.getElementById("js-get").addEventListener("click", () => {
      fetch("/page2", {method: "GET"})
        .then(response => {
          response.text().then((htmlResponse) => {
            /**
             * This will generate a subsequent call instead of using the response.
             */
            Turbo.visit(response.url, {
              action: "replace",
              response: {statusCode: 200, redirected: true, responseHTML: "<html><body><h1>Test</h1></body></html>"}
            });
          });
        });
    });

    document.getElementById("js-post").addEventListener("click", () => {
      fetch("/page2", {method: "POST"})
        .then(response => {
          response.text().then((htmlResponse) => {
            /**
             * This will NOT generate a subsequent call.
             * Will use the given response properly.
             * Will generate Javascript errors.
             */
            Turbo.visit(response.url, {
              action: "replace",
              response: {statusCode: 422, redirected: true, responseHTML: htmlResponse}
            });
          });
        });
    });

    document.getElementById("js-post-empty").addEventListener("click", () => {
      fetch("/page2", {method: "POST"})
        .then(response => {
          response.text().then((htmlResponse) => {
            /**
             * This will NOT generate a subsequent call.
             * Will use the given response properly.
             * Will generate Javascript errors.
             */
            Turbo.visit("/empty", {
              action: "replace",
              response: {statusCode: 422, redirected: true, responseHTML: "<html><body><h1>Test</h1></body></html>"}
            });
          });
        });
    });

    document.getElementById("js-post-workaround").addEventListener("click", () => {
      fetch("/page2", {method: "POST"})
        .then(response => {
          response.text().then((htmlResponse) => {
            /**
             * This will NOT generate a subsequent call.
             * Will use the given response properly.
             * Will generate Javascript errors.
             */
            const { body } = (new DOMParser()).parseFromString(response.data, 'text/html');
            document.body.replaceWith(body);
          });
        });
    });
  }
});
