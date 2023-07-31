import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    // imports: [
    //     MatInputModule,
    //     MatSelectModule,
    //     MatCardModule,
    //     MatRadioModule,
    //     MatCheckboxModule,
    //     MatTableModule,
    //     MatPaginatorModule,
    //     MatSortModule,
    //     MatDialogModule,
    //     MatButtonModule,
    //     MatFormFieldModule,
    //     MatDividerModule,
    //     MatGridListModule,
    //     MatDatepickerModule,
    //     MatNativeDateModule,
    //     MatIconModule,
    //     MatToolbarModule,
    //     MatButtonToggleModule,
    // ],
    exports: [
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDividerModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatListModule,
        MatMenuModule,
    ],

    providers: [
        MatDatepickerModule,
    ]
})

export class MaterialModule { }