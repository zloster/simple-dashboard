import request from "superagent-bluebird-promise";
import Source from "./Source";
import Logger from "../util/Logger";


var log = new Logger(__filename);


export default class HTTPStatusCode extends Source {
    constructor(data) {
        super(data);
        this.url = data.url;
        this.link = data.link || data.url;
    }

    fetchData() {
        return request.get(this.url)
            .promise();
    }

    getStatus() {
        return this.fetchData()
            .then(response => {
                var status = "success";
                var messages = [];

                if (!response) {
                    status = "warning";
                    messages.push({
                        message: "Bad response from healthcheck: " + response.status
                    });
                } else if (response.status != 200){
                    status = "danger";
                    messages.push({
                        message: "Response status code: " + response.status
                    });
                } else {
                    messages.push({
                        message: "Response status code: " + response.status
                    });
                }

                return {
                    title: this.title,
                    link: this.link,
                    status: status,
                    messages: messages
                };
        });
    }
}

HTTPStatusCode.type="http-check";
