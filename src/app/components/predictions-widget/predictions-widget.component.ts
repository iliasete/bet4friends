import { Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-predictions-widget',
  templateUrl: './predictions-widget.component.html',
  styleUrls: ['./predictions-widget.component.css']
})
export class PredictionsWidgetComponent {
  private _matches: any;
  @Input("matches")
  set matches(matches) {
    this._matches = matches;
    this.setTableData(matches);
  }
  @Input() players: any = [];

  displayedColumns: any[] = [];
  tableSourceData: any[] = [];

  currentUser = this.users$.currentUser;

  constructor(private users$: UsersService) { }

  ngOnInit() {
    this.setTableData(this._matches);
  }

  private setTableData(matches: any) {
    this.displayedColumns = ['match'];
    this.tableSourceData = Object.values(matches).map((match: any) => ({ match: match.label }));

    this.players.forEach((player: any) => {
      this.displayedColumns.push(player.username);
      this.tableSourceData[player.username] = player.name;
    });
  }
}
