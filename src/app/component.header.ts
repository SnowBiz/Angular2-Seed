import { Component, Directive, ElementRef, Renderer } from 'angular2/core'
import { ROUTER_DIRECTIVES } from 'angular2/router'

@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // we must interact with the dom through Renderer for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}

@Component ({
  selector: 'app-header',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  template: `
    <div>
      <header>

      </header>
    </div>

  `

})

export class AppHeader {

}