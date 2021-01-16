import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  constructor(private activatedRoute: ActivatedRoute, private serversService : ServersService, private router : Router) { }

  ngOnInit() {
	const serverId = +this.activatedRoute.snapshot.params['id'];
	this.activatedRoute.params
	.subscribe(
		(params : Params) => {
			console.log(params, " ================== ")
			this.server = this.serversService.getServer(+params['id']);
		
		}
	)
  }
  
  onEdit(){
	this.router.navigate(['edit'], {relativeTo : this.activatedRoute, queryParamsHandling: 'preserve'});	
  }

}
