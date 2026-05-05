import { useState, useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

// ── VRAIES OPTIONS DICEBEAR AVATAAARS ────────────────────────────
const SKIN_COLORS = ['fdbcb4', 'f8ad9d', 'f6b7a1', 'eaa79c', 'ca6b3d', 'a05028'];
const HAIR_COLORS = ['2c1810', '8B4513', 'D2691E', 'DAA520', 'F4D03F', 'C0C0C0', 'FF4500', '1a1a2e'];

const HAIR_FEMALE = ['longHair01', 'longHair02', 'longHair03', 'longHair04', 'longHair05'];
const HAIR_MALE = ['shortHair01', 'shortHair02', 'shortHair03', 'shortHair04'];
const EYES_OPTIONS = ['closed' as const, 'cry' as const, 'default' as const, 'eyeRoll' as const, 'happy' as const, 'hearts' as const, 'side' as const, 'squint' as const, 'surprised' as const, 'winkWacky' as const, 'wink' as const];
const EYEBROWS_OPTIONS = ['angry' as const, 'angryNatural' as const, 'defaultNatural' as const, 'flatNatural' as const, 'frownNatural' as const, 'raisedExcitedNatural' as const, 'sadConcernedNatural' as const];
const MOUTH_OPTIONS = ['concerned' as const, 'disbelief' as const, 'eating' as const, 'grimace' as const, 'sad' as const, 'screamOpen' as const, 'serious' as const, 'smile' as const, 'tongue' as const, 'twinkle' as const];
const ACCESSORIES = ['', 'kurt' as const, 'prescription01' as const, 'prescription02' as const, 'round' as const, 'sunglasses' as const, 'wayfarers' as const];
const FACIAL_HAIR = ['', 'beardLight' as const, 'beardMedium' as const, 'moustacheFancy' as const];
const CLOTHES = ['blazer01', 'blazer02', 'blazer03', 'sweater01', 'sweater02', 'hoodie01', 'shirt01', 'shirt02'];
const CLOTHES_COLORS = ['3C4F5C', '65C9FF', '5199E4', '25557C', '929598', 'A7FFC4', 'FFDEB5', 'FF5C5C', '8B3A8B'];

type Gender = 'sorciere' | 'sorcier';
type Step = 'choix' | 'personnalisation';
type Onglet = 'style' | 'dressing' | 'accessoires';

interface AvatarConfig {
  gender: Gender;
  skinColor: string;
  hairColor: string;
  hairStyle: string;
  eyes: string;
  eyebrows: string;
  mouth: string;
  accessories: string;
  facialHair: string;
  clothes: string;
  clothesColor: string;
}

// ── APERÇU AVATAR ────────────────────────────────────────────────
function AvatarPreview({ config, size = 180 }: { config: AvatarConfig; size?: number }) {
  const svg = useMemo(() => {
    try {
      return createAvatar(avataaars, {
        size,
        seed: Math.random().toString(),
        skinColor: [config.skinColor],
        hairColor: [config.hairColor],
        top: [config.hairStyle] as any,
        eyes: [config.eyes] as any,
        eyebrows: [config.eyebrows] as any,
        mouth: [config.mouth] as any,
        accessories: config.accessories ? [config.accessories] : [] as any,
        facialHair: config.facialHair ? [config.facialHair] : [] as any,
        clothesColor: [config.clothesColor],
        clothes: [config.clothes],
        backgroundColor: ['transparent'],
      }).toString();
    } catch (e) {
      console.error('Avatar generation error:', e);
      return '<svg></svg>';
    }
  }, [config, size]);

  return <div style={{ width: size, height: size }} dangerouslySetInnerHTML={{ __html: svg }} />;
}

// ── MINIATURE VISUELLE ────────────────────────────────────────────
function AvatarThumb({
  base,
  overrideKey,
  overrideVal,
  size = 60,
  selected,
  onClick,
}: {
  base: AvatarConfig;
  overrideKey: keyof AvatarConfig;
  overrideVal: string;
  size?: number;
  selected: boolean;
  onClick: () => void;
}) {
  const config = { ...base, [overrideKey]: overrideVal };
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        border: selected ? '2px solid #C9A96E' : '2px solid transparent',
        background: selected ? '#2d1f40' : '#1a1030',
        transform: selected ? 'scale(1.1)' : 'scale(1)',
        transition: 'all .2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AvatarPreview config={config} size={size - 8} />
    </div>
  );
}

