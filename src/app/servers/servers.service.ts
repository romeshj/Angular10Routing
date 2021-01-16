import { Injectable } from '@angular/core';

@Injectable()
export class ServersService {

  servers = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    }
  ];

  constructor() { }
  
  
  getServers() {
    return this.servers;
  }
  
  getServer(id : number) {
    return this.servers.find(e => e.id === id);
  }
  
  updateServer(id: number, name : string, status : string){
	const server = this.getServer(id);
	if(server){	
		server.name = name;
		server.status= status;
	}
	console.log(server, name, status);
  }
}
