import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '../../../modules/services/loading/loading.service';

@Component({
  selector: 'app-loading-dialog',
  standalone: true,
  imports: [DialogModule, ProgressSpinnerModule],
  templateUrl: './loading-dialog.component.html',
  styleUrl: './loading-dialog.component.css'
})
export class LoadingDialogComponent {

  constructor(public readonly loadingService: LoadingService){}

}
