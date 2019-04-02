import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrls: ['./live-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LivePreviewComponent implements OnInit {
  @Input() data: string;
  @Output() fullscrenEmit = new EventEmitter();

  rubrik: String = 'Rubrik';
  time: Number = 34;

  previewToggle: Boolean = true;
  fullscreenToggle: boolean = false;

  constructor() {}

  togglePreview() {
    this.previewToggle = !this.previewToggle;
  }
  toggleFullscren() {
    this.fullscreenToggle = !this.fullscreenToggle;
    this.fullscrenEmit.emit(this.fullscreenToggle);
  }

  ngOnInit() {}
}
