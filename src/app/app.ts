import { Component } from '@angular/core';
import { NewForm } from './newForm/newForm';
import { OldForm } from './oldForm/oldForm';
import { Tab, Tabs, TabList, TabPanel, TabContent } from '@angular/aria/tabs';

@Component({
  selector: 'app-root',
  imports: [OldForm, NewForm, TabList, Tab, Tabs, TabPanel, TabContent],
  template: `
    <div ngTabs>
      <div ngTabList selectionMode="follow" selectedTab="oldForm">
        <div ngTab value="oldForm">Old Form</div>
        <div ngTab value="newForm">New Form</div>
      </div>
      <div class="sliding-window">
        <div ngTabPanel [preserveContent]="false" value="oldForm">
          <ng-template ngTabContent><app-old-form></app-old-form></ng-template>
        </div>
        <div ngTabPanel [preserveContent]="false" value="newForm">
          <ng-template ngTabContent><app-new-form /></ng-template>
        </div>
      </div>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {}
