// Variaveis globais
let palavras = [];
let idioma = "pt-br";

// Buscar Elementos
const lgpt = document.getElementById("pt-br");
const lgeng = document.getElementById("en-us");
const tituloHeader = document.getElementById("titulo-header");
const tituloBanner = document.getElementById("titulo-banner");
const descricaoBanner = document.getElementById("descricao-banner");
const inputBanner = document.getElementById("input-banner");
const listaPalavras = document.querySelector(".lista-palavras");
const textoTituloPagina = document.querySelector("title");

// Funções
async function carregarPalavras(idiomaSelecionado) {
  try {
    const arquivo =
      idiomaSelecionado === "pt-br"
        ? "assets/palavras_alemas.json"
        : "assets/palavras_alemas_en.json";

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

  if (idiomaSelecionado === "pt-br") {
    lgeng.classList.remove("active");
    lgpt.classList.add("active");
    tituloHeader.textContent = "Alemão Divertido";
    tituloBanner.textContent = "Bem-vindo!";
    descricaoBanner.textContent =
      "Clique em uma palavra para ver o significado em alemão, e descubra como o alemão é divertido!";
    inputBanner.placeholder = "Digite uma palavra";
    inputBanner.value = "";
    textoTituloPagina.textContent = "Alemão Divertido";
  } else {
    lgpt.classList.remove("active");
    lgeng.classList.add("active");
    tituloHeader.textContent = "Funny German";
    tituloBanner.textContent = "Welcome!";
    descricaoBanner.textContent =
      "Click on a word to see the meaning in German, and discover how German is fun!";
    inputBanner.placeholder = "Enter a word";
    inputBanner.value = "";
    textoTituloPagina.textContent = "Funny German";
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
