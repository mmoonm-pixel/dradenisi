# dradenisi

Landing page responsiva da **Dra. Denisi Coelho Gomes**, cirurgiã-dentista em Pirabeiraba, Joinville/SC. Código estático em HTML, CSS e JavaScript, com servidor local em Node.js e build sem bundler.

## Requisitos e execução

- Node.js 22 ou superior e npm.
- Nenhuma variável secreta ou arquivo `.env` é necessário.

```bash
npm ci
npm start
```

Acesse **http://localhost:3000**. Para usar outra porta, defina a variável `PORT` no terminal. O servidor serve `public/`; não abre o navegador automaticamente.

## Build

```bash
npm run build
```

O comando verifica as referências locais de imagens, fontes e estilos, limpa `dist/` e copia os arquivos de `public/` para ela. A pasta `dist/` é a entrega estática completa. Não há deploy automático ou integração com a Vercel.

## Testes

```bash
npm test
```

Os testes unitários verificam a data de Joinville, dias úteis e a composição/codificação da solicitação enviada ao WhatsApp.

Os testes de interface usam **Playwright 1.62.1**, declarado em `devDependencies` e fixado no `package-lock.json`:

```bash
npx playwright install chromium
```

Mantenha `npm start` rodando em um terminal e execute em outro:

```bash
npm run test:browser
npm run test:navigation
npm run test:motion
npm run test:submit
```

Em Linux, caso faltem bibliotecas de sistema, use `npx playwright install --with-deps chromium`. Para testar com um Chromium já instalado, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE` com seu caminho. `TEST_BASE_URL` permite testar outra origem; por padrão usa `http://localhost:3000`. Em CI, `CI=1` habilita a execução sem sandbox do navegador. Capturas de teste ficam em `tests/artifacts/`, ignoradas pelo Git.

## Organização

```text
public/                 HTML, estilos, JavaScript e assets locais
  data.js               Contatos, serviços, datas e mensagem WhatsApp
  navigation.js         Lista compartilhada e seção atual
  motion.js             Entradas ao rolar e redução de movimento
  map.js                Leaflet com marcador de sorriso
  images/               Imagens oficiais originais e versões WebP
  fonts/                Manrope e licença SIL OFL
  vendor/               Leaflet 1.9.4, imagens auxiliares e licença
tests/                  Testes de dados e de interface
scripts/build.mjs       Build estático e validação de assets
server.mjs              Servidor local sem dependências de produção
docs/                   Verificação cartográfica do endereço
```

O código do site não tem dependências de execução instaladas via npm. Leaflet e Manrope são distribuídos localmente, com suas licenças. Playwright é usado somente no desenvolvimento. `node_modules/` não acompanha o repositório ou ZIP; `npm ci` o recria a partir do lockfile.

## Funcionalidades

Navegação responsiva compartilhada, hero com seleção de imagem por dispositivo, serviços com seleção persistente, formulário acessível com validação de datas, solicitação via WhatsApp, apresentação responsiva, depoimentos fornecidos, mapa com marcador personalizado, fundo animado com redução de movimento, WhatsApp flutuante e retorno ao topo no rodapé.

O formulário não armazena dados. O visitante revisa e envia a mensagem no WhatsApp; a consulta depende da confirmação da equipe. Não há banco de dados, analytics, rastreamento ou agenda fictícia.

## Imagens e mapa

As imagens oficiais foram baixadas dos arquivos identificados nas páginas fornecidas:

- Capa desktop: https://ibb.co/Jws00brX
- Capa mobile: https://ibb.co/Qv7Z4Nvd
- Logo: https://ibb.co/C3mpXGk3
- Retrato original: https://ibb.co/N2fffsmb

As capas e o retrato têm originais PNG e versões WebP otimizadas. A logo preserva o arquivo original e os resíduos de extração já identificados. Os direitos das imagens e da marca permanecem com seus titulares; este projeto não concede licença adicional sobre esses assets.

O endereço foi localizado pelo OpenStreetMap/Nominatim no edifício https://www.openstreetmap.org/way/271700703, número 593, Rua Presidente Vargas, Pirabeiraba, Joinville, CEP 89239-080. O resultado de verificação está em `docs/location-verification.json`. Leaflet carrega os tiles do OpenStreetMap sob demanda e preserva a atribuição. O mapa, WhatsApp, Instagram e Doctoralia dependem de serviços externos.

## Repositório

Código-fonte: https://github.com/mmoonm-pixel/dradenisi

```bash
git clone https://github.com/mmoonm-pixel/dradenisi.git
cd dradenisi
npm ci
npm start
```

A versão inicial é enviada para `main`. Faça alterações posteriores em branches e use pull requests para revisão. Este repositório não contém remotes, histórico ou metadados da hospedagem anterior do Sites. Não há integração de deploy com a Vercel.

## Exclusões

O `.gitignore` exclui `node_modules/`, `.env`, `.env.*`, chaves privadas, arquivos de credenciais, metadados do Sites, capturas e logs. O repositório contém o código, imagens, fontes, bibliotecas locais, testes, lockfile e instruções. `dist/` é gerado localmente por `npm run build` e não é versionado. Nenhuma credencial de hospedagem acompanha o código.
