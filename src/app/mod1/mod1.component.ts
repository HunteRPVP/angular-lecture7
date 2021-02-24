import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mod1',
  templateUrl: './mod1.component.html',
  styleUrls: ['./mod1.component.css']
})
export class Mod1Component implements OnInit {

  name: string = '';
  description: string = '';

  form1 = {name: '', description: ''};

  formBuilder1: FormGroup;

  reactiveForm1 = new FormGroup({
    name: new FormControl(),
    description: new FormControl('')
  });

  constructor(fb: FormBuilder) {
    this.formBuilder1 = fb.group({ 
      name: [null, Validators.required],
      description: fb.control(null, Validators.required),
      title: [{value: null, disabled: 'true'}, Validators.required],
      phones: fb.array([
        ['+79333357446'],
        ['+79250462415']
      ]),
      age: fb.control(null, [Validators.min(10), Validators.max(100)])
    });

    this.formBuilder1.get('name').valueChanges.subscribe(value => { 
      if(value == 'Привет') {
        this.formBuilder1.get('description').setValue('Приветствие');
      } 
    });
   }

  ngOnInit(): void {
  }

  get getPhones(): FormArray {
    return this.formBuilder1.get('phones') as FormArray;
  }

  get getAge(): FormControl {
    return this.formBuilder1.get('age') as FormControl;
  }

  toggle(): void {
    if (this.formBuilder1.get('title').enabled) {
      this.formBuilder1.get('title').disable();
    }
    else {
      this.formBuilder1.get('title').enable();
    }
  }

  refresh(): void {
    this.formBuilder1.reset();
  }

}
