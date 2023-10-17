import { Component, Input, ChangeDetectionStrategy, ViewChild, Optional, Inject, } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LOADERS, DEFAULTS, NgxSpinner, PRIMARY_SPINNER, } from "./ngx-spinner.enum";
import { trigger, state, style, transition, animate, } from "@angular/animations";
import { NGX_SPINNER_CONFIG } from "./config";
import * as i0 from "@angular/core";
import * as i1 from "./ngx-spinner.service";
import * as i2 from "@angular/common";
import * as i3 from "./safe-html.pipe";
class NgxSpinnerComponent {
    // TODO: https://github.com/Napster2210/ngx-spinner/issues/259
    // @HostListener("document:keydown", ["$event"])
    // handleKeyboardEvent(event: KeyboardEvent) {
    //   if (this.spinnerDOM && this.spinnerDOM.nativeElement) {
    //     if (
    //       this.fullScreen ||
    //       (!this.fullScreen && this.isSpinnerZone(event.target))
    //     ) {
    //       event.returnValue = false;
    //       event.preventDefault();
    //     }
    //   }
    // }
    /**
     * Creates an instance of NgxSpinnerComponent.
     *
     * @memberof NgxSpinnerComponent
     */
    constructor(spinnerService, changeDetector, elementRef, globalConfig) {
        this.spinnerService = spinnerService;
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.globalConfig = globalConfig;
        /**
         * To enable/disable animation
         *
         * @type {boolean}
         * @memberof NgxSpinnerComponent
         */
        this.disableAnimation = false;
        /**
         * Spinner Object
         *
         * @memberof NgxSpinnerComponent
         */
        this.spinner = new NgxSpinner();
        /**
         * Unsubscribe from spinner's observable
         *
         * @memberof NgxSpinnerComponent
         **/
        this.ngUnsubscribe = new Subject();
        /**
         * To set default ngx-spinner options
         *
         * @memberof NgxSpinnerComponent
         */
        this.setDefaultOptions = () => {
            const { type } = this.globalConfig ?? {};
            this.spinner = NgxSpinner.create({
                name: this.name,
                bdColor: this.bdColor,
                size: this.size,
                color: this.color,
                type: this.type ?? type,
                fullScreen: this.fullScreen,
                divArray: this.divArray,
                divCount: this.divCount,
                show: this.show,
                zIndex: this.zIndex,
                template: this.template,
                showSpinner: this.showSpinner,
            });
        };
        this.bdColor = DEFAULTS.BD_COLOR;
        this.zIndex = DEFAULTS.Z_INDEX;
        this.color = DEFAULTS.SPINNER_COLOR;
        this.size = "large";
        this.fullScreen = true;
        this.name = PRIMARY_SPINNER;
        this.template = null;
        this.showSpinner = false;
        this.divArray = [];
        this.divCount = 0;
        this.show = false;
    }
    initObservable() {
        this.spinnerService
            .getSpinner(this.name)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((spinner) => {
            this.setDefaultOptions();
            Object.assign(this.spinner, spinner);
            if (spinner.show) {
                this.onInputChange();
            }
            this.changeDetector.detectChanges();
        });
    }
    /**
     * Initialization method
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnInit() {
        this.setDefaultOptions();
        this.initObservable();
    }
    /**
     * To check event triggers inside the Spinner Zone
     *
     * @param {*} element
     * @returns {boolean}
     * @memberof NgxSpinnerComponent
     */
    isSpinnerZone(element) {
        if (element === this.elementRef.nativeElement.parentElement) {
            return true;
        }
        return element.parentNode && this.isSpinnerZone(element.parentNode);
    }
    /**
     * On changes event for input variables
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnChanges(changes) {
        for (const propName in changes) {
            if (propName) {
                const changedProp = changes[propName];
                if (changedProp.isFirstChange()) {
                    return;
                }
                else if (typeof changedProp.currentValue !== "undefined" &&
                    changedProp.currentValue !== changedProp.previousValue) {
                    if (changedProp.currentValue !== "") {
                        this.spinner[propName] = changedProp.currentValue;
                        if (propName === "showSpinner") {
                            if (changedProp.currentValue) {
                                this.spinnerService.show(this.spinner.name, this.spinner);
                            }
                            else {
                                this.spinnerService.hide(this.spinner.name);
                            }
                        }
                        if (propName === "name") {
                            this.initObservable();
                        }
                    }
                }
            }
        }
    }
    /**
     * To get class for spinner
     *
     * @memberof NgxSpinnerComponent
     */
    getClass(type, size) {
        this.spinner.divCount = LOADERS[type];
        this.spinner.divArray = Array(this.spinner.divCount)
            .fill(0)
            .map((_, i) => i);
        let sizeClass = "";
        switch (size.toLowerCase()) {
            case "small":
                sizeClass = "la-sm";
                break;
            case "medium":
                sizeClass = "la-2x";
                break;
            case "large":
                sizeClass = "la-3x";
                break;
            default:
                break;
        }
        return "la-" + type + " " + sizeClass;
    }
    /**
     * Check if input variables have changed
     *
     * @memberof NgxSpinnerComponent
     */
    onInputChange() {
        this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
    }
    /**
     * Component destroy event
     *
     * @memberof NgxSpinnerComponent
     */
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: NgxSpinnerComponent, deps: [{ token: i1.NgxSpinnerService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: NGX_SPINNER_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.2", type: NgxSpinnerComponent, selector: "ngx-spinner", inputs: { bdColor: "bdColor", size: "size", color: "color", type: "type", fullScreen: "fullScreen", name: "name", zIndex: "zIndex", template: "template", showSpinner: "showSpinner", disableAnimation: "disableAnimation" }, viewQueries: [{ propertyName: "spinnerDOM", first: true, predicate: ["overlay"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  [@.disabled]=\"disableAnimation\"\n  [@fadeIn]=\"'in'\"\n  *ngIf=\"spinner.show\"\n  class=\"ngx-spinner-overlay\"\n  [style.background-color]=\"spinner.bdColor\"\n  [style.z-index]=\"spinner.zIndex\"\n  [style.position]=\"spinner.fullScreen ? 'fixed' : 'absolute'\"\n  #overlay\n>\n  <div *ngIf=\"!template\" [class]=\"spinner.class\" [style.color]=\"spinner.color\">\n    <div *ngFor=\"let index of spinner.divArray\"></div>\n  </div>\n  <div *ngIf=\"template\" [innerHTML]=\"template | safeHtml\"></div>\n  <div class=\"loading-text\" [style.z-index]=\"spinner.zIndex\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".ngx-spinner-overlay{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay>div:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.SafeHtmlPipe, name: "safeHtml" }], animations: [
            trigger("fadeIn", [
                state("in", style({ opacity: 1 })),
                transition(":enter", [style({ opacity: 0 }), animate(300)]),
                transition(":leave", animate(200, style({ opacity: 0 }))),
            ]),
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
export { NgxSpinnerComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: NgxSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: "ngx-spinner", changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger("fadeIn", [
                            state("in", style({ opacity: 1 })),
                            transition(":enter", [style({ opacity: 0 }), animate(300)]),
                            transition(":leave", animate(200, style({ opacity: 0 }))),
                        ]),
                    ], template: "<div\n  [@.disabled]=\"disableAnimation\"\n  [@fadeIn]=\"'in'\"\n  *ngIf=\"spinner.show\"\n  class=\"ngx-spinner-overlay\"\n  [style.background-color]=\"spinner.bdColor\"\n  [style.z-index]=\"spinner.zIndex\"\n  [style.position]=\"spinner.fullScreen ? 'fixed' : 'absolute'\"\n  #overlay\n>\n  <div *ngIf=\"!template\" [class]=\"spinner.class\" [style.color]=\"spinner.color\">\n    <div *ngFor=\"let index of spinner.divArray\"></div>\n  </div>\n  <div *ngIf=\"template\" [innerHTML]=\"template | safeHtml\"></div>\n  <div class=\"loading-text\" [style.z-index]=\"spinner.zIndex\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".ngx-spinner-overlay{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay>div:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgxSpinnerService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NGX_SPINNER_CONFIG]
                }] }]; }, propDecorators: { bdColor: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], type: [{
                type: Input
            }], fullScreen: [{
                type: Input
            }], name: [{
                type: Input
            }], zIndex: [{
                type: Input
            }], template: [{
                type: Input
            }], showSpinner: [{
                type: Input
            }], disableAnimation: [{
                type: Input
            }], spinnerDOM: [{
                type: ViewChild,
                args: ["overlay"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNwaW5uZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNwaW5uZXIvc3JjL2xpYi9uZ3gtc3Bpbm5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc3Bpbm5lci9zcmMvbGliL25neC1zcGlubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUlMLHVCQUF1QixFQUd2QixTQUFTLEVBRVQsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsT0FBTyxFQUNQLFFBQVEsRUFFUixVQUFVLEVBQ1YsZUFBZSxHQUNoQixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFvQixrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFFaEUsTUFhYSxtQkFBbUI7SUFzRzlCLDhEQUE4RDtJQUM5RCxnREFBZ0Q7SUFDaEQsOENBQThDO0lBQzlDLDREQUE0RDtJQUM1RCxXQUFXO0lBQ1gsMkJBQTJCO0lBQzNCLCtEQUErRDtJQUMvRCxVQUFVO0lBQ1YsbUNBQW1DO0lBQ25DLGdDQUFnQztJQUNoQyxRQUFRO0lBQ1IsTUFBTTtJQUNOLElBQUk7SUFFSjs7OztPQUlHO0lBQ0gsWUFDVSxjQUFpQyxFQUNqQyxjQUFpQyxFQUNqQyxVQUFzQixFQUd0QixZQUE4QjtRQUw5QixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsbUJBQWMsR0FB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QUs7Z0JBT0csV0FBVztzQkFBbkIsS0FBSztnQkFRRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBcUNnQixVQUFVO3NCQUEvQixTQUFTO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2UsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOZ3hTcGlubmVyU2VydmljZSB9IGZyb20gXCIuL25neC1zcGlubmVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge1xuICBMT0FERVJTLFxuICBERUZBVUxUUyxcbiAgU2l6ZSxcbiAgTmd4U3Bpbm5lcixcbiAgUFJJTUFSWV9TUElOTkVSLFxufSBmcm9tIFwiLi9uZ3gtc3Bpbm5lci5lbnVtXCI7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBOZ3hTcGlubmVyQ29uZmlnLCBOR1hfU1BJTk5FUl9DT05GSUcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm5neC1zcGlubmVyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIm5neC1zcGlubmVyLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9uZ3gtc3Bpbm5lci5jb21wb25lbnQuY3NzXCJdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoXCJmYWRlSW5cIiwgW1xuICAgICAgc3RhdGUoXCJpblwiLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuICAgICAgdHJhbnNpdGlvbihcIjplbnRlclwiLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKDMwMCldKSxcbiAgICAgIHRyYW5zaXRpb24oXCI6bGVhdmVcIiwgYW5pbWF0ZSgyMDAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSkpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBUbyBzZXQgYmFja2Ryb3AgY29sb3JcbiAgICogT25seSBzdXBwb3J0cyBSR0JBIGNvbG9yIGZvcm1hdFxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgYmRDb2xvcjogc3RyaW5nO1xuICAvKipcbiAgICogVG8gc2V0IHNwaW5uZXIgc2l6ZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgc2l6ZTogU2l6ZTtcbiAgLyoqXG4gICAqIFRvIHNldCBzcGlubmVyIGNvbG9yKERFRkFVTFRTLlNQSU5ORVJfQ09MT1IpXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nO1xuICAvKipcbiAgICogVG8gc2V0IHR5cGUgb2Ygc3Bpbm5lclxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuICAvKipcbiAgICogVG8gdG9nZ2xlIGZ1bGxzY3JlZW4gbW9kZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgZnVsbFNjcmVlbjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNwaW5uZXIgbmFtZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogei1pbmRleCB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDdXN0b20gdGVtcGxhdGUgZm9yIHNwaW5uZXIvbG9hZGVyXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSB0ZW1wbGF0ZTogc3RyaW5nO1xuICAvKipcbiAgICogU2hvdy9IaWRlIHRoZSBzcGlubmVyXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KCkgc2hvd1NwaW5uZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRvIGVuYWJsZS9kaXNhYmxlIGFuaW1hdGlvblxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQG1lbWJlcm9mIE5neFNwaW5uZXJDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVBbmltYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIFNwaW5uZXIgT2JqZWN0XG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqL1xuICBzcGlubmVyOiBOZ3hTcGlubmVyID0gbmV3IE5neFNwaW5uZXIoKTtcbiAgLyoqXG4gICAqIEFycmF5IGZvciBzcGlubmVyJ3MgZGl2XG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqL1xuICBkaXZBcnJheTogQXJyYXk8bnVtYmVyPjtcbiAgLyoqXG4gICAqIENvdW50ZXIgZm9yIGRpdlxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKlxuICAgKi9cbiAgZGl2Q291bnQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIFNob3cgc3Bpbm5lclxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKiovXG4gIHNob3c6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHNwaW5uZXIncyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqKi9cbiAgbmdVbnN1YnNjcmliZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gIC8qKlxuICAgKiBFbGVtZW50IFJlZmVyZW5jZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgQFZpZXdDaGlsZChcIm92ZXJsYXlcIikgc3Bpbm5lckRPTTogeyBuYXRpdmVFbGVtZW50OiBhbnkgfTtcblxuICAvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20vTmFwc3RlcjIyMTAvbmd4LXNwaW5uZXIvaXNzdWVzLzI1OVxuICAvLyBASG9zdExpc3RlbmVyKFwiZG9jdW1lbnQ6a2V5ZG93blwiLCBbXCIkZXZlbnRcIl0pXG4gIC8vIGhhbmRsZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgLy8gICBpZiAodGhpcy5zcGlubmVyRE9NICYmIHRoaXMuc3Bpbm5lckRPTS5uYXRpdmVFbGVtZW50KSB7XG4gIC8vICAgICBpZiAoXG4gIC8vICAgICAgIHRoaXMuZnVsbFNjcmVlbiB8fFxuICAvLyAgICAgICAoIXRoaXMuZnVsbFNjcmVlbiAmJiB0aGlzLmlzU3Bpbm5lclpvbmUoZXZlbnQudGFyZ2V0KSlcbiAgLy8gICAgICkge1xuICAvLyAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAvLyAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE5neFNwaW5uZXJDb21wb25lbnQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNwaW5uZXJTZXJ2aWNlOiBOZ3hTcGlubmVyU2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE5HWF9TUElOTkVSX0NPTkZJRylcbiAgICBwcml2YXRlIGdsb2JhbENvbmZpZzogTmd4U3Bpbm5lckNvbmZpZ1xuICApIHtcbiAgICB0aGlzLmJkQ29sb3IgPSBERUZBVUxUUy5CRF9DT0xPUjtcbiAgICB0aGlzLnpJbmRleCA9IERFRkFVTFRTLlpfSU5ERVg7XG4gICAgdGhpcy5jb2xvciA9IERFRkFVTFRTLlNQSU5ORVJfQ09MT1I7XG4gICAgdGhpcy5zaXplID0gXCJsYXJnZVwiO1xuICAgIHRoaXMuZnVsbFNjcmVlbiA9IHRydWU7XG4gICAgdGhpcy5uYW1lID0gUFJJTUFSWV9TUElOTkVSO1xuICAgIHRoaXMudGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMuc2hvd1NwaW5uZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuZGl2QXJyYXkgPSBbXTtcbiAgICB0aGlzLmRpdkNvdW50ID0gMDtcbiAgICB0aGlzLnNob3cgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXRPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMuc3Bpbm5lclNlcnZpY2VcbiAgICAgIC5nZXRTcGlubmVyKHRoaXMubmFtZSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nVW5zdWJzY3JpYmUpKVxuICAgICAgLnN1YnNjcmliZSgoc3Bpbm5lcjogTmd4U3Bpbm5lcikgPT4ge1xuICAgICAgICB0aGlzLnNldERlZmF1bHRPcHRpb25zKCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zcGlubmVyLCBzcGlubmVyKTtcbiAgICAgICAgaWYgKHNwaW5uZXIuc2hvdykge1xuICAgICAgICAgIHRoaXMub25JbnB1dENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6YXRpb24gbWV0aG9kXG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNldERlZmF1bHRPcHRpb25zKCk7XG4gICAgdGhpcy5pbml0T2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIGNoZWNrIGV2ZW50IHRyaWdnZXJzIGluc2lkZSB0aGUgU3Bpbm5lciBab25lXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICogQG1lbWJlcm9mIE5neFNwaW5uZXJDb21wb25lbnRcbiAgICovXG4gIGlzU3Bpbm5lclpvbmUoZWxlbWVudDogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKGVsZW1lbnQgPT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlICYmIHRoaXMuaXNTcGlubmVyWm9uZShlbGVtZW50LnBhcmVudE5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIHNldCBkZWZhdWx0IG5neC1zcGlubmVyIG9wdGlvbnNcbiAgICpcbiAgICogQG1lbWJlcm9mIE5neFNwaW5uZXJDb21wb25lbnRcbiAgICovXG4gIHNldERlZmF1bHRPcHRpb25zID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSB9ID0gdGhpcy5nbG9iYWxDb25maWcgPz8ge307XG4gICAgdGhpcy5zcGlubmVyID0gTmd4U3Bpbm5lci5jcmVhdGUoe1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgYmRDb2xvcjogdGhpcy5iZENvbG9yLFxuICAgICAgc2l6ZTogdGhpcy5zaXplLFxuICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICB0eXBlOiB0aGlzLnR5cGUgPz8gdHlwZSxcbiAgICAgIGZ1bGxTY3JlZW46IHRoaXMuZnVsbFNjcmVlbixcbiAgICAgIGRpdkFycmF5OiB0aGlzLmRpdkFycmF5LFxuICAgICAgZGl2Q291bnQ6IHRoaXMuZGl2Q291bnQsXG4gICAgICBzaG93OiB0aGlzLnNob3csXG4gICAgICB6SW5kZXg6IHRoaXMuekluZGV4LFxuICAgICAgdGVtcGxhdGU6IHRoaXMudGVtcGxhdGUsXG4gICAgICBzaG93U3Bpbm5lcjogdGhpcy5zaG93U3Bpbm5lcixcbiAgICB9KTtcbiAgfTtcbiAgLyoqXG4gICAqIE9uIGNoYW5nZXMgZXZlbnQgZm9yIGlucHV0IHZhcmlhYmxlc1xuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmIChwcm9wTmFtZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkUHJvcCA9IGNoYW5nZXNbcHJvcE5hbWVdO1xuICAgICAgICBpZiAoY2hhbmdlZFByb3AuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHR5cGVvZiBjaGFuZ2VkUHJvcC5jdXJyZW50VmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICBjaGFuZ2VkUHJvcC5jdXJyZW50VmFsdWUgIT09IGNoYW5nZWRQcm9wLnByZXZpb3VzVmFsdWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKGNoYW5nZWRQcm9wLmN1cnJlbnRWYWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5zcGlubmVyW3Byb3BOYW1lXSA9IGNoYW5nZWRQcm9wLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJzaG93U3Bpbm5lclwiKSB7XG4gICAgICAgICAgICAgIGlmIChjaGFuZ2VkUHJvcC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5uZXJTZXJ2aWNlLnNob3codGhpcy5zcGlubmVyLm5hbWUsIHRoaXMuc3Bpbm5lcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGlubmVyU2VydmljZS5oaWRlKHRoaXMuc3Bpbm5lci5uYW1lKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcE5hbWUgPT09IFwibmFtZVwiKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5pdE9ic2VydmFibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRvIGdldCBjbGFzcyBmb3Igc3Bpbm5lclxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgZ2V0Q2xhc3ModHlwZTogc3RyaW5nLCBzaXplOiBTaXplKTogc3RyaW5nIHtcbiAgICB0aGlzLnNwaW5uZXIuZGl2Q291bnQgPSBMT0FERVJTW3R5cGVdO1xuICAgIHRoaXMuc3Bpbm5lci5kaXZBcnJheSA9IEFycmF5KHRoaXMuc3Bpbm5lci5kaXZDb3VudClcbiAgICAgIC5maWxsKDApXG4gICAgICAubWFwKChfLCBpKSA9PiBpKTtcbiAgICBsZXQgc2l6ZUNsYXNzID0gXCJcIjtcbiAgICBzd2l0Y2ggKHNpemUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSBcInNtYWxsXCI6XG4gICAgICAgIHNpemVDbGFzcyA9IFwibGEtc21cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibWVkaXVtXCI6XG4gICAgICAgIHNpemVDbGFzcyA9IFwibGEtMnhcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGFyZ2VcIjpcbiAgICAgICAgc2l6ZUNsYXNzID0gXCJsYS0zeFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gXCJsYS1cIiArIHR5cGUgKyBcIiBcIiArIHNpemVDbGFzcztcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgaWYgaW5wdXQgdmFyaWFibGVzIGhhdmUgY2hhbmdlZFxuICAgKlxuICAgKiBAbWVtYmVyb2YgTmd4U3Bpbm5lckNvbXBvbmVudFxuICAgKi9cbiAgb25JbnB1dENoYW5nZSgpIHtcbiAgICB0aGlzLnNwaW5uZXIuY2xhc3MgPSB0aGlzLmdldENsYXNzKHRoaXMuc3Bpbm5lci50eXBlLCB0aGlzLnNwaW5uZXIuc2l6ZSk7XG4gIH1cbiAgLyoqXG4gICAqIENvbXBvbmVudCBkZXN0cm95IGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJvZiBOZ3hTcGlubmVyQ29tcG9uZW50XG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUubmV4dCgpO1xuICAgIHRoaXMubmdVbnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICB9XG59XG4iLCI8ZGl2XG4gIFtALmRpc2FibGVkXT1cImRpc2FibGVBbmltYXRpb25cIlxuICBbQGZhZGVJbl09XCInaW4nXCJcbiAgKm5nSWY9XCJzcGlubmVyLnNob3dcIlxuICBjbGFzcz1cIm5neC1zcGlubmVyLW92ZXJsYXlcIlxuICBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJzcGlubmVyLmJkQ29sb3JcIlxuICBbc3R5bGUuei1pbmRleF09XCJzcGlubmVyLnpJbmRleFwiXG4gIFtzdHlsZS5wb3NpdGlvbl09XCJzcGlubmVyLmZ1bGxTY3JlZW4gPyAnZml4ZWQnIDogJ2Fic29sdXRlJ1wiXG4gICNvdmVybGF5XG4+XG4gIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVcIiBbY2xhc3NdPVwic3Bpbm5lci5jbGFzc1wiIFtzdHlsZS5jb2xvcl09XCJzcGlubmVyLmNvbG9yXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgaW5kZXggb2Ygc3Bpbm5lci5kaXZBcnJheVwiPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cInRlbXBsYXRlXCIgW2lubmVySFRNTF09XCJ0ZW1wbGF0ZSB8IHNhZmVIdG1sXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXRleHRcIiBbc3R5bGUuei1pbmRleF09XCJzcGlubmVyLnpJbmRleFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==