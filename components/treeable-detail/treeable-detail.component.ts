import {Component, NgModule} from "@angular/core";
import {Subscription} from "rxjs";
import {Treeable} from "../../core/treeable/shared/treeable.model";
import {SiteBrowserState} from "../../core/util/site-browser.state";
import {SettingsStorageService} from "../../core/util/settings-storage.service";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {FormsModule} from '@angular/forms'
@Component({
    selector: 'treeable-detail',
    template: require('./treeable-detail.html'),
    styles: [require('./../app.css')]
})
export class TreeableDetailComponent {

    dotCMSURL: string = "";
    treeable : Treeable = new Treeable();
    subscription: Subscription;

    constructor(
        private updateService: SiteBrowserState,
        private settingsStorageService: SettingsStorageService
    ) {
        if(settingsStorageService.getSettings()!=null){this.dotCMSURL=settingsStorageService.getSettings().site};
        if(updateService.getSelectedTreeable()){this.treeable = updateService.getSelectedTreeable()};
        this.subscription = updateService.currentTreeable
            .subscribe(treeable => {
                if (treeable) {
                    this.treeable= treeable;
                }else{
                    this.treeable = new Treeable();
                }
            });
        setTimeout(() => {
        }, 100)
    }

}

@NgModule({
    imports: [CommonModule, FormsModule, InputTextModule],
    exports: [TreeableDetailComponent],
    declarations: [TreeableDetailComponent]
})
export class DotcmsTreeableDetailModule { }