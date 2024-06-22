import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ControlContainer, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() inputId: string = '';
  @Input() controlName: string ='';

  formGroup: FormGroup;
  constructor(private controlContainer: ControlContainer) { 
  }

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control as FormGroup;
  }
}
