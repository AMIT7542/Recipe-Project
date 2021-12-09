import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { allowChartersOnly, IngredientMesseges, recipeFormError, recipeFormMessages } from 'src/app/helper/validations';
import { recipeSevice } from '../recipe.service';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  recipe: any;
  formErrors = recipeFormError;
  validationMessages = recipeFormMessages;
  showButton: boolean = true;

  constructor(private _router: ActivatedRoute, private _fb: FormBuilder, private _recipeService: recipeSevice, private _route: Router) { }


  ngOnInit() {

    this._router.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
      this.recipeForm.valueChanges.subscribe(data => {

        this.validateAllFormFields(this.recipeForm)
      })
    })

  } 
  initForm() {
    this.recipeForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern(allowChartersOnly)]],
      imagePath: ['', [Validators.required]],
      description: ['', [Validators.required]],
      ingredients: this._fb.array([])
    })

    if (this.editMode) {
      this.recipe = this._recipeService.getRecipe(this.id);
      if (this.recipe['ingredients']) {
        this.recipe.ingredients.forEach(element => {

          this.ingredientAsArray.push(
            this._fb.group({
              'name': element.name,
              'amount': element.amount
            })

          )

        });
        let obj =
        {
          name: this.recipe.name,
          imagePath: this.recipe.imagePath,
          description: this.recipe.description,
        }
        this.recipeForm.patchValue(obj)
        console.log(this.recipeForm.value)

      }

    }

  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  get ingredientAsArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  addIngedientToArray() {
    this.ingredientAsArray.push(this.addIngredientControl())
  }
  addIngredientControl() {
    return this._fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  deleteIngredient(index) {
    this.ingredientAsArray.removeAt(index);
  }
  checkFormValidity() {
    this.validateAllFormFields(this.recipeForm);
  }
  validateAllFormFields(formGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateAllFormFields(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.editMode) {
        this._recipeService.updateRecipe(this.id, this.recipeForm.value)
      }
      else {
        this.showButton = false;
        this._recipeService.addRecipe(this.recipeForm.value)
       
      }
      this.navigate()
    }
    else {
      this.recipeForm.markAllAsTouched();
      this.checkFormValidity();

    }

  }
  navigate() {
    this.recipeForm.reset();
    this._route.navigate(['../'], { relativeTo: this._router })
  }

  ngOnDestroy(): void {
this.recipeForm.reset();
  }

}
