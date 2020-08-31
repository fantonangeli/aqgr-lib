import { Injectable, Inject, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * class to manage the app's logging
 */
export class LoggerService {

    constructor(@Inject('LoggingEnabled') private loggingEnabled:boolean=true) {}

    /**
     * getTime.
     */
    private getTime(){
        var matches = Date().match(/\w+ \w+ \d+ \d+ ([\d:]+)/i);
        return matches[1];
    }

    /**
     * log 4 errors
     *
     * @param {string} msg the message
     * @param {any} data debugging data
     */
    error(msg: string, ...data) {
        this.log(msg, "red", data);
    }

    /**
     * log 4 services
     *
     * @param {string} servicename the name of the service
     * @param {any} params request params
     */
    service(servicename: string, params:any="") {
        if(!this.loggingEnabled) return;

        this.log("Service:"+ servicename, "green", params);
    }


    /**
     * just a logger
     *
     * @param {string} msg message to show
     * @param {string} color pick your color
     * @param {any} data the data 
     */
    log(msg: any, color:string="", ...data) {
        let logmsg="";

        logmsg=this.getTime()+" "+msg;

        console.log("%c"+logmsg, `color: ${color}; font-weight: bold;`, ...data);
    }

}
