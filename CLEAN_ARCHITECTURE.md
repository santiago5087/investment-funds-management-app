# Arquitectura Limpia - Gestión de Fondos

Este documento describe la implementación de Clean Architecture (Arquitectura Limpia) en el módulo de gestión de fondos de inversión.

## 📁 Estructura de Carpetas

```
src/app/
├── base/                                    # Interfaces y clases base
│   └── use-case.ts                         # Interfaz base para casos de uso
│
├── domain/                                  # Capa de Dominio (Reglas de Negocio)
│   ├── models/                             # Modelos de dominio
│   ├── repositories/                       # Contratos de repositorios (abstractos)
│   │   ├── funds.repository.ts            # Contrato del repositorio de fondos
│   │   └── index.ts                       # Barrel export
│   └── usecases/                          # Casos de uso (lógica de negocio)
│       ├── get-funds/
│       │   └── get-funds.usecase.ts       # Caso de uso: Obtener fondos
│       ├── get-fund-by-id/
│       │   └── get-fund-by-id.usecase.ts  # Caso de uso: Obtener fondo por ID
│       └── index.ts                       # Barrel export
│
├── data/                                    # Capa de Datos (Implementaciones)
│   ├── data.providers.ts                   # Configuración de inyección de dependencias
│   └── repositories/                       # Implementaciones de repositorios
│       └── funds/
│           └── funds-implementation.repository.ts  # Implementación HTTP
│
├── core/                                    # Estado y servicios core
│   └── store/
│       └── states/
│           └── funds.state.ts              # Estado NGXS (usa casos de uso)
│
└── presentation/                            # Capa de Presentación (UI)
    └── components/                         # Componentes de Angular
```

## 🏗️ Capas de la Arquitectura

### 1. **Base Layer** (`base/`)
Contiene interfaces y clases base reutilizables.

**Archivo:** `use-case.ts`
```typescript
export interface UseCase<S, T> {
  execute(params: S): Observable<T>;
}
```

### 2. **Domain Layer** (`domain/`)
Contiene la lógica de negocio pura, independiente de frameworks.

#### Repositories (Contratos)
**Archivo:** `domain/repositories/funds.repository.ts`
```typescript
export abstract class FundsRepository {
  public abstract getFunds(): Observable<InvestmentFund[]>;
  public abstract getFundById(id: string): Observable<InvestmentFund>;
}
```

#### Use Cases (Casos de Uso)
**Archivo:** `domain/usecases/get-funds/get-funds.usecase.ts`
```typescript
export class GetFundsUseCase implements UseCase<void, InvestmentFund[]> {
  constructor(private readonly fundsRepository: FundsRepository) {}

  public execute(): Observable<InvestmentFund[]> {
    return this.fundsRepository.getFunds();
  }
}
```

### 3. **Data Layer** (`data/`)
Implementa los contratos definidos en el dominio.

#### Repository Implementation
**Archivo:** `data/repositories/funds/funds-implementation.repository.ts`
```typescript
@Injectable({ providedIn: 'root' })
export class FundsImplementationRepository extends FundsRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/funds`;

  public override getFunds(): Observable<InvestmentFund[]> {
    return this.http.get<InvestmentFund[]>(this.apiUrl).pipe(
      delay(1000) // UX: Delay para apreciar el spinner
    );
  }

  public override getFundById(id: string): Observable<InvestmentFund> {
    return this.http.get<InvestmentFund>(`${this.apiUrl}/${id}`).pipe(
      delay(1000)
    );
  }
}
```

#### Dependency Injection Configuration
**Archivo:** `data/data.providers.ts`
```typescript
import { FundsRepository } from '@domain/repositories';
import { GetFundsUseCase, GetFundByIdUseCase } from '@domain/usecases';
import { FundsImplementationRepository } from './repositories/funds/funds-implementation.repository';
// Inyección de dependencias del caso de uso
  private getFundsUseCase = inject(GetFundsUseCase
  // Configurar el repositorio
  { provide: FundsRepository, useClass: FundsImplementationRepository },
  
  // Configurar los casos de uso con sus dependencias
  {
    provide: GetFundsUseCase,
    useFactory: (fundsRepo: FundsRepository) => new GetFundsUseCase(fundsRepo),
    deps: [FundsRepository],
  },
  {
    provide: GetFundByIdUseCase,
    useFactory: (fundsRepo: FundsRepository) => new GetFundByIdUseCase(fundsRepo),
    deps: [FundsRepository],
  },
];
```

**Registro en app.config.ts:**
```typescript
import { DATA_PROVIDERS } from './data/data.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore([FundsState]),
    ...DATA_PROVIDERS, // Registrar todos los providers
  ],
};
```

### 4. **Core Layer** (`core/`)
Orquesta los casos de uso desde el estado de la aplicación.

**Archivo:** `core/store/states/funds.state.ts`
```typescript
@Injectable()
export class FundsState {
  private fundsRepository = inject(FundsImplementationRepository);
  private getFundsUseCase = new GetFundsUseCase(this.fundsRepository);

