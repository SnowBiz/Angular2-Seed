import {Component, Directive, ElementRef, Renderer} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';


@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // we must interact with the dom through Renderer for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}

/**
 * Home Component
 */
@Component({
  selector: 'home',
  template: `
  Home
  `
})
export class Home {
}

/**
 * About Component
 */
@Component({
  selector: 'about',
  template: `
  About
  `
})
export class About {
}

/**
 * App Component
 */
@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  styles: [`
    nav a.router-link-active {
      background-color: red;
    }
  `],
  template: `
  <div>
    <nav>
      <a [routerLink]=" ['./Home'] ">Home</a>
      <a [routerLink]=" ['./About'] ">About</a>
    </nav>
    <div>
      <span x-large>Hello, {{ name }}!</span>
    </div>

    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
    <main>
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' }
])
export class App {
  name: string = 'AngularConnect';
}


