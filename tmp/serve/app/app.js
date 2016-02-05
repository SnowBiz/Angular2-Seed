var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var XLarge = (function () {
    function XLarge(element, renderer) {
        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    }
    XLarge = __decorate([
        core_1.Directive({
            selector: '[x-large]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], XLarge);
    return XLarge;
})();
exports.XLarge = XLarge;
var Home = (function () {
    function Home() {
    }
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n  Home\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Home);
    return Home;
})();
exports.Home = Home;
var About = (function () {
    function About() {
    }
    About = __decorate([
        core_1.Component({
            selector: 'about',
            template: "\n  About\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], About);
    return About;
})();
exports.About = About;
var App = (function () {
    function App() {
        this.name = 'AngularConnect';
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            directives: router_1.ROUTER_DIRECTIVES.concat([
                XLarge
            ]),
            styles: ["\n    nav a.router-link-active {\n      background-color: red;\n    }\n  "],
            template: "\n  <div>\n    <nav>\n      <a [routerLink]=\" ['./Home'] \">Home</a>\n      <a [routerLink]=\" ['./About'] \">About</a>\n    </nav>\n    <div>\n      <span x-large>Hello, {{ name }}!</span>\n    </div>\n\n    name: <input type=\"text\" [value]=\"name\" (input)=\"name = $event.target.value\" autofocus>\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n  </div>\n  "
        }),
        router_1.RouteConfig([
            { path: '/', component: Home, name: 'Home' },
            { path: '/home', component: Home, name: 'Home' },
            { path: '/about', component: About, name: 'About' }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;

//# sourceMappingURL=app.js.map
