import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name: string = 'Gülşen Taştan';
  jobTitle: string = 'Frontend Developer';
  description: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, ab autem repellat reiciendis ipsam perspiciatis.';


  services = [
    {
      title: 'Web Development',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quia voluptas nostrum?',
      iconClass: 'fas fa-code'
    },
    {
      title: 'Artificial Intelligence',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quia voluptas nostrum?',
      iconClass: 'fas fa-brain'
    },
    {
      title: 'Backend developer',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quia voluptas nostrum?',
      iconClass: 'fas fa-server'
    }
  ];
}
