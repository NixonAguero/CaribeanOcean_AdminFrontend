---
name: commits-standards
description: Reference and rules for conventional commits used in the Caribbean Ocean Resort & Spa project. Trigger when the user asks about commit standards or conventions.
---

# Conventional Commits — Caribbean Ocean Resort & Spa
## Based on qoomon's Conventional Commits Standard

---

## Estructura del mensaje

```
git commit -m "<type>(<optional scope>): <description>" \
           -m "<optional body>" \
           -m "<optional footer>"
```

### Reglas generales
- El `type` y `scope` van siempre en **minúsculas**
- La `description` va en **minúsculas** también, sin punto al final
- El `body` explica el **qué** y el **por qué**, no el cómo
- El `footer` se usa para breaking changes o referencias a issues

---

## Tipos de commit

| Tipo | Cuándo usarlo | Versión que incrementa |
|---|---|---|
| `feat` | Nueva funcionalidad visible al usuario (UI o API) | MINOR `1.x.0` |
| `fix` | Corrección de un bug visible al usuario | PATCH `1.0.x` |
| `refactor` | Restructuración de código sin cambiar comportamiento | — |
| `perf` | Refactor que mejora rendimiento | PATCH `1.0.x` |
| `style` | Formato, espacios, punto y coma — sin lógica | — |
| `test` | Agregar o corregir tests | — |
| `docs` | Solo documentación | — |
| `build` | Sistema de build, dependencias, versiones | — |
| `ops` | Infraestructura, deployment, backup | — |
| `chore` | Tareas de mantenimiento, `.gitignore`, inicial commit | — |

> Un `!` después del tipo/scope indica **BREAKING CHANGE** → incrementa MAJOR `x.0.0`

---

## Scopes del proyecto Caribbean Ocean

Los scopes delimitan qué parte del sistema fue modificada:

| Scope | Qué cubre |
|---|---|
| `navbar` | Barra de navegación |
| `hero` | Sección hero / slider |
| `about` | Sección About Us |
| `offers` | Página de ofertas y carousel |
| `fees` | Página de tarifas / habitaciones |
| `reservation` | Flujo de reserva (búsqueda, resultados, formulario) |
| `facilities` | Página de facilidades |
| `how-to` | Página Cómo llegar / mapa |
| `contact` | Página de contacto |
| `footer` | Footer global |
| `tokens` | Variables CSS / design tokens |
| `components` | Componentes reutilizables (botones, cards, badges) |
| `responsive` | Media queries / layout responsivo |
| `db` | Base de datos / migraciones |
| `api` | Endpoints del backend |
| `auth` | Login / autenticación del admin |
| `admin` | Módulo administrativo en general |
| `ads` | Área de publicidad |
| `animations` | Animaciones y transiciones |
| `deps` | Dependencias del proyecto |
| `ci` | Pipelines de CI/CD |
| `release` | Versiones y changelogs |

---

## Ejemplos por situación

### Nuevas funcionalidades (`feat`)

```bash
# Agregar página de facilidades
git commit -m "feat(facilities): add facilities page with alternating image layout"

# Agregar carousel de ofertas
git commit -m "feat(offers): add offer cards carousel with prev/next navigation"

# Agregar flujo completo de reserva
git commit -m "feat(reservation): add 3-step booking flow with availability check"

# Agregar modal de confirmación
git commit -m "feat(reservation): add success modal with auto-generated reservation code"

# Agregar página de no disponibilidad con alternativas
git commit -m "feat(reservation): add unavailability page with nearby date suggestions"

# Agregar entidad OFFER al modelo
git commit -m "feat(db): add offer entity with discount_percentage and season relation"

# Login del módulo admin
git commit -m "feat(auth): add admin login page with session handling"

# Agregar entidad SEASON
git commit -m "feat(db): add season entity with start_date and end_date fields"
```

---

### Corrección de bugs (`fix`)

```bash
# Navbar no cambia de color al hacer scroll
git commit -m "fix(navbar): scrolled class not applying when page loads mid-scroll"

# Formulario de reserva permite fechas pasadas
git commit -m "fix(reservation): allow past dates to be selected in check-in input"

# Precio no actualiza al cambiar tipo de habitación
git commit -m "fix(reservation): total amount not recalculating on room type change"

# Imágenes de habitaciones no cargan en mobile
git commit -m "fix(fees): room images not loading on mobile due to wrong asset path"

# Footer se rompe en tablet
git commit -m "fix(footer): grid layout overflows at 768px breakpoint"

# Ad area aparece en mobile cuando no debería
git commit -m "fix(ads): ad area visible on mobile, should be hidden below 768px"
```

---

### Refactors (`refactor`)

```bash
# Extraer botones a componente reutilizable
git commit -m "refactor(components): extract btn classes to reusable components.css"

# Reorganizar CSS tokens
git commit -m "refactor(tokens): split color and typography tokens into separate sections"

# Simplificar lógica del formulario
git commit -m "refactor(reservation): simplify form validation logic using constraint API"

# Renombrar atributos de la base de datos a snake_case real
git commit -m "refactor(db): rename all entity attributes to real-world snake_case convention"
```

---

### Estilos / Diseño (`style`)

```bash
# Ajustar espaciado en sección About
git commit -m "style(about): adjust padding and gap between text and gallery columns"

# Corregir color del label de sección
git commit -m "style(tokens): update section-label letter-spacing from 2px to 3px"

# Alinear botones del hero
git commit -m "style(hero): align cta buttons to left on mobile breakpoint"

# Ajuste de tipografía en cards de ofertas
git commit -m "style(offers): increase offer-card title from 18px to 20px"
```

