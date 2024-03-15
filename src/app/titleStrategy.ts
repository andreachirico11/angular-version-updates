import { Injectable } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState) ?? 'Home';
    document.title = `My App - ${title}`;
  }
}
