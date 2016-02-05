import {bootstrap} from 'angular2/platform/browser'
import { enableProdMode } from 'angular2/core'
import {ROUTER_PROVIDERS} from 'angular2/router'

import { App } from './app/app'

//enableProdMode()
bootstrap(App, [
  ...ROUTER_PROVIDERS
])
