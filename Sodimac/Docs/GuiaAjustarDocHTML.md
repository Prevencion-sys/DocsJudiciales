# Guía para Ajustar el Diseño del Documento PDF/Impreso

Esta guía explica cómo ajustar los márgenes, el tamaño de fuente y la disposición de los documentos generados (Contratos e Informes de Aprehensión).

## 1. Ubicación del Código de Diseño
Ambos archivos (`index.html` y `aprehension.html`) generan el documento final mediante una función llamada `imprimirDoc()`. Dentro de esta función, se define un bloque de estilos `<style>` encargado de la apariencia en papel.

### En `index.html` (Contratos)
Busca la función `imprimirDoc` (alrededor de la línea 2780):
```javascript
function imprimirDoc() {
  const docHTML = `...
    <style>
      body { 
        font-family: 'Times New Roman', serif; 
        padding: 20px 40px; /* Margen en pantalla */
        max-width: 800px; 
        margin: 0 auto; 
        font-size: 13.5px; 
      }
      @media print { 
        body { padding: 0; margin: 0; } 
        @page { margin: 1.5cm; size: letter; } /* Margen real de impresión */
      }
    </style>
  ...`;
}
```

### En `aprehension.html` (Informes)
Busca la función `imprimirDoc` (alrededor de la línea 3715):
```javascript
function imprimirDoc() {
  const docHTML = `...
    <style>
      body { 
        font-family: 'Times New Roman', serif; 
        padding: 20mm; 
        max-width: 800px; 
        margin: 0 auto; 
        font-size: 11.5px; 
      }
      @media print { 
        body { padding: 0; margin: 0; } 
        @page { margin: 1.5cm; size: letter; } 
      }
    </style>
  ...`;
}
```

## 2. Ajustes Comunes

### A. Modificar Márgenes de Impresión
Para cambiar qué tan cerca del borde del papel llega el texto, ajusta el valor en `@page`:
- **Más margen:** `margin: 2cm;` o `margin: 1in;`
- **Menos margen:** `margin: 1cm;` o `margin: 0.5cm;`

> [!IMPORTANT]
> Se recomienda mantener `body { padding: 0; margin: 0; }` dentro de `@media print` para que solo el valor de `@page` controle el margen real, evitando duplicidad de espacios.

### B. Cambiar el Tamaño de Fuente
Si el texto es muy pequeño o se desborda a una segunda página innecesariamente, ajusta `font-size`:
- **Contratos:** Actualmente en `13.5px`.
- **Informes:** Actualmente en `11.5px` (debido a que es un documento con más tablas).

### C. Tamaño del Papel
El sistema está configurado por defecto para tamaño Carta (`letter`). Si necesitas cambiarlo a A4 (estándar europeo):
- Cambia `size: letter;` por `size: A4;` en la regla `@page`.

## 3. Notas sobre la Vista Previa
El diseño que ves en el paso de "Revisión" antes de imprimir se controla mediante clases CSS que empiezan con `.odoc` (en Contratos) o estilos similares en el Informe. Si deseas que la vista previa se vea distinta a la impresión, debes editar los estilos dentro de la función `buildDocHTML()`.
