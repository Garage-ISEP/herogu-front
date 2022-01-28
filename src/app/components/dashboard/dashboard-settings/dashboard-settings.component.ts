import { MatDialog } from '@angular/material/dialog';
import { User } from './../../../models/api/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/api/user.model';
import { ApiService } from 'src/app/services/api.service';
import { TextDialogComponent } from '../../utils/text-dialog/text-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent {

  constructor(
    private readonly _api: ApiService,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private readonly _snackbar: SnackbarService,
  ) { }

  public async deleteProject() {
    this._dialog.open(TextDialogComponent, { data: "Es-tu sûr de supprimer ce projet ?" }).afterClosed().subscribe(async (e: string) => {
      if (e) {
        try {
          await this._api.deleteProject();
          this._router.navigateByUrl('/');
          this._snackbar.snack("Ce projet à été supprimé avec succès");
        } catch (e) {
          this._snackbar.snack("Une erreur est survenue lors de la suppression du projet");
        }
      }
    })
  }

  public get project(): Project {
    return this._api.project;
  }

  public get isAuthor(): boolean {
    return this._api.user!.id === this.project.creatorId;
  }

  public get collaborators(): User[] {
    return this.project.collaborators.filter(el => el.userId != this._api.user!.id).map(el => el.user);
  }


}
