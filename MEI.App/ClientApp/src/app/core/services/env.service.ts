import { Injectable, Injector } from '@angular/core';
import { Environment } from '../config/app-enum';
import { environment } from '../../../environments/environment';

export interface IEnviroment{
    baseUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class EnvService {
    private _env: Environment;
    private _envConfig:IEnviroment;

    get env(): Environment {
        return this._env;
    }

    get envConfig(): IEnviroment {
        return this._envConfig;
    }

    constructor() { }

    init(): Promise<void> {
        return new Promise(resolve => {
            this.setEnvVariables();
            resolve();
        });
    }

    private setEnvVariables(): void {
        const hostname = window && window.location && window.location.hostname;
        //console.log(hostname);
        if (/^.*localhost.*/.test(hostname)) { // local/dev
            environment.baseUrl = 'https://localhost:44392/'
        } else if (/^.*evs01tst08.*/.test(hostname)) { // uat
            environment.baseUrl = 'http://evs01tst08:90/meiapp/'
        } else if (/^mie.evalueserve.com*/.test(hostname)) { //prod
            environment.baseUrl = ''
        } else {
            console.warn(`Cannot find environment for host name ${hostname}`);
        }
    }
}