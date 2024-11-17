
import { TestBed } from '@angular/core/testing';
import { ScreenSizeService } from './screen-size.service';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial screen size', () => {
    const initialSize = { width: window.innerWidth, height: window.innerHeight };
    service.resized$.subscribe(size => {
      expect(size).toEqual(initialSize);
    });
  });

  it('should update screen size on resize', () => {
    const newSize = { width: 800, height: 600 };
    window.innerWidth = newSize.width;
    window.innerHeight = newSize.height;
    window.dispatchEvent(new Event('resize'));

    service.resized$.subscribe(size => {
      expect(size).toEqual(newSize);
    });
  });

  it('should have a mobileMediumSize property', () => {
    expect(service.mobileMediumSize).toBe(750);
  });
});