  @Action(LoadFunds)
  loadFunds(ctx: StateContext<FundsStateModel>) {
    ctx.patchState({ loading: true, error: null });
    return this.getFundsUseCase.execute().pipe(
      tap((funds) => ctx.dispatch(new LoadFundsSuccess(funds))),
      catchError((error) => {
        ctx.dispatch(new LoadFundsFailure(error.message));
        return of(null);
      })
    );
  }
}
```

### 5. **Presentation Layer** (`presentation/`)
Componentes de Angular que interactúan con el estado.

```typescript
export class FundsListComponent {
  funds$ = this.store.select(FundsState.funds);
  
  constructor(private store: Store) {
    this.store.dispatch(new LoadFunds());
  }
}
```

## 🔄 Flujo de Datos

```
┌─────────────────┐
│   Component     │  Presentation Layer
└────────┬────────┘
         │ Dispatch Action
         ▼
┌─────────────────┐
│   NGXS State    │  Core Layer
└────────┬────────┘
         │ Call Use Case
         ▼
┌─────────────────┐
│    Use Case     │  Domain Layer (Business Logic)
└────────┬────────┘
         │ Call Repository
         ▼
┌─────────────────┐
│  Repository     │  Data Layer (HTTP, API)
│ Implementation  │
└────────┬────────┘
         │ HTTP Request
         ▼
┌─────────────────┐
│   Backend API   │
└─────────────────┘
```

## ✅ Beneficios de esta Arquitectura

1. **Separación de Responsabilidades**: Cada capa tiene un propósito específico
2. **Testabilidad**: Los casos de uso son fáciles de testear unitariamente
3. **Independencia de Framework**: La lógica de negocio no depende de Angular
4. **Mantenibilidad**: Cambios en una capa no afectan a las demás
5. **Escalabilidad**: Fácil agregar nuevos casos de uso o repositorios
6. **Reutilización**: Los casos de uso pueden ser reutilizados en diferentes contextos

## 💉 Patrón de Inyección de Dependencias

### ¿Por qué usar `data.providers.ts`?

En lugar de instanciar manualmente los casos de uso con `new GetFundsUseCase(repository)`, usamos el sistema de inyección de dependencias de Angular para:

1. **Gestión Automática**: Angular maneja el ciclo de vida de las instancias
2. **Testing Simplificado**: Fácil reemplazar implementaciones con mocks en tests
3. **Configuración Centralizada**: Todos los providers en un solo lugar
4. **Consistencia**: Patrón estándar usado en otros proyectos del monorepo

### Ejemplo de Configuración

```typescript
// ❌ ANTES: Instanciación manual (acoplamiento)
export class FundsState {
  private fundsRepository = inject(FundsImplementationRepository);
  private getFundsUseCase = new GetFundsUseCase(this.fundsRepository);
}

