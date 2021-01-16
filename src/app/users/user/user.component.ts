import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {
	user: {id: number, name: string};
	paramsSubscription: Subscription;
	
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
	this.user = {
		id : this.activatedRoute.snapshot.params['userId'],
		name : this.activatedRoute.snapshot.params['userName']
	}
	
	this.paramsSubscription = this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['userId'];
          this.user.name = params['userName'];
        }
      );
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
