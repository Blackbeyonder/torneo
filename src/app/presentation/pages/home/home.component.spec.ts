import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HomeComponent } from './home.component';
import { HomeService } from 'src/app/services/home.service';
import { RouterTestingModule } from '@angular/router/testing';
import { getTournaments } from 'src/app/utils/Utils';
import { Torneos } from 'src/app/models/torneos';

// Mock del servicio HomeService
class MockHomeService {
  getBanners() {
    return of(['image1.jpg', 'image2.jpg']); // Simula un retorno de imágenes
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHomeService: MockHomeService;
  let mockRouter: jasmine.SpyObj<Router>;  // Usar SpyObj para Router

  beforeEach(async () => {
    // Creamos un objeto spy para Router con el método navigate
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: HomeService, useClass: MockHomeService },
        { provide: Router, useValue: mockRouter }, // Usar el spy para Router
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockHomeService = TestBed.inject(HomeService);
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.myForm).toBeDefined();
    expect(component.myForm.controls['name'].valid).toBeFalse();
    expect(component.myForm.controls['email'].valid).toBeFalse();
  });

  it('debería obtener banners correctamente al llamar a getBanners', async () => {
    await component.getBanners();
    expect(component.images).toEqual(['image1.jpg', 'image2.jpg']);
  });

  it('debería manejar errores al obtener banners', async () => {
    spyOn(mockHomeService, 'getBanners').and.returnValue(throwError(() => new Error('Error al cargar imágenes')));
    await component.getBanners();
    expect(component.images).toEqual([]);
  });

  it('debería configurar torneos correctamente al llamar a setTournaments', async () => {
    // Definir un objeto mock que coincide con la estructura esperada
    const torneosMock: Torneos = {
      pelea: [{ idtorneoRts:0,idtorneopelea: 1, date:"10/11/23", img:"imagen.jpg",name:"nombre",participantes:"number1,number2",ubication:"por aqui" }],
      rts: [{ idtorneoRts:1,idtorneopelea: 0, date:"10/11/23", img:"imagen.jpg",name:"nombre",participantes:"number1,number2",ubication:"por aqui" }]
    };
  
    // Simular que setTournaments asigna el valor mockado a 'tournaments'
    spyOn(component, 'setTournaments').and.callFake(async () => {
      component.tournaments = torneosMock;
    });
  
    // Llamar al método que actualiza los torneos
    await component.setTournaments();
  
    // Asegurarse de que los torneos se asignaron correctamente
    expect(component.tournaments).toEqual(torneosMock);
  });

  it('debería navegar correctamente al detalle del torneo', () => {
    component.goToDetail('pelea', 1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['pelea/detalle', 1]);
  });

  it('debería tener configuraciones personalizadas para los sliders', () => {
    // Verifica que customOptions2 y responsive estén definidos
    expect(component.customOptions2.responsive?.[740]?.items).toBe(3);
  });
  
  
});