// ── SÉLECTEUR COULEUR ────────────────────────────────────────────
function ColorPicker({
  label,
  values,
  selected,
  onChange,
}: {
  label: string;
  values: string[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#9b8cad',
          marginBottom: 8,
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {values.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: `#${v}`,
              border: selected === v ? '3px solid #C9A96E' : '2px solid transparent',
              cursor: 'pointer',
              outline: 'none',
              transform: selected === v ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform .15s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── SÉLECTEUR VISUEL ─────────────────────────────────────────────
function VisualPicker({
  label,
  base,
  optionKey,
  values,
  selected,
  onChange,
}: {
  label: string;
  base: AvatarConfig;
  optionKey: keyof AvatarConfig;
  values: string[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 1,
          color: '#9b8cad',
          marginBottom: 10,
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {values.map((v) => (
          <AvatarThumb
            key={v}
            base={base}
            overrideKey={optionKey}
            overrideVal={v}
            selected={selected === v}
            onClick={() => onChange(v)}
          />
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE 1 — CHOIX DU GENRE
// ══════════════════════════════════════════════════════════════════
function PageChoixGenre({ onChoix }: { onChoix: (g: Gender) => void }) {
  const [selected, setSelected] = useState<Gender | null>(null);

  const configF: AvatarConfig = {
    gender: 'sorciere',
    skinColor: 'fdbcb4',
    hairColor: '2c1810',
    hairStyle: 'longHair03',
    eyes: 'default',
    eyebrows: 'defaultNatural',
    mouth: 'smile',
    accessories: 'sunglasses',
    facialHair: '',
    clothes: 'blazer01',
    clothesColor: '8B3A8B',
  };

  const configM: AvatarConfig = {
    gender: 'sorcier',
    skinColor: 'f8ad9d',
    hairColor: '1a1a2e',
    hairStyle: 'shortHair02',
    eyes: 'happy',
    eyebrows: 'angry',
    mouth: 'serious',
    accessories: '',
    facialHair: 'beardLight',
    clothes: 'blazer02',
    clothesColor: '262E33',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0d0820 0%, #1a1035 50%, #0d0820 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Georgia, serif',
      }}
    >
      <p
        style={{
          color: '#C9A96E',
          fontSize: 13,
          letterSpacing: 3,
          textTransform: 'uppercase',
          marginBottom: 12,
          opacity: 0.8,
        }}
      >
        ✦ Les Secrets des Mains ✦
      </p>
      <h1
        style={{
          color: '#e8dff5',
          fontSize: 'clamp(22px, 5vw, 32px)',
          textAlign: 'center',
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        Quel enchanteur sommeille en toi ?
      </h1>
      <p
        style={{
          color: '#9b8cad',
          fontSize: 14,
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        Choisis ton identité mystique pour commencer
      </p>

      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        {[
          {
            gender: 'sorciere' as Gender,
            label: 'Sorcière',
            config: configF,
            emoji: '🌙',
          },
          {
            gender: 'sorcier' as Gender,
            label: 'Sorcier',
            config: configM,
            emoji: '⚡',
          },
        ].map(({ gender, label, config, emoji }) => (
          <div
            key={gender}
            onClick={() => setSelected(gender)}
            style={{
              width: 160,
              borderRadius: 20,
              padding: '20px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all .25s',
              background: selected === gender ? '#2d1f40' : '#1a1030',
              border:
                selected === gender
                  ? '2px solid #C9A96E'
                  : '2px solid #3a2d50',
              transform:
                selected === gender
                  ? 'translateY(-6px) scale(1.03)'
                  : 'none',
              boxShadow:
                selected === gender
                  ? '0 12px 32px rgba(201,169,110,0.25)'
                  : '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <AvatarPreview config={config} size={110} />
            </div>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: 20,
                background: selected === gender ? '#C9A96E' : '#2d1f40',
                color: selected === gender ? '#0d0820' : '#C9A96E',
                fontSize: 13,
                fontWeight: 700,
                transition: 'all .25s',
              }}
            >
              {emoji} {label}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => selected && onChoix(selected)}
        style={{
          padding: '14px 40px',
          borderRadius: 50,
          fontSize: 16,
          fontWeight: 700,
          cursor: selected ? 'pointer' : 'not-allowed',
          background: selected
            ? 'linear-gradient(135deg, #C9A96E, #e8c98a)'
            : '#2d1f40',
          color: selected ? '#0d0820' : '#5a4a6a',
          border: 'none',
          transition: 'all .3s',
          letterSpacing: 0.5,
          boxShadow: selected
            ? '0 8px 24px rgba(201,169,110,0.4)'
            : 'none',
        }}
      >
        {selected ? '✨ Éveille ton enchanteur' : 'Choisis ton identité'}
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE 2 — PERSONNALISATION
// ══════════════════════════════════════════════════════════════════
function PagePersonnalisation({
  gender,
  onRetour,
}: {
  gender: Gender;
  onRetour: () => void;
}) {
  const [onglet, setOnglet] = useState<Onglet>('style');
  const [config, setConfig] = useState<AvatarConfig>({
    gender,
    skinColor: 'fdbcb4',
    hairColor: '2c1810',
    hairStyle: gender === 'sorciere' ? 'longHair03' : 'shortHair02',
    eyes: 'default',
    eyebrows: 'defaultNatural',
    mouth: 'smile',
    accessories: '',
    facialHair: gender === 'sorcier' ? 'beardLight' : '',
    clothes: 'blazer01',
    clothesColor: '3C4F5C',
  });

  const set = <K extends keyof AvatarConfig>(
    key: K,
    val: AvatarConfig[K]
  ) => setConfig((prev) => ({ ...prev, [key]: val }));

  const hairStyles = gender === 'sorciere' ? HAIR_FEMALE : HAIR_MALE;
  const badge = gender === 'sorciere' ? '🌙 Sorcière' : '⚡ Sorcier';

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(160deg, #0d0820 0%, #1a1035 100%)',
        fontFamily: 'Georgia, serif',
        color: '#e8dff5',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #2d1f40',
          background: 'rgba(13,8,32,0.9)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={onRetour}
          style={{
            background: 'none',
            border: 'none',
            color: '#9b8cad',
            cursor: 'pointer',
            fontSize: 22,
          }}
        >
          ←
        </button>
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: 11,
              color: '#C9A96E',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Personnalisation
          </p>
          <span
            style={{
              display: 'inline-block',
              padding: '3px 12px',
              borderRadius: 20,
              background: '#2d1f40',
              color: '#C9A96E',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {badge}
          </span>
        </div>
        <button
          onClick={onRetour}
          style={{
            background: 'linear-gradient(135deg, #C9A96E, #e8c98a)',
            color: '#0d0820',
            border: 'none',
            borderRadius: 20,
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ✓ Valider
        </button>
      </div>

      {/* APERÇU */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 16px' }}>
        <div
          style={{
            background:
              'radial-gradient(circle, #2d1f40 0%, #1a1030 70%)',
            borderRadius: '50%',
            padding: 8,
            border: '2px solid #3a2d50',
          }}
        >
          <AvatarPreview config={config} size={150} />
        </div>
      </div>

      {/* ONGLETS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 24,
          padding: '0 20px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { id: 'style' as Onglet, label: '✨ Style' },
          { id: 'dressing' as Onglet, label: '👗 Dressing' },
          { id: 'accessoires' as Onglet, label: '💎 Accessoires' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setOnglet(id)}
            style={{
              padding: '9px 18px',
              borderRadius: 20,
              fontSize: 13,
              cursor: 'pointer',
              border:
                onglet === id
                  ? '2px solid #C9A96E'
                  : '1px solid #3a2d50',
              background: onglet === id ? '#2d1f40' : 'transparent',
              color: onglet === id ? '#C9A96E' : '#9b8cad',
              fontWeight: onglet === id ? 700 : 400,
              transition: 'all .2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CONTENU */}
      <div
        style={{
          padding: '0 20px 60px',
          maxWidth: 500,
          margin: '0 auto',
        }}
      >
        {onglet === 'style' && (
          <>
            <ColorPicker
              label="Teint de peau"
              values={SKIN_COLORS}
              selected={config.skinColor}
              onChange={(v) => set('skinColor', v)}
            />
            <ColorPicker
              label="Couleur des cheveux"
              values={HAIR_COLORS}
              selected={config.hairColor}
              onChange={(v) => set('hairColor', v)}
            />
            <VisualPicker
              label="Coupe de cheveux"
              base={config}
              optionKey="hairStyle"
              values={hairStyles}
              selected={config.hairStyle}
              onChange={(v) => set('hairStyle', v)}
            />
            <VisualPicker
              label="Yeux"
              base={config}
              optionKey="eyes"
              values={EYES_OPTIONS}
              selected={config.eyes}
              onChange={(v) => set('eyes', v)}
            />
            <VisualPicker
              label="Sourcils"
              base={config}
              optionKey="eyebrows"
              values={EYEBROWS_OPTIONS}
              selected={config.eyebrows}
              onChange={(v) => set('eyebrows', v)}
            />
            <VisualPicker
              label="Bouche"
              base={config}
              optionKey="mouth"
              values={MOUTH_OPTIONS}
              selected={config.mouth}
              onChange={(v) => set('mouth', v)}
            />
            {gender === 'sorcier' && (
              <VisualPicker
                label="Barbe"
                base={config}
                optionKey="facialHair"
                values={FACIAL_HAIR}
                selected={config.facialHair}
                onChange={(v) => set('facialHair', v)}
              />
            )}
          </>
        )}

        {onglet === 'dressing' && (
          <>
            <VisualPicker
              label="Tenue"
              base={config}
              optionKey="clothes"
              values={CLOTHES}
              selected={config.clothes}
              onChange={(v) => set('clothes', v)}
            />
            <ColorPicker
              label="Couleur de la tenue"
              values={CLOTHES_COLORS}
              selected={config.clothesColor}
              onChange={(v) => set('clothesColor', v)}
            />
          </>
        )}

        {onglet === 'accessoires' && (
          <>
            <VisualPicker
              label="Accessoires (lunettes)"
              base={config}
              optionKey="accessories"
              values={ACCESSORIES}
              selected={config.accessories}
              onChange={(v) => set('accessories', v)}
            />
          </>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════════════
export default function Avatar() {
  const [step, setStep] = useState<Step>('choix');
  const [gender, setGender] = useState<Gender>('sorciere');

  if (step === 'choix') {
    return (
      <PageChoixGenre
        onChoix={(g) => {
          setGender(g);
          setStep('personnalisation');
        }}
      />
    );
  }

  return (
    <PagePersonnalisation
      gender={gender}
      onRetour={() => setStep('choix')}
    />
  );
}