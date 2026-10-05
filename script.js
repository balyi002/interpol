fetch("https://ws-public.interpol.int/notices/v1/red")
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(datos) {
    let contenedor = document.getElementById("notices-container");
    let personas = datos._embedded.notices;

    for (let i = 0; i < personas.length; i++) {
      let persona = personas[i];
      let nombre = persona.forename + " " + persona.name;
      let foto = "https://via.placeholder.com/250x300?text=Sin+Foto";

      if (persona._links && persona._links.thumbnail) {
        foto = persona._links.thumbnail.href;
      }

      contenedor.innerHTML += `
        <div class="card">
          <img src="${foto}" class="card-img" onerror="this.src='https://via.placeholder.com/250x300?text=Sin+Foto'">
          <div class="card-info">
            <h3>${nombre}</h3>
            <p>Nacimiento: ${persona.date_of_birth}</p>
            <p>Nacionalidad: ${persona.nationalities}</p>
            <p>ID: ${persona.entity_id}</p>
          </div>
        </div>
      `;
    }
  });
