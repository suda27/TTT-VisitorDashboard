import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Visitor } from './visitor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TTT-Visitor-dashboard';
  count;
  visitors: any[] = [];
  tempVisitorData: Visitor[] = []

  constructor(private svc: DashboardService) { }

  ngOnInit() {
    this.svc.getTttInfo().subscribe({
      next: data => {
        this.tempVisitorData = data.Items;
        for (let i = 0; i < this.tempVisitorData.length; i++) {
          this.tempVisitorData[i].date = this.convertToEpochTime(this.tempVisitorData[i].date);
        }
        var sortedArray = this.tempVisitorData.sort((n1, n2) => n2.date - n1.date);
        for (let i = 0; i < sortedArray.length; i++) {
          this.setVistorInfo(i, sortedArray);
        }
        this.count = data.Count;
      }
    });

  }

  private setVistorInfo(i: number, sortedArray: Visitor[]) {
    this.visitors[i] = new Visitor();
    this.visitors[i].city = sortedArray[i].city;
    this.visitors[i].date = this.convertToDateFormat(sortedArray[i].date);
    this.visitors[i].ip = sortedArray[i].ip;
    this.visitors[i].country = sortedArray[i].country;
    this.visitors[i].loc = sortedArray[i].loc;
    this.visitors[i].org = sortedArray[i].org;
    this.visitors[i].postal = sortedArray[i].postal;
    this.visitors[i].region = sortedArray[i].region;
    this.visitors[i].timezone = sortedArray[i].timezone;
    this.visitors[i].hostname = sortedArray[i].hostname;
    // console.log(this.visitors[i])
  }

  convertToEpochTime(str) {
    return new Date(str).getTime();
  }

  convertToDateFormat(str) {

    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-") + " " + [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
  }


}