---

### Tests (`test`)

```bash
# Agregar tests al formulario de reserva
git commit -m "test(reservation): add form validation unit tests for date range check"

# Tests de disponibilidad de habitaciones
git commit -m "test(api): add availability endpoint integration tests"

# Tests del módulo de autenticación
git commit -m "test(auth): add admin login tests for invalid credentials"
```

---

### Documentación (`docs`)

```bash
# Agregar README al proyecto
git commit -m "docs: add project README with setup and run instructions"

# Documentar design tokens
git commit -m "docs(tokens): add inline comments to all CSS custom properties"

# Agregar blueprint del frontend
git commit -m "docs: add frontend blueprint for one-shot generation guide"

# Actualizar diseño en el CHANGELOG
git commit -m "docs(release): create v1.0.0 change log entry"
```

---

### Build / Dependencias (`build`)

```bash
# Configuración inicial del proyecto
git commit -m "build: initial project setup with folder structure and base files"

# Agregar Google Fonts al head de todas las páginas
git commit -m "build: add Google Fonts preconnect and import to all HTML pages"

# Agregar dependencia de un plugin
git commit -m "build(deps): add flatpickr v4.6.13 for date picker component"

# Configurar versión del proyecto
git commit -m "build(release): bump version to 1.2.0"
```

---

### Ops / Infraestructura (`ops`)

```bash
# Configurar archivo .gitignore
git commit -m "chore: add .gitignore for node_modules, dist and .env files"

# Configurar deployment
git commit -m "ops: add deploy script for production environment"

# Variables de entorno
git commit -m "ops: add .env.example with required environment variables"
```

---

### Breaking Changes (`!`)

Se agrega `!` después del tipo o scope cuando el cambio rompe compatibilidad hacia atrás:

```bash
# Cambio de estructura en la API de reservas
git commit -m "feat(api)!: change reservation endpoint response format to include season_id"

# Renombrar entidad en base de datos (breaking)
git commit -m "refactor(db)!: rename RESERVACION table to RESERVATION breaking existing queries"
```

Con footer explícito:
```bash
git commit -m "feat(api)!: change room availability response structure" \
           -m "Rooms now return an array of available dates instead of a boolean flag. All clients consuming this endpoint must update their integration." \
           -m "BREAKING CHANGE: availability field replaced by available_dates array"
```

---

## Commits especiales de Git

### Merge
```bash
# Git lo genera automáticamente — no modificar el formato
Merge branch 'feature/reservation-flow' into develop
```

### Revert
```bash
# Git lo genera automáticamente — se puede complementar
git revert <hash>
# Mensaje generado: Revert "feat(reservation): add 3-step booking flow"
```

### Initial commit
```bash
git commit -m "chore: initial commit"
```

---

## Flujo de commits para el proyecto

### Al trabajar en una feature nueva
```bash
# 1. Commit de setup inicial si aplica
git commit -m "chore(reservation): create reservation page files and base structure"

# 2. Commits de desarrollo
git commit -m "feat(reservation): add search form with date and room type fields"
git commit -m "feat(reservation): add results list with available rooms"
git commit -m "feat(reservation): add guest form with name, email and credit card fields"
git commit -m "feat(reservation): add success modal with auto-generated code"

# 3. Fix durante el desarrollo
git commit -m "fix(reservation): date validation not blocking same-day check-in"

# 4. Style al finalizar
git commit -m "style(reservation): adjust booking widget card padding to 36px"

# 5. Docs si aplica
git commit -m "docs(reservation): document booking flow steps in blueprint"
```

### Al trabajar en el admin
```bash
git commit -m "feat(admin): add room management table with active/inactive toggle"
git commit -m "feat(admin): add reservation list with view and delete actions"
git commit -m "feat(auth): add login form with username and password validation"
git commit -m "fix(admin): reservation delete confirmation dialog not showing"
```

### Al trabajar en base de datos
```bash
git commit -m "feat(db): create initial schema with room, reservation and admin_user tables"
git commit -m "feat(db): add offer entity with room_type_id and season_id foreign keys"
git commit -m "feat(db): add season entity with start_date and end_date"
git commit -m "refactor(db): rename columns to real-world snake_case convention"
```

---

## Referencia rápida — Cheatsheet

```
feat:      nueva funcionalidad
fix:       corrección de bug
refactor:  restructurar código (sin cambiar comportamiento)
perf:      mejorar rendimiento
style:     formato / espacios (sin lógica)
test:      agregar o arreglar tests
docs:      solo documentación
build:     build, dependencias, versiones
ops:       infraestructura, deploy
chore:     mantenimiento, .gitignore, initial commit

tipo(scope): descripción en minúsculas, sin punto al final
tipo(scope)!: lo mismo pero es BREAKING CHANGE
```

---

## Lo que NUNCA se debe hacer

```bash
# ❌ Sin tipo
git commit -m "arregle el bug del formulario"

# ❌ Demasiado vago
git commit -m "fix: fixed stuff"

# ❌ Múltiples cambios en un solo commit
git commit -m "feat: add reservation page, fix navbar, update footer colors"

# ❌ Descripción en mayúscula
git commit -m "feat(hero): Add hero slider with 3 images"

# ❌ Con punto al final
git commit -m "feat(hero): add hero slider with 3 images."

# ❌ En pasado
git commit -m "feat(hero): added hero slider"
# ✅ Correcto → en presente/imperativo
git commit -m "feat(hero): add hero slider with 3 images"
```
