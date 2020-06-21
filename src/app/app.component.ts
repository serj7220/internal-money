import {Component, OnInit} from '@angular/core';
import {ReactiveFormConfig} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(){
    ReactiveFormConfig.set({"validationMessage": {"compare":"Your passwords do not match. Please retype your password to confirm it"}})
  }
}