// ✅ DESPUÉS: Inyección de dependencias (desacoplamiento)
export class FundsState {
  private getFundsUseCase = inject(GetFundsUseCase);
}
```

### Ventajas en Testing

```typescript
// Testing simplificado con inyección de dependencias
TestBed.configureTestingModule({
  providers: [
    FundsState,
    {
      provide: GetFundsUseCase,
      useValue: { execute: () => of(mockFunds) } // Mock fácil
    }
  ]
});
```

## 🎯 Path Aliases

Configurados en `tsconfig.json`:

```json
{
  "paths": {
    "@base/*": ["src/app/base/*"],
    "@data/*": ["src/app/data/*"],
    "@core/*": ["src/app/core/*"],
    "@domain/*": ["src/app/domain/*"],
    "@presentation/*": ["src/app/presentation/*"],
    "@environments/*": ["src/environments/*"]
  }
}
```

## 📝 Cómo Agregar un Nuevo Caso de Uso

1. **Crear el caso de uso en domain/usecases/**:
```typescript
// domain/usecases/subscribe-to-fund/subscribe-to-fund.usecase.ts
export class SubscribeToFundUseCase implements UseCase<SubscriptionParams, Subscription> {
  constructor(private readonly fundsRepository: FundsRepository) {}

  public execute(params: SubscriptionParams): Observable<Subscription> {
    return this.fundsRepository.subscribe(params);
  }
}
```

2. **Agregar el método al contrato del repositorio**:
```typescript
// domain/repositories/funds.repository.ts
export abstract class FundsRepository {
  public abstract subscribe(params: SubscriptionParams): Observable<Subscription>;
}
```

3. **Implementar en el repositorio**:
```typescript
// data/repositories/funds/funds-implementation.repository.ts
public override subscribe(params: SubscriptionParams): Observable<Subscription> {
  return this.http.post<Subscription>(`${this.apiUrl}/subscribe`, params);
}
```

4. **Registrar el caso de uso en data.providers.ts**:
```typescript
// data/data.providers.ts
export const DATA_PROVIDERS = [
  { provide: FundsRepository, useClass: FundsImplementationRepository },
  {
    provide: GetFundsUseCase,
    useFactory: (fundsRepo: FundsRepository) => new GetFundsUseCase(fundsRepo),
    deps: [FundsRepository],
  },
  // ✨ Agregar el nuevo caso de uso
  {
    provide: SubscribeToFundUseCase,
    useFactory: (fundsRepo: FundsRepository) => new SubscribeToFundUseCase(fundsRepo),
    deps: [FundsRepository],
  },
];
```

5. **Inyectar y usar en el estado**:
```typescript
// core/store/states/funds.state.ts
export class FundsState {
  private subscribeToFundUseCase = inject(SubscribeToFundUseCase);

  @Action(SubscribeToFund)
  subscribe(ctx: StateContext<FundsStateModel>, action: SubscribeToFund) {
    return this.subscribeToFundUseCase.execute(action.params);
  }
}
```

## 🔍 Testing

### Testing de Casos de Uso
```typescript
describe('GetFundsUseCase', () => {
  it('should return funds from repository', (done) => {
    const mockRepository = {
      getFunds: () => of([mockFund1, mockFund2])
    } as FundsRepository;

    const useCase = new GetFundsUseCase(mockRepository);
    
    useCase.execute().subscribe(funds => {
      expect(funds.length).toBe(2);
      done();
    });
  });
});
```

### Testing de Repositorios
```typescript
describe('FundsImplementationRepository', () => {
  let repository: FundsImplementationRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FundsImplementationRepository]
    });
    
    repository = TestBed.inject(FundsImplementationRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch funds from API', () => {
    repository.getFunds().subscribe(funds => {
      expect(funds.length).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/funds`);
    expect(req.request.method).toBe('GET');
    req.flush([mockFund1, mockFund2]);
  });
});
```

## 📚 Referencias

- **Clean Architecture**: Robert C. Martin (Uncle Bob)
- **Domain-Driven Design**: Eric Evans
- **SOLID Principles**: Principios de diseño de software

---

**Nota**: Esta arquitectura sigue los patrones establecidos en el proyecto `PIC_Portal_shell_MF` para mantener consistencia en todo el monorepo de Redeban.
