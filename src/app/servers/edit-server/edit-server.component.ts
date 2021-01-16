import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  
  constructor(private activatedRoute: ActivatedRoute, private serversService : ServersService) { }

  ngOnInit() {
	this.activatedRoute.queryParams
      .subscribe(
        (queryParams: Params) => {		
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
	  console.log(this.allowEdit)
    this.activatedRoute.fragment.subscribe();
	const id = +this.activatedRoute.snapshot.params['id'];
	this.server = this.serversService.getServer(id);
	console.log(this.server)
	this.serverName = this.server.name;
	this.serverStatus = this.server.status;
  }
	
  onUpdateServer() {
	console.log(this.server);
	this.serversService.updateServer(this.server.id,this.serverName,this.serverStatus);
  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
