fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
  })
  .catch(error => console.log('Error al cargar el header:', error));

fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(error => console.log('Error al cargar el footer:', error));

  document.addEventListener("DOMContentLoaded", function () {
    const mapa = L.map("mapa").setView([36.8432, -2.4499], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapa);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                mapa.setView([lat, lon], 15);
                L.marker([lat, lon]).addTo(mapa).bindPopup("📍 Tu ubicación").openPopup();
            },
            function (error) {
                console.warn("❌ Ubicación no permitida, mostrando MasterD.");
                mostrarUbicacionPorDefecto();
            }
        );
    } else {
        mostrarUbicacionPorDefecto();
    }

    function mostrarUbicacionPorDefecto() {
        L.marker([36.8432, -2.4499]).addTo(mapa).bindPopup("🏫 MasterD - Almería").openPopup();
    }

    const formulario = document.getElementById("formularioContacto");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();

        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,40}$/;
        const regexApellidos = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,60}$/;
        const regexTelefono = /^[0-9]{9}$/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexNombre.test(nombre)) {
            alert("⚠️ El nombre debe tener entre 3 y 40 caracteres y solo contener letras y espacios.");
            return;
        }
        if (!regexApellidos.test(apellidos)) {
            alert("⚠️ Los apellidos deben tener entre 4 y 60 caracteres y solo contener letras y espacios.");
            return;
        }
        if (!regexTelefono.test(telefono)) {
            alert("⚠️ El teléfono debe tener exactamente 9 dígitos numéricos.");
            return;
        }
        if (!regexEmail.test(email)) {
            alert("⚠️ El correo electrónico no es válido.");
            return;
        }

        alert("✅ Tu formulario ha sido enviado con éxito.");
        formulario.reset();
    });
});