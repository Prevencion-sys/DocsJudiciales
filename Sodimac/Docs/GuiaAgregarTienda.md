# Guía para Agregar Nuevas Tiendas

Esta guía detalla los pasos necesarios para agregar una nueva tienda al sistema de Documentos Sodimac (Contratos de Transacción e Informes de Aprehensión).

## 1. Modificar `index.html` (Contrato de Transacción)

Debes realizar cambios en dos lugares dentro del bloque de `JAVASCRIPT` (al final del archivo):

### A. Actualizar el Catálogo de Tiendas
Busca la constante `TIENDAS` (alrededor de la línea 787) y agrega la nueva tienda siguiendo el formato:

```javascript
const TIENDAS = {
  cali_sur:   { id: 'cali_sur',   num: '30', nombre: 'Homecenter Cali Sur',       nombreCorto: 'Cali Sur'       },
  cali_norte: { id: 'cali_norte', num: '31', nombre: 'Homecenter Cali Norte',      nombreCorto: 'Cali Norte'     },
  cali_mall:  { id: 'cali_mall',  num: '34', nombre: 'Homecenter Cali Mall Plaza', nombreCorto: 'Cali Mall Plaza'},
  // NUEVA TIENDA AQUÍ:
  nueva_id:   { id: 'nueva_id',   num: 'XX', nombre: 'Homecenter Nombre Tienda',   nombreCorto: 'Nombre Corto'   }
};
```

### B. Actualizar el Estado Inicial (Fallback)
Busca la función `loadLocalState()` y agrega la nueva tienda en los objetos `counters` y `apoderados`:

```javascript
return {
  pin: DEFAULT_PIN,
  counters: { 
    cali_sur: 1, 
    cali_norte: 1, 
    cali_mall: 1,
    nueva_id: 1 // Agregar aquí
  },
  apoderados: {
    cali_sur: [...],
    cali_norte: [],
    cali_mall: [],
    nueva_id: [] // Agregar aquí
  }
};
```

---

## 2. Modificar `aprehension.html` (Informe de Aprehensión)

Realiza cambios similares en el bloque de `JAVASCRIPT` de este archivo:

### A. Actualizar el Catálogo de Tiendas
Busca la constante `TIENDAS` (alrededor de la línea 1104). Ten en cuenta que aquí el objeto tiene más detalles (dirección, teléfono, etc.):

```javascript
const TIENDAS = {
  // ... tiendas existentes ...
  nueva_id: { 
    id: 'nueva_id', 
    num: 'XX', 
    nombre: 'Homecenter Nombre Tienda', 
    nombreCorto: 'Nombre Corto',
    direccion: 'Calle X # Y - Z', 
    barrio: 'Barrio', 
    localidad: 'Localidad',
    departamento: 'Departamento', 
    ciudad: 'Ciudad', 
    telefono: '3XXXXXXXXX' 
  }
};
```

### B. Actualizar el Estado Inicial
Busca la función `loadState()` (alrededor de la línea 1132) y agrega la nueva tienda al objeto `counters`:

```javascript
return { 
  pin: DEFAULT_PIN, 
  counters: { 
    cali_sur: 1, 
    cali_norte: 1, 
    cali_mall: 1,
    nueva_id: 1 // Agregar aquí
  } 
};
```

---

## 3. Configuración en Base de Datos (Supabase)

El sistema intenta sincronizar automáticamente con Supabase. Para que la nueva tienda funcione correctamente con la nube:

1. **Contadores**: Cuando selecciones la tienda por primera vez en la aplicación, el sistema intentará crear las llaves de configuración:
   - `contador_nueva_id` (para contratos)
   - `apreh_contador_nueva_id` (para aprehensiones)
   Si deseas que el contador empiece en un número específico, puedes ajustarlo desde el **Panel de Administración (⚙)** dentro de la app.

2. **Apoderados/Aprehensores**: 
   - Ve al Panel de Administración (⚙).
   - Selecciona la pestaña de la nueva tienda.
   - Agrega los apoderados (nombres y cédulas) que operarán en esa tienda.

---

## Recomendaciones Finales
- **ID Único**: El `id` (ej. `nueva_id`) debe ser único y sin espacios ni caracteres especiales.
- **Sincronización**: Al agregar una tienda, asegúrate de refrescar la página (`Ctrl + F5`) para que el navegador cargue la nueva configuración de JavaScript.
