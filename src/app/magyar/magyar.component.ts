import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_PICTURES } from './picture-list';

type Language = 'hu' | 'en' | 'de';

@Component({
  selector: 'app-magyar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './magyar.component.html',
  styleUrl: './magyar.component.scss'
})
export class MagyarComponent implements OnInit, OnDestroy {

  pictures : string [] = GALLERY_PICTURES;
  index : number = 0;
  selectedPicture: string | null = null;
  currentLanguage: Language = 'hu';
  text = {
    hu: {
      title: 'Árnyas Apartman',
      contacts: 'Kapcsolatok',
      gallery: 'Galéria',
      galleryHeading: 'Galéria',
      addressTitle: 'Címünk:',
      contactTitle: 'Kapcsolat',
      backButton: 'Magyar oldal'
    },
    en: {
      title: 'Shady Apartment',
      contacts: 'Contacts',
      gallery: 'Gallery',
      galleryHeading: 'Gallery',
      addressTitle: 'Our address:',
      contactTitle: 'Contact',
      backButton: 'Hungarian side'
    },
    de: {
      title: 'Schatten Apartment',
      contacts: 'Kontakte',
      gallery: 'Galerie',
      galleryHeading: 'Galerie',
      addressTitle: 'Unsere Adresse:',
      contactTitle: 'Kontakt',
      backButton: 'Ungarische Seite'
    },
  };
  private intervalId?: number;

  constructor(private zone: NgZone) {}

  ngOnInit(){
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      this.zone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          this.intervalId = window.setInterval(() => {
            this.zone.run(() => {
              this.index = (this.index + 1) % this.pictures.length;
            });
          }, 4000);
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.intervalId != null) {
      window.clearInterval(this.intervalId);
    }
  }

  selectPicture(picture: string) {
    this.selectedPicture = picture;
  }

  closePreview() {
    this.selectedPicture = null;
  }

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
  }
}
