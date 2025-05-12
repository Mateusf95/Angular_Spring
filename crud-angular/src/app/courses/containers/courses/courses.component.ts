import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category', 'actions'];


  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onError(errorMassage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMassage
    });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onRemove(course: Course) {
    this.coursesService.remove(course._id).subscribe(
      () => {
          this.refresh()
          this.snackBar.open('Cusro removido com sucesso!', 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
      },
      () => this.onError('Erro ao tentar remover Curso!')
    )
  }

  refresh() {
    this.courses$ = this.coursesService.listAll()
    .pipe(
      catchError(error => {
        this.onError("Erro ao carregar Cursos.")
        return of([])
      })
    );
  }


  ngOnInit(): void {
  }

}
