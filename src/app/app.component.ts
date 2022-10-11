import { Component } from '@angular/core';
import axios from 'axios';


let isLocal = true;
const rawHubHost = "https://raw.githubusercontent.com/";
const rawHubPath = "/master/pom.xml";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor() {
  }

  public submitRepo(){
    let soMaven = document.getElementById('so-maven');
    let notMaven = document.getElementById('not-maven');
    let repoURL = (<HTMLInputElement>document.getElementById('repo'))?.value;
    if(repoURL === '' || repoURL.indexOf('github') === -1){
      window.alert("Please input a Github repository URL");
      return false;
    }
    //M offset is 1
    let repoPath = repoURL.slice(repoURL.indexOf('m/') + 1);

    axios.get(`${rawHubHost}${repoPath}${rawHubPath}`)
      .then((resp) => {
        document.getElementById('maven-maybe')?.setAttribute('style', 'display: none;');
      })
      .then((response) => {
        soMaven?.setAttribute('style', 'display: block;')
        notMaven?.setAttribute('style', 'display: none;')
      })
      .catch(function(err){
        soMaven?.setAttribute('style', 'display: none;')
        notMaven?.setAttribute('style', 'display: block;')
      })

    return false;
  }
}
