import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingDialogComponent } from "./shared/components/loading-dialog/loading-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  


}
