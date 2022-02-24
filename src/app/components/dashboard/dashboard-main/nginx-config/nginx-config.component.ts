import { SnackbarService } from 'src/app/services/snackbar.service';
import { ApiService } from 'src/app/services/api.service';
import { ChangeDetectorRef, Component, Input, ViewChild, OnInit } from '@angular/core';
import { Project, RepoTree } from 'src/app/models/api/project.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-nginx-config',
  templateUrl: './nginx-config.component.html',
  styleUrls: ['./nginx-config.component.scss']
})
export class NginxConfigComponent implements OnInit {

  @Input()
  public project: Project;

  @Input()
  public disabled = false;
  
  @ViewChild(MatAutocompleteTrigger)
  public autocompleteTrigger: MatAutocompleteTrigger;

  public autocompleteDirTree?: RepoTree["tree"] = [];
  public loadedAutocompleteDirChoices?: RepoTree;
  public loaded = false;
  public previousDir: string;

  constructor(
    private readonly _api: ApiService,
    private readonly _snackbar: SnackbarService,
    private readonly _changeDetector: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.autocompleteDirTree = this.project.nginxInfo.rootDir.split('/').filter(el => el.length != 0).map(dir => ({ path: dir, type: 'tree' }));
    if (this.autocompleteDirTree[this.autocompleteDirTree.length - 1])
      this.autocompleteDirTree[this.autocompleteDirTree.length - 1].sha = this.project.nginxInfo.rootDirSha;
    console.log(this.autocompleteDirTree);
    this.previousDir = this.rootDirVal;
  }

  public async onFocus() {
    if (!this.loaded) {
      await this.getDirAutoComplete();
      this.loaded = true;
    }
  }
  public async getDirAutoComplete() {
    try {
      const currentPath = this.rootDirVal;
      const res = await this._api.getRepoTree(this.project.githubLink, this.autocompleteDirTree[this.autocompleteDirTree.length - 1]?.sha);
      for (const node of res.tree)
        node.fullPath = currentPath + (!currentPath.endsWith('/') ? '/' : '') + node.path;
      this.loadedAutocompleteDirChoices = res;
      this._changeDetector.detectChanges();
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  public async addAutoCompleteDir(dir: RepoTree["tree"][0]) {
    this.autocompleteDirTree.push(dir);
    await this.getDirAutoComplete();
    this.autocompleteTrigger.openPanel();
  }

  public async removeLastAutoCompleteDir() {
    if (this.autocompleteDirTree.length == 0)
      return;
    this.autocompleteDirTree.pop();
    await this.getDirAutoComplete();
  }

  public async applyChanges() {
    try {
      await this._api.patchHttpRoot(this.project.id, this.rootDirVal, this.autocompleteDirTree[this.autocompleteDirTree.length - 1]?.sha);
      this.previousDir = this.rootDirVal;
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Impossible d'appliquer les changements");
    }
  }

  public get rootDirVal() {
    const dir = this.autocompleteDirTree.reduce((acc, cur) => acc + '/' + cur.path, '');
    if (!dir.startsWith('/'))
      return '/' + dir;
    return dir;
  }

}
