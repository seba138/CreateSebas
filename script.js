// Texto con efecto máquina de escribir
const texto = "He preparado algo para ti con mucho amor. Espero que te guste y que lo guardes como un recuerdo bonito de nosotros ❤️";
const textoElemento = document.getElementById("texto-maquina");
let index = 0;
function escribirTexto() {
  if (index < texto.length) {
    textoElemento.textContent += texto.charAt(index);
    index++;
    setTimeout(escribirTexto, 70);
  }
}
escribirTexto();

// Corazones flotando
const corazonesContenedor = document.querySelector(".corazones");
function crearCorazon() {
  const heart = document.createElement("div");
  heart.classList.add("corazon");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 3 + Math.random() * 3 + "s";
  heart.style.opacity = Math.random();
  corazonesContenedor.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(crearCorazon, 250);

// Pantallas
const pantallas = [
  "pantalla-bienvenida",
  "pantalla-carta1",
  "pantalla-carta2",
  "pantalla-razones",
  "pantalla-juego",
  "pantalla-pregunta",
  "pantalla-respuesta",
  "pantalla-aventuras"
].map(id => document.getElementById(id));

function mostrarPantalla(pantallaObjetivo) {
  pantallas.forEach(pantalla => {
    if (pantalla === pantallaObjetivo) {
      pantalla.classList.remove("oculto", "visible");
      void pantalla.offsetWidth;
      pantalla.classList.add("fade-in", "visible");
    } else {
      pantalla.classList.remove("visible", "fade-in");
      pantalla.classList.add("oculto");
    }
  });
}

window.addEventListener("load", () => mostrarPantalla(pantallas[0]));

// Botones
const btns 
= {
  entrar: document.getElementById("btn-entrar"),
  siguienteCarta1: document.getElementById("btn-siguiente-carta1"),
  siguienteCarta2: document.getElementById("btn-siguiente-carta2"),
  siguienteRazones: document.getElementById("btn-siguiente-razones"),
  siguienteJuego: document.getElementById("btn-siguiente-juego"),
  si: document.getElementById("btn-si"),
  claro: document.getElementById("btn-claro"),
  aventuras: document.getElementById("btn-aventuras")
};

const btnDescargarPDF = document.getElementById("btn-descargar-pdf");

btns.entrar.addEventListener("click", () => mostrarPantalla(pantallas[1]));
btns.siguienteCarta1.addEventListener("click", () => mostrarPantalla(pantallas[2]));
btns.siguienteCarta2.addEventListener("click", () => {
  mostrarPantalla(pantallas[3]);
  mostrarRazonesAnimadas();
});
btns.siguienteRazones.addEventListener("click", () => {
  mostrarPantalla(pantallas[4]);
  iniciarJuego();
});

//Lista de razones
const razones = [
  "M – Me haces feliz.",
  "I – Iluminas mis días.",
  "C – Contigo todo es mejor.",
  "A – Amo tu forma de ser.",
  "E – Eres mi solecito.",
  "L – Lo eres todo para mí.",
  "A – Amo cada momento contigo.",
];

const listaRazones = document.getElementById("lista-razones");

function mostrarRazonesAnimadas() {
  listaRazones.innerHTML = "";
  let i = 0;
  function mostrar() {
    if (i < razones.length) {
      const li = document.createElement("li");

      // Separa la letra inicial y el texto
      const letra = razones[i].charAt(0);
      const mensaje = razones[i].substring(4); // salta "X – "

      li.innerHTML = `<span class="letra-destacada">${letra}</span><span class="texto-razon">${mensaje}</span>`;

      listaRazones.appendChild(li);
      setTimeout(() => li.classList.add("visible"), 100);
      i++;
      setTimeout(mostrar, 600);
    }
  }
  mostrar();
}

// Juego de corazones
// Variables
const areaJuego = document.getElementById("area-juego");
const mensajeJuego = document.getElementById("mensaje-juego");
const btnSiguienteJuegoEl = document.getElementById("btn-siguiente-juego"); // bien llamado
const pantallaPregunta = document.getElementById("pantalla-pregunta");

let toquesCorrectos = 0;
const toquesRequeridos = 5;

function iniciarJuego() {
  toquesCorrectos = 0;
  mensajeJuego.textContent = "";
  btnSiguienteJuegoEl.classList.add("oculto");  // corregido aquí
  areaJuego.innerHTML = "";

  const totalCorazones = 10;
  const corazonesLaten = new Set();
  while (corazonesLaten.size < toquesRequeridos) {
    corazonesLaten.add(Math.floor(Math.random() * totalCorazones));
  }

  let bloqueoError = false;

  for (let i = 0; i < totalCorazones; i++) {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon-juego");
    corazon.style.transition = "transform 0.3s ease, background-color 0.3s ease";

    if (!corazonesLaten.has(i)) {
      corazon.classList.add("corazon-falso");
      corazon.style.animation = "none";
      corazon.style.opacity = "0.5";
      corazon.style.cursor = "pointer";
    } else {
      corazon.style.cursor = "pointer";
      corazon.style.animation = "latido 1.5s infinite";
    }

    corazon.dataset.correcto = corazonesLaten.has(i) ? "true" : "false";

    corazon.addEventListener("click", () => {
      if (bloqueoError) return;
      if (corazon.classList.contains("tocado")) return;

      if (corazon.dataset.correcto === "true") {
        corazon.classList.add("tocado");
        corazon.style.backgroundColor = "#ad1457";
        corazon.style.animation = "none";
        corazon.style.transform = "scale(1.3)";
        setTimeout(() => (corazon.style.transform = "scale(1)"), 300);

        toquesCorrectos++;
        mensajeJuego.textContent = "";

        if (toquesCorrectos === toquesRequeridos) {
          mensajeJuego.textContent = "¡Lo lograste, mi corazooon! ❤️";
          btnSiguienteJuegoEl.classList.remove("oculto");
          Array.from(areaJuego.children).forEach(c => (c.style.pointerEvents = "none"));
        }
      } else {
        bloqueoError = true;
        mensajeJuego.textContent = "Ese no late Micaela. Inténtalo de nuevo 💔";
        corazon.style.transform = "scale(1.2)";
        corazon.style.filter = "brightness(0.7)";
        setTimeout(() => {
          corazon.style.transform = "scale(1)";
          corazon.style.filter = "brightness(1)";
          bloqueoError = false;
        }, 600);
      }
    });

    areaJuego.appendChild(corazon);
  }
}

btnSiguienteJuegoEl.addEventListener("click", () => {
  mostrarPantalla(pantallaPregunta);
  iniciarPregunta();
});



// Pregunta
const contadorEl = document.getElementById("contador");
const textoPregunta = document.getElementById("texto-pregunta");
const botonesPregunta = document.getElementById("botones-pregunta");

function iniciarPregunta() {
  let contador = 10;
  contadorEl.textContent = contador;
  textoPregunta.classList.add("oculto");
  botonesPregunta.classList.add("oculto");

  const interval = setInterval(() => {
    contador--;
    if (contador > 0) {
      contadorEl.textContent = contador;
    } else {
      clearInterval(interval);
      contadorEl.textContent = "";
      textoPregunta.classList.remove("oculto");
      void textoPregunta.offsetWidth;
      textoPregunta.classList.add("fade-in", "visible");
      setTimeout(() => {
        botonesPregunta.classList.remove("oculto");
        botonesPregunta.classList.add("fade-in", "visible");
      }, 800);
    }
  }, 1000);
}

btns.si.addEventListener("click", mostrarRespuesta);
btns.claro.addEventListener("click", mostrarRespuesta);

function mostrarRespuesta() {
  mostrarPantalla(pantallas[6]);
  iniciarConfeti();
}

// Confeti
function iniciarConfeti() {
  const confetiContainer = document.getElementById("confeti");
  confetiContainer.innerHTML = "";
  const colors = ["#e91e63", "#f48fb1", "#ad1457", "#f06292", "#f8bbd0", "#c2185b"];
  const totalConfeti = 150;

  for (let i = 0; i < totalConfeti; i++) {
    const confeti = document.createElement("div");

    const size = 8 + Math.random() * 8; // tamaño entre 8px y 16px
    const left = Math.random() * window.innerWidth;
    const duration = 2 + Math.random() * 3; // duración 2 a 5 segundos
    const delay = Math.random() * 3; // delay aleatorio para dispersar la caída
    const rotateStart = Math.random() * 360;
    const rotateEnd = rotateStart + (Math.random() > 0.5 ? 360 : -360);
    const color = colors[Math.floor(Math.random() * colors.length)];

    confeti.style.position = "absolute";
    confeti.style.width = size + "px";
    confeti.style.height = size + "px";
    confeti.style.backgroundColor = color;
    confeti.style.left = left + "px";
    confeti.style.top = "-20px"; // empiezan justo arriba del viewport
    confeti.style.borderRadius = "50%";
    confeti.style.opacity = 0.8;
    confeti.style.pointerEvents = "none";
    confeti.style.animation = `confetiDrop ${duration}s linear forwards`;
    confeti.style.animationDelay = delay + "s";

    // Añadir animación personalizada con keyframes via JS
    confeti.animate([
      { transform: `translateX(0px) translateY(0) rotate(${rotateStart}deg)` },
      { transform: `translateX(${Math.random() * 100 - 50}px) translateY(${window.innerHeight + 30}px) rotate(${rotateEnd}deg)` }
    ], {
      duration: duration * 1000,
      delay: delay * 1000,
      iterations: 1,
      fill: "forwards",
      easing: "linear"
    });

    confetiContainer.appendChild(confeti);

    setTimeout(() => confeti.remove(), (duration + delay) * 1000 + 100);
  }
}

// Validación de clave
function validarClave() {
  const claveIngresada = document.getElementById("clave").value.trim().toLowerCase();
  const claveCorrecta = "micorazon"; // Cambia por la tuya

  if (claveIngresada === claveCorrecta) {
    const pantalla = document.getElementById("pantalla-inicial");
    pantalla.style.opacity = "0";
    setTimeout(() => pantalla.remove(), 800);
    document.body.style.overflow = "auto"; // Habilita scroll si estaba bloqueado
  } else {
    document.getElementById("mensaje-error").style.display = "block";
  }
}

// animación
function cambiarPantalla(actualId, siguienteId) {
  const actual = document.getElementById(actualId);
  const siguiente = document.getElementById(siguienteId);

  // Oculta la pantalla actual
  actual.classList.remove("visible");
  setTimeout(() => {
    actual.style.display = "none";

    // Muestra la siguiente
    siguiente.style.display = "flex";
    setTimeout(() => {
      siguiente.classList.add("visible");
    }, 10); // pequeña pausa para que se active la transición
  }, 500); // coincide con el tiempo de animación
}




btns.aventuras.addEventListener("click", () => mostrarPantalla(pantallas[7]));


// --- Descargar PDF ---
btnDescargarPDF.addEventListener("click", () => {
const element = document.createElement("div");
element.style.padding = "30px";
element.style.fontFamily = "'Georgia', serif";
element.innerHTML = `
  <div style="max-width: 700px; margin: auto; font-size: 16px; color: #4e2a2a; line-height: 1.8;">
    <p style="text-align:right; font-style: italic; color: #999;">
      Ambato, ${new Date().toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" })}
    </p>  <br>

    <h1 style="color:#c2185b; text-align:center; font-size: 30px; margin-top: 10px;">
      Un recuerdo para ti
    </h1> 


    <p style="margin-top: 25px;">
      Hola, mi amor. Si estás leyendo esto, es porque llegaste hasta el final de algo que hice con todo mi corazón para ti.
      Guárdalo donde guardas las cosas bonitas: en lo más profundo de tu corazón.
    </p>

    <p>
      Quiero que sepas que cada palabra y cada detalle fueron pensados solo para ti.
      No siempre me salen las palabras perfectas, pero todo esto lo hice con amor.
    </p>

    <h3 style="color:#ad1457; margin-top: 30px;">Cosas que aún no te he dicho</h3>
    <ul style="padding-left: 20px;">
      <li>Me inspiras a soñar más grande.</li>
      <li>Cada gesto y palabra tuya me hace quererte más.</li>
      <li>Estoy orgulloso de ti, incluso cuando no lo digo.</li>
      <li>A veces te miro y me siento el más afortunado de tenerte.</li>
      <li>Contigo, incluso el silencio se siente bonito.</li>
    </ul>

    <p style="margin-top: 25px;">
      No sé qué pasará mañana, pero hoy me siento feliz por haberte encontrado.
      Gracias por ser parte de mi vida y por dejarme ser parte de la tuya.
    </p>

  

    <h3 style="color:#ad1457; margin-top: 50px;">Imagina esto…</h3>
    <p>
      Imagina que pasan los años y encontramos esta carta.  
      Quizás sonrías, quizás llores un poquito, pero estoy seguro de que te hará recordar cuánto te quise ese dia hasta el dia hoy.  
      Es una promesa escrita, un pequeño pedazo de mí que dejo contigo.
    </p>

    <p>
      Tal vez cambien muchas cosas, pero lo que siento por ti nunca cambiara.
      En esta página no solo hay letras, hay recuerdos, hay ilusión, hay amor.
      Es algo que quiero que guardes, no solo en tu mente, sino en tu corazón.
    </p>

    <p style="text-align: center; margin-top: 40px; font-size: 18px; color: #ad1457;">
      Este recuerdo es de los dos. Gracias por estar, por ser, y por quedarte.
    </p>

    <p style="text-align:center; color:#c2185b; margin-top:40px; font-style: italic;">
      Para ti Micaela ❤️
    </p>

    <p style="text-align:center; color:#6d1b3b; margin-top:10px; font-size: 14px;">
      Este es el comienzo de nuestra historia – 
      ${new Date().toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" })}
    </p>

      <p style="text-align:center; color:#4e2a2a; margin-top: 40px; font-size: 16px; font-style: italic;">
      De Sebastián para Micaela
    </p>
  </div>
`;


html2pdf()
  .set({
    margin: 0,
    filename: "Carta.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
      useCORS: true
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  })
  .from(element)
  .toPdf()
  .get('pdf')
  .then(function (pdf) {
    const totalPages = pdf.internal.getNumberOfPages();
    if (totalPages > 1) pdf.deletePage(2);
  })
  .save();

});



