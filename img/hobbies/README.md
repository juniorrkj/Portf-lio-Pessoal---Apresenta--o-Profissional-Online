# Pasta de Fotos do Carrossel

Esta pasta contém as imagens que aparecem no carrossel da seção "Sobre Mim".

## Como adicionar suas fotos:

1. **Tire ou selecione 4 fotos que representem você:**
   - Foto 1: Seus interesses gerais (música, hobbies, etc.)
   - Foto 2: Na academia ou fazendo atividade física
   - Foto 3: Estudando ou em ambiente de estudos
   - Foto 4: Com animais que você ama

2. **Substitua os arquivos placeholder:**
   - `placeholder1.svg` → sua foto (exemplo: `interesses.jpg`)
   - `placeholder2.svg` → sua foto (exemplo: `academia.jpg`)
   - `placeholder3.svg` → sua foto (exemplo: `estudos.jpg`)
   - `placeholder4.svg` → sua foto (exemplo: `animais.jpg`)

3. **Atualize o `index.html`:**
   - Procure por `img/hobbies/placeholder1.svg`
   - Troque para `img/hobbies/interesses.jpg` (ou o nome que você escolher)
   - Faça o mesmo para as outras 3 fotos

## Dicas:

- **Formato**: Use JPG ou PNG
- **Tamanho**: Ideal 800x600px ou proporção 4:3
- **Otimize**: Comprima as imagens antes (use TinyPNG.com)
- **Peso**: Mantenha cada foto com menos de 500KB

## Exemplo de edição no index.html:

```html
<div class="carousel-slide active">
    <img src="img/hobbies/minha-foto-musica.jpg" alt="Curtindo música">
    <p class="carousel-caption">Música é Vida</p>
</div>
```

Personalize as legendas também para refletir sua personalidade! 🎨
