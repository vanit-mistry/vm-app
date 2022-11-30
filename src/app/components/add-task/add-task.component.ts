import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/service/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  fish: string = "";
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.fish) {
      alert('Please add Fish');
      return;
    }

    const newFish = { text: this.fish, reminder: this.reminder };

    this.onAddTask.emit(newFish);
    this.fish = '';
    this.reminder = false;
  }
}
