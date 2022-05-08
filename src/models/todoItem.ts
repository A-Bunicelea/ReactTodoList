export default class TodoItem {
  id: string;
  task: string;
  deadline: string;
  startTime: string;
  endTime: string;
  isCompleted: boolean;

  constructor(id = "", task = "", deadline = "", startTime = "", endTime = "", isCompleted = false) {
    this.id = id;
    this.task = task;
    this.deadline = deadline;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isCompleted = isCompleted;
  }
}
