// Variaveis globais
let palavras = [];
let idioma = "pt-br";

// Buscar Elementos
const lgpt = document.getElementById("pt-br");
const lgeng = document.getElementById("en-us");
const lges = document.getElementById("es-es");
const tituloHeader = document.getElementById("titulo-header");
const tituloBanner = document.getElementById("titulo-banner");
const descricaoBanner = document.getElementById("descricao-banner");
const inputBanner = document.getElementById("input-banner");
const listaPalavras = document.querySelector(".lista-palavras");
const textoTituloPagina = document.querySelector("title");

// Funções
async function carregarPalavras(idiomaSelecionado) {
  try {
    let arquivo;
    switch (idiomaSelecionado) {
      case "pt-br":
        arquivo = "assets/palavras_alemas.json";
        break;
      case "en-us":
        arquivo = "assets/palavras_alemas_en.json";
        break;
      case "es-es":
        arquivo = "assets/palavras_alemas_es.json";
        break;
      default:
        arquivo = "assets/palavras_alemas.json";
    }

    const response = await fetch(arquivo);
    const dados = await response.json();
    palavras = dados;
    mostrarPalavras(palavras);
  } catch (error) {
    console.error("Erro ao carregar palavras:", error);
  }
}

function mudarIdioma(idiomaSelecionado) {
  idioma = idiomaSelecionado;

  // Remover classe active de todas as bandeiras
  lgpt.classList.remove("active");
  lgeng.classList.remove("active");
  lges.classList.remove("active");

  if (idiomaSelecionado === "pt-br") {
    lgpt.classList.add("active");
    tituloHeader.textContent = "Alemão Divertido";
    tituloBanner.textContent = "Bem-vindo!";
    descricaoBanner.textContent =
      "Clique em uma palavra para ver o significado em alemão, e descubra como o alemão é divertido!";
    inputBanner.placeholder = "Digite uma palavra";
    inputBanner.value = "";
    textoTituloPagina.textContent = "Alemão Divertido";
  } else if (idiomaSelecionado === "en-us") {
    lgeng.classList.add("active");
    tituloHeader.textContent = "Funny German";
    tituloBanner.textContent = "Welcome!";
    descricaoBanner.textContent =
      "Click on a word to see the meaning in German, and discover how German is fun!";
    inputBanner.placeholder = "Enter a word";
    inputBanner.value = "";
    textoTituloPagina.textContent = "Funny German";
  } else if (idiomaSelecionado === "es-es") {
    lges.classList.add("active");
    tituloHeader.textContent = "Alemán Divertido";
    tituloBanner.textContent = "¡Bienvenido!";
    descricaoBanner.textContent =
      "¡Haz clic en una palabra para ver su significado en alemán, y descubre lo divertido que es el alemán!";
    inputBanner.placeholder = "Escribe una palabra";
    inputBanner.value = "";
    textoTituloPagina.textContent = "Alemán Divertido";
  }

  // Recarregar palavras com o novo idioma
  carregarPalavras(idiomaSelecionado);
}

function mostrarPalavras(palavrasParaMostrar) {
  listaPalavras.innerHTML = "";

  palavrasParaMostrar.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "palavra-item list-group-item list-group-item-action mb-2 p-3 border rounded";
    li.style.cursor = "pointer";
    li.style.maxWidth = "600px";
    li.style.width = "100%";

    li.innerHTML = `
      <div class="d-flex flex-column">
        <h4 class="palavra-alema mb-2">${item.palavra}</h4>
        <p class="traducao mb-1">${item.traducao}</p>
        <div class="partes-palavra mb-2">
          ${item.partes
            .map(
              (parte) =>
                `<span class="badge bg-secondary me-1">${parte.palavra} (${parte.significado})</span>`
            )
            .join("")}
        </div>
        <p class="explicacao small text-muted">${item.explicacao}</p>
      </div>
    `;

    li.addEventListener("click", () => {
      // Adicionar efeito visual ao clicar
      li.style.backgroundColor = "#e9ecef";
      setTimeout(() => {
        li.style.backgroundColor = "";
      }, 200);
    });

    listaPalavras.appendChild(li);
  });
}

function filtrarPalavras(termo) {
  const palavrasFiltradas = palavras.filter(
    (item) =>
      item.palavra.toLowerCase().includes(termo.toLowerCase()) ||
      item.traducao.toLowerCase().includes(termo.toLowerCase())
  );
  mostrarPalavras(palavrasFiltradas);
}

// Eventos
lgpt.addEventListener("click", () => {
  mudarIdioma("pt-br");
});

lgeng.addEventListener("click", () => {
  mudarIdioma("en-us");
});

lges.addEventListener("click", () => {
  mudarIdioma("es-es");
});

inputBanner.addEventListener("input", (e) => {
  const valor = e.target.value;
  if (valor.trim() === "") {
    mostrarPalavras(palavras);
  } else {
    filtrarPalavras(valor);
  }
});

// Inicializar
mudarIdioma("pt-br");
