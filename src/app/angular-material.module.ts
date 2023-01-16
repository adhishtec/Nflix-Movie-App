import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [
    MatSnackBarModule,
    MatSelectModule
  ],
})
export class AngularMaterialModule {}