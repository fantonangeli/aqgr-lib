import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { shareReplay, map, tap, catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import {SearchServiceParams} from '../namespace';
import {AqgrLibUtilsService} from './aqgr-lib-utils.service';


export class BaseService {
    private cache$: Array<Observable<any>>=Array();
    private logger: LoggerService; 
    private utilsService:AqgrLibUtilsService;

    /**
     * 
     *
     * @param {HttpClient} http HttpClient
     * @param {object} params the params to send to the service
     * @param {boolean} enableCache (optiona) false to disable the cache
     */
    constructor(private http: HttpClient,private paramsNames:any={}, private enableCache:boolean=true)  {
        this.logger=new LoggerService();
        this.utilsService=new AqgrLibUtilsService();
    }

    /**
     * edit a record.
     *
     * @param {string} serviceName the name of the service
     * @param {string} url the rest url
     * @param {any} data to be saved
     * @returns {Observable<any>}
     */
    protected _edit(serviceName: string, url: string, data:any): Observable<any> {
        const observable=this.http.put(url,data).pipe(
                tap(restdata=> {
                    this.logger.service(serviceName+":put", restdata);
                }),
                catchError(error=> {
                    this.logger.error(serviceName+":put", data, error);
                    return throwError(error);
                })
            );

        return observable;
    }

    /**
     * get all elements or send the service search params
     *
     * @param {string} serviceName the name of the service
     * @param {string} url the rest url
     * @param {object} params the params to send to the service
     * @param {number} limit (optional) the limit
     * @param {string} sortBy (optional) sort by field
     * @returns {Observable}
     */
    protected _getByParams(serviceName:string, url:string, params:any={}, limit:number=0, sortBy?:string):Observable<any> {
        let cacheid;

        this.logger.service(serviceName+":get", params);

        if(limit>0) params[this.paramsNames.limit]=limit;
        if(sortBy) params[this.paramsNames.sortBy]=sortBy;

        cacheid=JSON.stringify(params);

        if (!this.cache$[cacheid] || !this.enableCache) {
            this.cache$[cacheid] = this.http.get(url, {params}).pipe(
                shareReplay()
            );
        }

        return this.cache$[cacheid];
    }

    /**
     * get an element by id
     *
     * @param {string} serviceName the name of the service
     * @param {string} url the rest url
     * @param {string | number} id the id of the element
     * @returns {Observable}
     */
    protected _getById(serviceName:string, url:string, id:string|number):Observable<any> {
        let cacheid;

        this.logger.service(serviceName+":getById", {id});

        cacheid=JSON.stringify({id});

        if (!this.cache$[cacheid] || !this.enableCache) {
            this.cache$[cacheid] = this.http.get(url+"/"+id).pipe(
                shareReplay()
            );
        }

        return this.cache$[cacheid];
    }

    /**
     * get all elements or send the service search params
     *
     * @param {string} serviceName the name of the service
     * @param {string} url the rest url
     * @param {SearchServiceParams} params the params to send to the service
     * @param {number} limit (optional) the limit
     * @param {string} sortBy (optional) sort by field
     * @returns {Observable}
     */
    protected _getAll(serviceName:string, url:string, ssp:SearchServiceParams=new SearchServiceParams(), limit:number=0, sort?:string):Observable<any> {
        let params={}, cacheid;

        params=this.utilsService.getRestParams(ssp, this.paramsNames);

        return this._getByParams(serviceName,url,params,limit,sort);
    }



}
