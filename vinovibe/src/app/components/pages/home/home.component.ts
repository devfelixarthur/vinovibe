import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardWineComponent } from '../../card-wine/card-wine.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardWineComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  wines = [
    {
      image: 'https://i.ibb.co/ws8rzk8/735721be525c.jpg',
      name: 'Reservado',
      adega: 'Concha Y Toro',
      Pais: 'Argentina',
      uva: 'Merlot',
      safra: 2020,
      avaliation: 4.2,
      qunatityAvaliation: 52,
      comments: [
        {
          idComment: 1,
          idUsuario: 2,
          nomeUsuario: "Usuário Teste",
          comentarios: "Vinho bom demais",
          dataCadastro: "2024-06-24T16:59:21"
        },
        {
          idComment: 2,
          idUsuario: 1,
          nomeUsuario: "Arthur Felix de Lima Andrade",
          comentarios: "Alterando Comment",
          dataCadastro: "2024-06-24T17:04:48"
        },
        {
          idComment: 3,
          idUsuario: 1,
          nomeUsuario: "Arthur Felix de Lima Andrade",
          comentarios: "123",
          dataCadastro: "2024-06-24T17:05:18"
        }
      ]
    },
    {
      image: 'https://i.ibb.co/ws8rzk8/735721be525c.jpg',
      name: 'Gran Reserva',
      adega: 'Santa Carolina',
      Pais: 'Chile',
      uva: 'Cabernet Sauvignon',
      safra: 2019,
      avaliation: 4.5,
      qunatityAvaliation: 87,
      comments: [
        {
          idComment: 1,
          idUsuario: 3,
          nomeUsuario: "João Silva",
          comentarios: "Excelente vinho, recomendo!",
          dataCadastro: "2024-05-20T14:22:01"
        },
        {
          idComment: 2,
          idUsuario: 4,
          nomeUsuario: "Maria Souza",
          comentarios: "Muito bom, vale a pena.",
          dataCadastro: "2024-05-25T17:18:12"
        }
      ]
    },
    {
      image: 'https://i.ibb.co/ws8rzk8/735721be525c.jpg',
      name: 'Reservado',
      adega: 'Concha Y Toro',
      Pais: 'Argentina',
      uva: 'Merlot',
      safra: 2020,
      avaliation: 4.2,
      qunatityAvaliation: 52,
      comments: [
        {
          idComment: 1,
          idUsuario: 2,
          nomeUsuario: "Usuário Teste",
          comentarios: "Vinho bom demais",
          dataCadastro: "2024-06-24T16:59:21"
        },
        {
          idComment: 2,
          idUsuario: 1,
          nomeUsuario: "Arthur Felix de Lima Andrade",
          comentarios: "Alterando Comment",
          dataCadastro: "2024-06-24T17:04:48"
        },
        {
          idComment: 3,
          idUsuario: 1,
          nomeUsuario: "Arthur Felix de Lima Andrade",
          comentarios: "123",
          dataCadastro: "2024-06-24T17:05:18"
        }
      ]
    },
    {
      image: 'https://i.ibb.co/ws8rzk8/735721be525c.jpg',
      name: 'Gran Reserva',
      adega: 'Santa Carolina',
      Pais: 'Chile',
      uva: 'Cabernet Sauvignon',
      safra: 2019,
      avaliation: 4.5,
      qunatityAvaliation: 87,
      comments: [
        {
          idComment: 1,
          idUsuario: 3,
          nomeUsuario: "João Silva",
          comentarios: "Excelente vinho, recomendo!",
          dataCadastro: "2024-05-20T14:22:01"
        },
        {
          idComment: 2,
          idUsuario: 4,
          nomeUsuario: "Maria Souza",
          comentarios: "Muito bom, vale a pena.",
          dataCadastro: "2024-05-25T17:18:12"
        }
      ]
    }
  ];

  toggleActive(event: any) {
    const button = event.target;
    button.classList.toggle('active');
  }
}
