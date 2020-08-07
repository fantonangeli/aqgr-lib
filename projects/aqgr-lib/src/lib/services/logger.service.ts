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
    error(msg: string, data:any="") {
        this.log(msg, data, "red");
    }

    /**
     * log 4 services
     *
     * @param {string} servicename the name of the service
     * @param {any} params request params
     */
    service(servicename: string, params:any="") {
        if(!this.loggingEnabled) return;

        this.log("Service:"+ servicename, params, "green");
    }


    /**
     * just a logger
     *
     * @param {string} msg message to show
     * @param {any} data the data 
     * @param {string} color pick your color
     */
    log(msg: any, data:any, color:string="") {
        let logmsg="";

        logmsg=this.getTime()+" "+msg;

        console.log("%c"+logmsg, `color: ${color}; font-weight: bold;`, data);
    }

}
