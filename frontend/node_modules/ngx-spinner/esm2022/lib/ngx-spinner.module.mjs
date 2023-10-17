import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxSpinnerComponent } from "./ngx-spinner.component";
import { SafeHtmlPipe } from "./safe-html.pipe";
import { NGX_SPINNER_CONFIG } from "./config";
import * as i0 from "@angular/core";
class NgxSpinnerModule {
    static forRoot(config) {
        return {
            ngModule: NgxSpinnerModule,
            providers: [{ provide: NGX_SPINNER_CONFIG, useValue: config }],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: NgxSpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.2", ngImport: i0, type: NgxSpinnerModule, declarations: [NgxSpinnerComponent, SafeHtmlPipe], imports: [CommonModule], exports: [NgxSpinnerComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: NgxSpinnerModule, imports: [CommonModule] }); }
}
export { NgxSpinnerModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.2", ngImport: i0, type: NgxSpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NgxSpinnerComponent, SafeHtmlPipe],
                    exports: [NgxSpinnerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNwaW5uZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXNwaW5uZXIvc3JjL2xpYi9uZ3gtc3Bpbm5lci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUVoRSxNQUthLGdCQUFnQjtJQUMzQixNQUFNLENBQUMsT0FBTyxDQUNaLE1BQXlCO1FBRXpCLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUMvRCxDQUFDO0lBQ0osQ0FBQzs4R0FSVSxnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkFIWixtQkFBbUIsRUFBRSxZQUFZLGFBRHRDLFlBQVksYUFFWixtQkFBbUI7K0dBRWxCLGdCQUFnQixZQUpqQixZQUFZOztTQUlYLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBOZ3hTcGlubmVyQ29tcG9uZW50IH0gZnJvbSBcIi4vbmd4LXNwaW5uZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTYWZlSHRtbFBpcGUgfSBmcm9tIFwiLi9zYWZlLWh0bWwucGlwZVwiO1xuaW1wb3J0IHsgTmd4U3Bpbm5lckNvbmZpZywgTkdYX1NQSU5ORVJfQ09ORklHIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hTcGlubmVyQ29tcG9uZW50LCBTYWZlSHRtbFBpcGVdLFxuICBleHBvcnRzOiBbTmd4U3Bpbm5lckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFNwaW5uZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBjb25maWc/OiBOZ3hTcGlubmVyQ29uZmlnXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4U3Bpbm5lck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4U3Bpbm5lck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdYX1NQSU5ORVJfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH1dLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==