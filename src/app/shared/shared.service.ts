import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private _snackBar:MatSnackBar,
  ) { }


  public snackbar(data: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      data: data
    })
  }
}
