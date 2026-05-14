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
import type { HouseRule } from '@/types/property';
import { addRule, updateRule, deleteRule, reorderRules } from './actions';

const ICONS: { id: string; label: string; paths: string }[] = [
  { id: 'wifi',      label: 'Wi-Fi',          paths: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>' },
  { id: 'tv',        label: 'TV',             paths: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>' },
  { id: 'smoke',     label: 'Não fumar',      paths: '<line x1="2" y1="2" x2="22" y2="22"/><path d="M16.47 16.47A5 5 0 0 1 7 12v0"/><path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-6.29 2.59"/>' },
  { id: 'noise',     label: 'Silêncio',       paths: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>' },
  { id: 'fire',      label: 'Fogo/Churrasco', paths: '<path d="M12 2c0 0-4 5-4 9a4 4 0 0 0 8 0c0-4-4-9-4-9z"/><path d="M12 12c0 0-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-2-4-2-4z"/>' },
  { id: 'lock',      label: 'Segurança',      paths: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' },
  { id: 'key',       label: 'Chave',          paths: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>' },
  { id: 'trash',     label: 'Lixo',           paths: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>' },
  { id: 'clock',     label: 'Horário',        paths: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
  { id: 'water',     label: 'Água',           paths: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>' },
  { id: 'pet',       label: 'Animais',        paths: '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>' },
  { id: 'person',    label: 'Pessoas',        paths: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  { id: 'ac',        label: 'Ar-condic.',     paths: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>' },
  { id: 'kitchen',   label: 'Cozinha',        paths: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>' },
  { id: 'pool',      label: 'Piscina',        paths: '<path d="M2 12h20"/><path d="M2 16c2.5 2 5 2 7.5 0s5-2 7.5 0"/><path d="M2 20c2.5 2 5 2 7.5 0s5-2 7.5 0"/><path d="M12 2v10"/>' },
  { id: 'warning',   label: 'Aviso',          paths: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>' },
  { id: 'info',      label: 'Info',           paths: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/>' },
  { id: 'photo',     label: 'Fotos',          paths: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>' },
  { id: 'heart',     label: 'Cuidado',        paths: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' },
  { id: 'bed',       label: 'Quarto/Cama',    paths: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>' },
  { id: 'moon',      label: 'Silêncio noturno', paths: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' },
  { id: 'sun',       label: 'Área externa',   paths: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' },
  { id: 'car',       label: 'Estacionamento', paths: '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
  { id: 'music',     label: 'Som/Música',     paths: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' },
  { id: 'baby',      label: 'Crianças',       paths: '<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>' },
  { id: 'door',      label: 'Entrada/Saída',  paths: '<path d="M13 4h3a2 2 0 0 1 2 2v14"/><path d="M2 20h3"/><path d="M13 20h9"/><path d="M10 12v.01"/><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"/>' },
  { id: 'plug',      label: 'Elétrica',       paths: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8H6a2 2 0 0 0-2 2v2a7 7 0 0 0 14 0v-2a2 2 0 0 0-2-2Z"/>' },
  { id: 'utensils',  label: 'Refeições',      paths: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>' },
  { id: 'wine',      label: 'Bebidas',        paths: '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H7c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"/>' },
  { id: 'star',      label: 'Destaque',       paths: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
  { id: 'bell',      label: 'Campainha',      paths: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>' },
];

const CATEGORY_LABELS: Record<string, string> = {
  critical: 'Crítico',
  warning:  'Aviso',
  info:     'Info',
};

interface Props {
  rules: HouseRule[];
  propertyId: string;
  slug: string;
}

function RuleIcon({ paths }: { paths?: string | null }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths ?? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/>' }}
    />
  );
}

function IconPicker({ selected, onSelect }: { selected: string; onSelect: (paths: string) => void }) {
  const [open, setOpen] = useState(false);
  const selectedIcon = ICONS.find(i => i.paths === selected);

  return (
    <div className="admin-icon-picker-wrap">
      <button
        type="button"
        className={`admin-icon-picker-trigger${open ? ' admin-icon-picker-trigger--open' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className="admin-icon-picker-trigger__preview">
          {selectedIcon ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              dangerouslySetInnerHTML={{ __html: selectedIcon.paths }}
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
            </svg>
          )}
        </span>
        <span className="admin-icon-picker-trigger__label">
          {selectedIcon ? selectedIcon.label : 'Selecionar ícone'}
        </span>
        <svg className="admin-icon-picker-trigger__chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <div className={`admin-icon-picker-panel${open ? ' admin-icon-picker-panel--open' : ''}`}>
        <div className="admin-icon-picker-panel__inner">
          <div className="admin-icon-picker">
            {ICONS.map(icon => (
              <button
                key={icon.id}
                type="button"
                title={icon.label}
                className={`admin-icon-btn${selected === icon.paths ? ' admin-icon-btn--selected' : ''}`}
                onClick={() => { onSelect(icon.paths); setOpen(false); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: icon.paths }}
                />
                <span className="admin-icon-btn__label">{icon.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleForm({
  action, hiddenInputs, defaultTitle = '', defaultDesc = '',
  defaultCategory = 'info', defaultIconSvg = '', submitLabel,
  onCancel,
}: {
  action: (f: FormData) => Promise<void>;
  hiddenInputs: React.ReactNode;
  defaultTitle?: string;
  defaultDesc?: string;
  defaultCategory?: string;
  defaultIconSvg?: string;
  submitLabel: string;
  onCancel?: () => void;
}) {
  const [iconSvg, setIconSvg] = useState(defaultIconSvg);

  return (
    <form action={action} className="admin-rule-form">
      {hiddenInputs}
      <input type="hidden" name="icon_svg" value={iconSvg} />

      <div className="admin-field">
        <label className="admin-field__label">Título</label>
        <input className="admin-field__input" name="title" defaultValue={defaultTitle} required placeholder="Ex: Não fumar nas áreas internas" />
      </div>

      <div className="admin-field">
        <label className="admin-field__label">Descrição <span style={{ fontWeight: 400, opacity: 0.6 }}>(opcional)</span></label>
        <input className="admin-field__input" name="description" defaultValue={defaultDesc} placeholder="Detalhes adicionais" />
      </div>

      <div className="admin-field">
        <label className="admin-field__label">Categoria</label>
        <select className="admin-field__input" name="category" defaultValue={defaultCategory}>
          <option value="critical">⚠️ Crítico</option>
          <option value="warning">🔶 Aviso</option>
          <option value="info">ℹ️ Info</option>
        </select>
      </div>

      <div className="admin-field">
        <label className="admin-field__label">Ícone</label>
        <IconPicker selected={iconSvg} onSelect={setIconSvg} />
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

function SortableRuleItem({
  rule, slug, editingId, setEditingId, setDeleteConfirm,
}: {
  rule: HouseRule;
  slug: string;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  setDeleteConfirm: (v: { id: string; title: string } | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: rule.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {editingId === rule.id ? (
        <RuleForm
          action={updateRule}
          hiddenInputs={<>
            <input type="hidden" name="rule_id" value={rule.id} />
            <input type="hidden" name="slug" value={slug} />
          </>}
          defaultTitle={rule.title}
          defaultDesc={rule.description ?? ''}
          defaultCategory={rule.category}
          defaultIconSvg={rule.icon_svg ?? ''}
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
          <span className="admin-rule-icon">
            <RuleIcon paths={rule.icon_svg} />
          </span>
          <div className="admin-rule-info">
            <span className="admin-rule-title">{rule.title}</span>
            <span className={`admin-rule-category admin-rule-category--${rule.category}`}>
              {CATEGORY_LABELS[rule.category]}
            </span>
          </div>
          <div className="admin-rule-actions">
            <button
              type="button"
              className="admin-rule-btn"
              title="Editar"
              onClick={() => setEditingId(rule.id)}
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
              onClick={() => setDeleteConfirm({
                id: rule.id,
                title: rule.title.replace(/<[^>]+>/g, ''),
              })}
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

export function HouseRulesManager({ rules, propertyId, slug }: Props) {
  const [open, setOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);
  const [localRules, setLocalRules] = useState(rules);

  useEffect(() => { setLocalRules(rules); }, [rules]);

  const nextOrder = localRules.length ? Math.max(...localRules.map(r => r.sort_order)) + 1 : 1;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localRules.findIndex(r => r.id === active.id);
    const newIndex = localRules.findIndex(r => r.id === over.id);
    const reordered = arrayMove(localRules, oldIndex, newIndex);

    setLocalRules(reordered);
    await reorderRules(
      reordered.map((r, i) => ({ id: r.id, sort_order: i + 1 })),
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
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <div className="admin-card__title">Regras da casa</div>
          <div className="admin-card__subtitle">Exibidas na aba principal do guia</div>
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
      <div className="admin-card__body" style={{ padding: localRules.length || showAdd ? undefined : '14px 22px' }}>

        {/* Formulário de adição — aparece no topo */}
        {showAdd && (
          <div className={localRules.length > 0 ? 'admin-rule-add-divider' : ''}>
            <RuleForm
              action={addRule}
              hiddenInputs={<>
                <input type="hidden" name="property_id" value={propertyId} />
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="sort_order" value={nextOrder} />
              </>}
              submitLabel="Adicionar regra"
              onCancel={() => setShowAdd(false)}
            />
          </div>
        )}

        {/* Lista de regras — drag-and-drop */}
        {localRules.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={localRules.map(r => r.id)} strategy={verticalListSortingStrategy}>
              <div className="admin-rules-list">
                {localRules.map(rule => (
                  <SortableRuleItem
                    key={rule.id}
                    rule={rule}
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

        {localRules.length === 0 && !showAdd && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-400)', margin: 0 }}>
            Nenhuma regra cadastrada. Clique em &quot;Adicionar&quot; para criar a primeira.
          </p>
        )}

      </div>
      </div>
      </div>

      {/* Modal de confirmação de exclusão */}
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
            <div className="admin-delete-modal__title">Excluir regra?</div>
            <div className="admin-delete-modal__rule">{deleteConfirm.title}</div>
            <p className="admin-delete-modal__desc">Essa ação não pode ser desfeita.</p>
            <form action={deleteRule} className="admin-delete-modal__actions">
              <input type="hidden" name="rule_id" value={deleteConfirm.id} />
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
