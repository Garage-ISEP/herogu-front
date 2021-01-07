import { UserModel } from '../../../models/user.model';
import { ApiService } from '../../../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  template: ""
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  private subscriber: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.subscriber = this.route.params.subscribe(async params => {
      try {
        if (!params.token) throw new Error("Erreur lors de la requête ! Impossible de vérifier ton adresse mail");

        try {
          await this.api.postRequest<{ token: string }, { status: "success", user: UserModel }>("/verify", { token: params.token });
          if (this.api.userData)
            this.api.userData.verified = true;
          this.api.snack("Ton email à bien été vérifié !");
          this.router.navigateByUrl("/");
        } catch (e) {
          console.error(e);
          throw new Error("Erreur lors de la requête ! Impossible de vérifier ton adresse mail");
        }
      } catch (e) {
        this.throwError(e);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  private throwError(msg: string) {
    this.router.navigateByUrl("/auth");
    this.api.snack(msg, 5000);
  }

}
