import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "../../core/util/http.service";
import {NotificationService} from "../../core/util/notification.service";
import {Site} from "../../core/treeable/shared/site.model";

@Injectable()
export class SiteSelectorService{

    constructor
    (
        private httpClient: HttpClient,
        private notificationService: NotificationService
    )
    {}

    filterForSites(searchQuery : string) : Observable<Site[]>{
    return this.httpClient.get('/api/v1/site/filter/' + searchQuery + '/archived/false')
        .map((res: Response) => this.extractDataFilter(res))
        .catch(err => this.handleError(err));
    }

    getSites() : Observable<Site[]>{
        return this.httpClient.get('/api/v1/site/currentSite')
            .map((res: Response) => this.extractDataDropdown(res))
            .catch(err => this.handleError(err));
    }

    private extractDataDropdown(res: Response): Site[] {
        let obj = JSON.parse(res.text());
        return obj.entity.sites;
    }

    private extractDataFilter(res: Response): Site[] {
        let obj = JSON.parse(res.text());
        return obj.entity.result;
    }

    private handleError(error: any) {
        // we need use a remote logging infrastructure at some point
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        if (errMsg) {
            console.log(errMsg);
            this.notificationService.displayErrorMessage("There was an error; please try again : " + errMsg);
            return Observable.throw(errMsg);
        }
    }

}