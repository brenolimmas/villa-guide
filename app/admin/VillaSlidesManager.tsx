'use client';

import { useState, useEffect } from 'react';
import {
  DndContext, closestCenter, PointerSensor, TouchSensor,
  useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, useSortable,
  verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { VillaSlide } from '@/types/property';
import { addSlide, updateSlide, deleteSlide, reorderSlides, saveVillaStory } from './actions';

interface Props {
  slides: VillaSlide[];
  propertyId: string;
  slug: string;
  storyEyebrow: string;
  storyText: string;
}

function SlideForm({
  action, hiddenInputs, defaultImageUrl = '', defaultTitle = '',
  defaultDesc = '', submitLabel, onCancel,
}: {
  action: (f: FormData) => Promise<void>;
  hiddenInputs: React.ReactNode;
  defaultImageUrl?: string;
  defaultTitle?: string;
  defaultDesc?: string;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  return (
    <form action={action} className="admin-rule-form">
      {hiddenInputs}

      <div className="admin-field">
        <label className="admin-field__label">URL da imagem</label>
        <input
          className="admin-field__input"
          name="image_url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          required
          placeholder="https://…"
        />
        {imageUrl && (
          <img src={imageUrl} alt="preview" className="admin-img-preview" />
        )}
      </div>

      <div className="admin-field">
        <label className="admin-field__label">Título da foto <span style={{ fontWeight: 400, opacity: 0.6 }}>(opcional)</span></label>
        <input className="admin-field__input" name="caption_title" defaultValue={defaultTitle} placeholder="Ex: Fim de tarde" />
      </div>

      <div className="admin-field">
        <label className="admin-field__label">Descrição <span style={{ fontWeight: 400, opacity: 0.6 }}>(opcional)</span></label>
        <input className="admin-field__input" name="caption_desc" defaultValue={defaultDesc} placeholder="Ex: O pôr do sol aqui é um espetáculo." />
      </div>

      <div className="admin-rule-form__actions">
        <button type="submit" className="admin-btn-save">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
          </svg>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="admin-btn-cancel" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}

function SortableSlideItem({
  slide, slug, editingId, setEditingId, setDeleteConfirm,
}: {
  slide: VillaSlide;
  slug: string;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  setDeleteConfirm: (v: { id: string; title: string } | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: slide.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {editingId === slide.id ? (
        <SlideForm
          action={updateSlide}
          hiddenInputs={<>
            <input type="hidden" name="slide_id" value={slide.id} />
            <input type="hidden" name="slug" value={slug} />
          </>}
          defaultImageUrl={slide.image_url}
          defaultTitle={slide.caption_title ?? ''}
          defaultDesc={slide.caption_desc ?? ''}
          submitLabel="Salvar alterações"
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <div className="admin-rule-item">
          <button
            className="admin-rule-drag-handle"
            type="button"
            aria-label="Arrastar para reordenar"
            {...attributes}
            {...listeners}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="5" r="1" fill="currentColor" stroke="none"/>
              <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none"/>
              <circle cx="9" cy="19" r="1" fill="currentColor" stroke="none"/>
              <circle cx="15" cy="5" r="1" fill="currentColor" stroke="none"/>
              <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none"/>
              <circle cx="15" cy="19" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </button>

          {slide.image_url && (
            <span className="admin-rule-icon" style={{ borderRadius: 8, overflow: 'hidden', padding: 0 }}>
              <img
                src={slide.image_url}
                alt={slide.caption_title ?? ''}
                style={{ width: 40, height: 40, objectFit: 'cover', display: 'block' }}
              />
            </span>
          )}

          <div className="admin-rule-info">
            <span className="admin-rule-title">{slide.caption_title || 'Sem título'}</span>
            {slide.caption_desc && (
              <span className="admin-rule-category admin-rule-category--info" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {slide.caption_desc}
              </span>
            )}
          </div>

          <div className="admin-rule-actions">
            <button
              type="button"
              className="admin-rule-btn"
              title="Editar"
              onClick={() => setEditingId(slide.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button
              type="button"
              className="admin-rule-btn admin-rule-btn--delete"
              title="Excluir"
              onClick={() => setDeleteConfirm({ id: slide.id, title: slide.caption_title || 'este slide' })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function VillaSlidesManager({ slides, propertyId, slug, storyEyebrow, storyText }: Props) {
  const [open, setOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);
  const [localSlides, setLocalSlides] = useState(slides);

  useEffect(() => { setLocalSlides(slides); }, [slides]);

  const nextOrder = localSlides.length ? Math.max(...localSlides.map(s => s.sort_order)) + 1 : 1;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localSlides.findIndex(s => s.id === active.id);
    const newIndex = localSlides.findIndex(s => s.id === over.id);
    const reordered = arrayMove(localSlides, oldIndex, newIndex);

    setLocalSlides(reordered);
    await reorderSlides(
      reordered.map((s, i) => ({ id: s.id, sort_order: i + 1 })),
      slug,
    );
  }

  return (
    <div className={`admin-card${open ? ' admin-card--open' : ''}`}>
      <div
        className="admin-card__header admin-card__header--toggle"
        onClick={() => setOpen(v => !v)}
      >
        <span className="admin-card__header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <div className="admin-card__title">Conheça a Vila</div>
          <div className="admin-card__subtitle">Slides do carrossel e texto editorial</div>
        </div>
        <div onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="admin-btn-add"
            onClick={() => { setShowAdd(v => !v); setEditingId(null); setOpen(true); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Adicionar
          </button>
        </div>
        <span className="admin-card__chevron" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </div>

      <div className="admin-collapsible">
      <div className="admin-collapsible__inner">
      <div className="admin-card__body">

        {showAdd && (
          <div className={localSlides.length > 0 ? 'admin-rule-add-divider' : ''}>
            <SlideForm
              action={addSlide}
              hiddenInputs={<>
                <input type="hidden" name="property_id" value={propertyId} />
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="sort_order" value={nextOrder} />
              </>}
              submitLabel="Adicionar slide"
              onCancel={() => setShowAdd(false)}
            />
          </div>
        )}

        {localSlides.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={localSlides.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <div className="admin-rules-list">
                {localSlides.map(slide => (
                  <SortableSlideItem
                    key={slide.id}
                    slide={slide}
                    slug={slug}
                    editingId={editingId}
                    setEditingId={(id) => { setEditingId(id); setShowAdd(false); }}
                    setDeleteConfirm={setDeleteConfirm}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {localSlides.length === 0 && !showAdd && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-400)', margin: '0 0 var(--s-4)' }}>
            Nenhum slide cadastrado. Clique em &quot;Adicionar&quot; para criar o primeiro.
          </p>
        )}

        {/* Texto editorial */}
        <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: 'var(--s-5)', marginTop: 'var(--s-2)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 'var(--s-4)' }}>
            Texto editorial
          </p>
          <form action={saveVillaStory}>
            <input type="hidden" name="property_id" value={propertyId} />
            <input type="hidden" name="slug" value={slug} />

            <div className="admin-field">
              <label className="admin-field__label">Frase de destaque (eyebrow)</label>
              <input
                className="admin-field__input"
                name="villa_story_eyebrow"
                defaultValue={storyEyebrow}
                placeholder="Ex: Um espaço pensado para momentos especiais."
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Texto da história</label>
              <textarea
                className="admin-field__input"
                name="villa_story_text"
                defaultValue={storyText}
                rows={4}
                placeholder="Conte a história da villa…"
                style={{ resize: 'vertical', minHeight: 100 }}
              />
            </div>

            <div className="admin-footer">
              <span className="admin-hint">Exibido abaixo do carrossel de fotos</span>
              <button type="submit" className="admin-btn-save">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                Salvar texto
              </button>
            </div>
          </form>
        </div>

      </div>
      </div>
      </div>

      {deleteConfirm && (
        <div className="admin-delete-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-delete-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-delete-modal__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </div>
            <div className="admin-delete-modal__title">Excluir slide?</div>
            <div className="admin-delete-modal__rule">{deleteConfirm.title}</div>
            <p className="admin-delete-modal__desc">Essa ação não pode ser desfeita.</p>
            <form action={deleteSlide} className="admin-delete-modal__actions">
              <input type="hidden" name="slide_id" value={deleteConfirm.id} />
              <input type="hidden" name="slug" value={slug} />
              <button type="button" className="admin-delete-modal__cancel" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </button>
              <button type="submit" className="admin-btn-danger">
                Sim, excluir
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
