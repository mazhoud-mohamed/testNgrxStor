/**
 * Un SignalStore se teste comme un service : on le fournit dans le TestBed, on l'injecte,
 * on appelle ses méthodes et on lit ses signaux. Aucun Store global, aucune action à mocker.
 */
import { TestBed } from '@angular/core/testing';
import { CounterSignalStore } from './counter.store';

describe('CounterSignalStore', () => {
  let store: InstanceType<typeof CounterSignalStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CounterSignalStore] });
    store = TestBed.inject(CounterSignalStore);
  });

  it('démarre à 0 avec un pas de 1', () => {
    expect(store.count()).toBe(0);
    expect(store.step()).toBe(1);
  });

  it('increment / decrement utilisent le pas', () => {
    store.setStep(5);
    store.increment();
    expect(store.count()).toBe(5);
    store.decrement();
    expect(store.count()).toBe(0);
  });

  it('les computed suivent le state', () => {
    store.increment();
    expect(store.double()).toBe(2);
    expect(store.isEven()).toBeFalse();
    store.increment();
    expect(store.isEven()).toBeTrue();
  });

  it('reset revient à l\'état initial', () => {
    store.setStep(10);
    store.increment();
    store.reset();
    expect(store.count()).toBe(0);
    expect(store.step()).toBe(1);
  });
});
