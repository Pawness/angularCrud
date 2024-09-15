import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { user } from '../Interfaces/User.Model';
import { catchError, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HttpClientModule , AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  http = inject(HttpClient);
  
  users$ = this.getUser();

  userForm = new FormGroup({
    fullname : new FormControl<string>(''),
    age: new FormControl<number>(0),
    bloodgroup : new FormControl<string>(''),
    email : new FormControl<string>(''),
    address: new FormControl<string>(''),
    phonenumber: new FormControl<number>(0)
  });

  private getUser():Observable<user[]>{
    return this.http.get<user[]>('http://localhost:5133/api/user');
  }

  public delete(id: number){
    
    this.http.delete(`http://localhost:5133/api/user/${id}`)
    .subscribe({
      next : (value) => {
        console.log(value)
    this.users$ = this.getUser();
    this.userForm.reset();
      }
    });

  }

  public onFormSubmit(){
    this.http.post<user>('http://localhost:5133/api/user' , this.userForm.value)
    .subscribe({
      next:(value) => {
        console.log(value);
        this.users$ = this.getUser();
        this.userForm.reset();
      }
    });
    
    this.users$ = this.getUser();
    this.userForm.reset();
    console.log(this.userForm.value); 
  }
}
