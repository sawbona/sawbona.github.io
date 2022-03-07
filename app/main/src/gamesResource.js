// define(["request"], function(request){
import { request } from './request.js';
const apiBaseUrl = "http://localhost:8080/api/games/";

class GamesResource {
    constructor() {
        function clean(resource) {
            if (resource == "/") {
                return "";
            }

            if (resource.length > 0) {
                if (resource.substring(0, 1) == "/") {
                    resource = resource.substring(1, resource.length);
                }
                if (resource.substring(resource.length - 1, resource.length) != "/") {
                    resource = resource + "/";
                }
            }
            return resource;
        }

        const self = this;
        self.get = function (resource) {
            resource = clean(resource);
            return request.get(apiBaseUrl + resource);
        };
    }
}

export const gamesResource = new GamesResource();
// });