import { ChangeDetectorRef, DebugElement, InjectionToken, Type, AbstractType } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { SpyObject } from '../mock';
import { Token } from '../token';
import { DomSpectator } from '../base/dom-spectator';

/**
 * @publicApi
 */
export class Spectator<C> extends DomSpectator<C> {
  constructor(public fixture: ComponentFixture<C>, public debugElement: DebugElement, protected instance: C, public element: HTMLElement) {
    super(fixture, debugElement, instance, element);
  }

  public static fromFixture<C>(fixture: ComponentFixture<C>): Spectator<C> {
    return new Spectator(fixture, fixture.debugElement, fixture.componentInstance, fixture.nativeElement);
  }

  public get component(): C {
    return this.instance;
  }

  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(token) as SpyObject<T>;
    }

    return super.inject(token);
  }

  public detectComponentChanges(): void {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }
}
