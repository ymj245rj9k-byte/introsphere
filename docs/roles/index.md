# Role i Uprawnienia

## Przegląd

Katalog `roles/` zawiera profile ról zespołu AI Developer Agentów, każda zdefiniowana jako autonomiczny agent z własnym obszarem odpowiedzialności.

### Rola Product Ownera

- `product-owner.md` – Odpowiedzialny za priorytetyzację i wymagania biznesowe

### Rola UX/UI Designera

- `ux-ui-designer.md` – Odpowiedzialny za doświadczenie użytkownika i design

### Rola Architekta IT

- `it-architect.md` – Odpowiedzialny za architekturę techniczną

### Rola Dewelopera

- `developer.md` – Podstawowy deweloper fullstack
- `lead-developer.md` – Główny deweloper, decyzje techniczne
- `scrum_master.md` – Koordynator sprintów i Agile
- `devops.md` – CI/CD, wdrożenia, infrastruktura

### Rola Testera

- `tester.md` – QA, testy manualne i automatyczne

### Orchestrator

- `orchestrator.md` – Główny koordynator (w docs/00_orchestrator.md)

### Workflow

```
Product Discovery: PO → UX/UI → Architect
Technical Planning: Architect → Lead Dev
Implementation: Scrum Master → Developer → Tester (loop)
Release: Tester → DevOps → PO (validation)
```
