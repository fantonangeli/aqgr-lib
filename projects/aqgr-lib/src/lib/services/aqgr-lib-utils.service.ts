import { Injectable } from '@angular/core';
import {SearchServiceParams} from '../namespace';

@Injectable({
  providedIn: 'root'
})
/**
 * Class with some common utilities
 */
export class AqgrLibUtilsService {
    constructor() { }

    /**
     * get the REST params for the server
     *
     * @param ssp params the params to send to the service
     * @param paramsNames the object with the params name to send to the service
     * @returns the rest params to send to the service
     */
    public getRestParams(ssp:SearchServiceParams=new SearchServiceParams(), paramsNames:any = {}): object {
        let params={};

        if(ssp.name) params[paramsNames.search]=ssp.name;
        if(ssp.continent) params[paramsNames.continent]=ssp.continent;
        if(ssp.region) params[paramsNames.region]=ssp.region;
        if(ssp.country) params[paramsNames.country]=ssp.country;
        if(ssp.taxonomy) params[paramsNames.taxonomy]=ssp.taxonomy;
        if(ssp.specie) params[paramsNames.specie]=ssp.specie;
        if(ssp.ftype) params[paramsNames.ftype]=ssp.ftype;
        if(ssp.sftype) params[paramsNames.sftype]=ssp.sftype;
        if(ssp.limit) params[paramsNames.limit]=ssp.limit;

        return params;
    }
}
