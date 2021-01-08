import { Injectable, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import "prismjs";
import 'clipboard';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar.min';
import 'prismjs/components/prism-docker.min';

declare var Prism: any;

@Injectable()
export class PrismService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}
