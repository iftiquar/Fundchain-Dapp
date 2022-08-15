import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { promises } from 'dns';
import { urlSource } from 'ipfs-http-client';
const {create}=require('ipfs-http-client');
// https://www.npmjs.com/package/ipfs-http-client#usage

import {secret} from '../../../environments/secret';

class Files{
  list:Array<File>;
  names:Array<string>;
  constructor(){
    this.list=new Array<File>();
    this.names=new Array<string>();
  }
}

@Component({
  selector: 'ngx-ipfs',
  templateUrl: './ipfs.component.html',
  styleUrls: ['./ipfs.component.scss']
})

@Injectable({
  providedIn: 'root',
})
export class IpfsComponent {

  client:any;
  files:Files;
  hashes :Array<string> = [];

  xtz:any;
  constructor() {
    // fetch(`http://api.coinlayer.com/api/live?access_key=${secret.COIN_LAYER}`).then(response=>response.json())
    // .then(data=>{
    //   this.xtz=(data["rates"].XTZ);
    //   console.log(this.dollorTOtez(1));
    //   console.log(this.inrTOtez(1));
    // });
  }

  dollorTOtez(dollors){
    return dollors/this.xtz;
  }

  inrTOtez(inr){
    return inr/(this.xtz*73);
  }

  // async ngOnInit(): Promise<void> {
  //   this.files= new Files();
  //   this.client = await create("https://ipfs.infura.io:5001/api/v0");
  // }

  async updateFiles(files){
    this.files=new Files();
    this.client = await create("https://ipfs.infura.io:5001/api/v0");

    let len=files.length;
    for(var i=0;i<len;i++){
      if(files[i].type.substring(0,5)!="image"){
        continue;
      }
      this.files.list.push(files[i]);
      this.files.names.push(files[i].name);
    }
  }
  async upload():Promise<void>{
    let len=this.files.list.length;
    for(var i=0;i<len;i++){
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.files.list[i]);
      reader.onloadend = async ()=> {
        let buffer=new Uint8Array(reader.result as ArrayBuffer);
        const result = await this.client.add(buffer);
        this.hashes.push(result?.path);
        // const url=`https://ipfs.io/ipfs/${result.path}`
        // (document.getElementById("output") as HTMLImageElement).src=url;
        // console.log(`https://ipfs.io/ipfs/${result.path}`);
      }
    }
    this.files=new Files();
  }
  get_hashes():Array<string>
  {
    return this.hashes;
  }
}
