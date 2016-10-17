import {Component, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {SiteBrowserState} from "../../core/util/site-browser.state";
var prismjs = require('../assets/js/prism');

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [
        require('./app.component.css'),
        require('../assets/css/prism.css'),
        require('../../node_modules/primeng/resources/primeng.min.css'),
        require('../../node_modules/primeng/resources/themes/omega/theme.css'),

    ],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    private items: MenuItem[];

    constructor(private updateService: SiteBrowserState) {}

    ngOnInit() {
        // For showcase purposes, we initialize a host by default
        this.updateService.changeSite('demo.dotcms.com');

        this.items = [
            {
                label: 'Breadcrumb',
                routerLink: ['breadcrumb']
            },
            {
                label: 'Site Datatable',
                routerLink: ['site-datatable']
            },
            {
                label: 'Site Selector',
                routerLink: ['site-selector']
            },
            {
                label: 'Site Treetable',
                routerLink: ['site-treetable']
            },
            {
                label: 'Treeable Detail',
                routerLink: ['treable-detail']
            },
        ];
    }
}