'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import type { DialoguePhoto } from '@/data/dialogue-photos';

export default function DialogueGallery({
  title,
  date,
  photos,
  onClose,
}: {
  title: string;
  date: string;
  photos: DialoguePhoto[];
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const active = photos[selected];

  useEffect(() => {
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (photos.length > 1 && event.key === 'ArrowRight') {
        setSelected(i => (i + 1) % photos.length);
      }
      if (photos.length > 1 && event.key === 'ArrowLeft') {
        setSelected(i => (i - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = priorOverflow;
    };
  }, [onClose, photos.length]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#081713]/80 p-2 backdrop-blur-[3px] sm:p-5"
      onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogue-gallery-heading"
        className="flex max-h-[96dvh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-[#dbe5df] px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.09em] text-[#3e745b]">
              <Images size={15} /> Galería fotográfica
            </span>
            <h2 id="dialogue-gallery-heading" className="mt-1 text-base font-bold leading-snug text-ink sm:text-lg">{title}</h2>
            <p className="mt-1 text-xs text-muted">{date} · {photos.length} {photos.length === 1 ? 'fotografía' : 'fotografías'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar galería"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-pine"
          ><X size={20}/></button>
        </header>

        {active ? (
          <div className="min-h-0 flex-1 overflow-y-auto bg-[#f6f8f7]">
            <div className="relative flex h-[34vh] min-h-[220px] items-center justify-center bg-[#152820] sm:h-[51vh]">
              <Image
                src={active.src}
                alt={active.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 1000px"
                className="object-contain"
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setSelected(i => (i - 1 + photos.length) % photos.length)}
                    className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1d4332] shadow-md hover:bg-white sm:left-4"
                    aria-label="Fotografía anterior"
                  ><ChevronLeft size={22}/></button>
                  <button
                    type="button"
                    onClick={() => setSelected(i => (i + 1) % photos.length)}
                    className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1d4332] shadow-md hover:bg-white sm:right-4"
                    aria-label="Fotografía siguiente"
                  ><ChevronRight size={22}/></button>
                </>
              )}
            </div>
            <div className="border-b border-[#e1e9e4] bg-white px-4 py-3 sm:px-6">
              <p className="break-all text-xs font-semibold text-[#294938] sm:text-sm" aria-live="polite">{active.name}</p>
              <p className="mt-1 text-[11px] text-muted">Imagen {selected + 1} de {photos.length} · Archivo original de la carpeta Fotos_ED</p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 sm:p-5 md:grid-cols-4">
              {photos.map((photo, i) => (
                <button
                  type="button"
                  key={photo.driveId}
                  className={'overflow-hidden rounded-md border bg-white text-left transition focus-visible:outline-2 focus-visible:outline-pine ' +
                    (selected === i ? 'border-[#347158] ring-2 ring-[#b1d2c2]' : 'border-[#dee7e1] hover:border-[#86ad97]')}
                  aria-label={'Ver fotografía ' + (i + 1) + ': ' + photo.name}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  <div className="relative aspect-[4/3] bg-[#e7eeea]">
                    <Image
                      src={photo.src}
                      alt={photo.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 45vw, (max-width: 900px) 28vw, 210px"
                      className="object-cover"
                    />
                  </div>
                  <span className="block break-all px-2.5 py-2 text-[10px] font-medium leading-relaxed text-[#42574e]">{photo.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[250px] flex-col items-center justify-center px-5 py-12 text-center">
            <Images size={37} className="text-[#9cac9f]"/>
            <h3 className="mt-4 text-base font-semibold text-[#385447]">Aún no hay fotografías registradas</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              La carpeta proporcionada no incluye imágenes identificadas para este espacio de diálogo.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
