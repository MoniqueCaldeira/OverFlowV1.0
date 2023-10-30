function winner(atualNivel, poxNivel) {

   Swal.fire({
      title: `Parabéns!! \n Pronto para o próximo Nível?`,
      showDenyButton: true,
      confirmButtonText: 'Proximo Nível',
      denyButtonText: 'Repetir Nível',
   }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         window.location.href = poxNivel;
      } else if (result.isDenied) {
         window.location.href = atualNivel;
      }
   })
}

function loser(atualNivel) {

   Swal.fire({
      title: `Essa não é a Bola Correta \n O Nível será reiciado!`,
      confirmButtonText: 'Reiniciar Nível',
   }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         window.location.href = atualNivel;
      }
   })
}

function menuJogo() {
   Swal.fire({
      icon: "question",
      title: '<strong>Pausa</strong>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
         '<p>Menu Principal</p>',
      cancelButtonText:
         '<p>Continuar</p>',
   }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         window.location.href = "index.html";
      }
   })
}

function tutorial() {
   Swal.fire({
      title: "Tutorial",
      imageUrl: "../assets/tutorial01.png",
      imageWidth: 300,
      text: "Para começar, pressione o botão 'Pop'.",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
         '<p>Próximo</p>',
      cancelButtonText:
         '<p>Sair</p>',
   }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire({
            title: "Tutorial",
            imageUrl: "../assets/tutorial03.png",
            imageWidth: 300,
            text: "Ao pressionar o botão, a primeira bola irá cair.",
            showCloseButton: false,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
               '<p>Próximo</p>',
            cancelButtonText:
               '<p>Sair</p>',
         }).then((result) => {
            if (result.isConfirmed) {
               Swal.fire({
                  title: "Tutorial",
                  imageUrl: "../assets/tutorial02.png",
                  imageWidth: 300,
                  text: "Segure a bola com o botão esquerdo do mouse e solte-a na Pilha. Mas lembre-se que você só podera mover a Bola que está no Topo da Pilha!",
                  showCloseButton: false,
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText:
                     '<p>Próximo</p>',
                  cancelButtonText:
                     '<p>Sair</p>',
               }).then((result) => {
                  if (result.isConfirmed) {
                     Swal.fire({
                        title: "Tutorial",
                        imageUrl: "../assets/tutorial04.png",
                        imageWidth: 300,
                        text: "Utilize as estruturas de Pilha para mover as Bolas e reorganiza-las como desejar. Mas cuidado para não ultrapassar a capacidade de armazenamento causando um 'OverFlow'",
                        showCloseButton: false,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                           '<p>Próximo</p>',
                        cancelButtonText:
                           '<p>Sair</p>',
                     }).then((result) => {
                        if (result.isConfirmed) {
                           Swal.fire({
                              title: "Tutorial",
                              imageUrl: "../assets/tutorial05.png",
                              imageWidth: 300,
                              text: "Coloque as bolas na ordem correta nas Maquina 'Push'.",
                              showCloseButton: false,
                              showCancelButton: true,
                              focusConfirm: false,
                              confirmButtonText:
                                 '<p>Próximo</p>',
                              cancelButtonText:
                                 '<p>Sair</p>',
                           }).then((result) => {
                              if (result.isConfirmed) {
                                 Swal.fire({
                                    title: "Tutorial",
                                    imageUrl: "../assets/tutorial06.png",
                                    imageWidth: 300,
                                    text: "Você terminará os níveis quando todas as Bolas estiverem na Máquina 'Push'.",
                                    showCloseButton: false,
                                    focusConfirm: false,
                                    confirmButtonText:
                                       '<p>Jogar</p>',

                                 })
                              }


                           })
                        }


                     })
                  }


               })
            }


         })
      }

   })
}
