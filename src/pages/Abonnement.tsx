import React from 'react';

interface AbonnementProps {
  onRetour: () => void;
}

export default function Abonnement({ onRetour }: AbonnementProps) {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #0d0820 0%, #1a1035 100%)',
      color: '#e8dff5',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 24px 60px',
      overflowY: 'auto',
    }}>

      {/* Retour */}
      <button
        onClick={onRetour}
        style={{
          alignSelf: 'flex-start', background: 'none', border: 'none',
          color: '#9b8cad', cursor: 'pointer', fontSize: 22, marginBottom: 28,
          padding: 0,
        }}
      >←</button>

      {/* Badge */}
      <span style={{
        background: 'rgba(201,169,110,0.15)',
        border: '1px solid #C9A96E',
        color: '#C9A96E',
        borderRadius: 20,
        padding: '4px 16px',
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase' as const,
        marginBottom: 20,
      }}>🔥 Offre de lancement</span>

      {/* Titre */}
      <h1 style={{ fontSize: 26, textAlign: 'center', marginBottom: 10, lineHeight: 1.3 }}>
        Tes mains contiennent<br />tous tes secrets
      </h1>
      <p style={{
        color: '#9b8cad', textAlign: 'center',
        maxWidth: 300, marginBottom: 32, lineHeight: 1.7, fontSize: 15,
      }}>
        Débloque la lecture complète de tes 7 lignes, 
        révèle ton profil énergétique et accède aux consultations mensuelles.
      </p>

      {/* Liste des avantages */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(201,169,110,0.2)',
        borderRadius: 16,
        padding: '8px 20px',
        maxWidth: 340,
        width: '100%',
        marginBottom: 28,
      }}>
        {[
          { emoji: '🌙', label: 'Ligne de vie complète + tournant révélé' },
          { emoji: '❤️', label: 'Ligne de cœur & vie amoureuse' },
          { emoji: '🧠', label: 'Ligne de tête & potentiel caché' },
          { emoji: '🖐️', label: 'Profil énergétique des 5 doigts' },
          { emoji: '✨', label: 'Ligne du destin & mission de vie' },
          { emoji: '📅', label: 'Nouvelle lecture chaque mois' },
        ].map((item, i, arr) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 0',
            borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
            <span style={{ fontSize: 14, color: '#c8b8d8', lineHeight: 1.4 }}>{item.label}</span>
            <span style={{ marginLeft: 'auto', color: '#C9A96E', fontSize: 16, flexShrink: 0 }}>✓</span>
          </div>
        ))}
      </div>

      {/* Prix */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 38, fontWeight: 700, color: '#e8dff5' }}>4,99€</span>
        <span style={{ color: '#9b8cad', fontSize: 15 }}> / mois</span>
        <p style={{ color: '#6a5f7a', fontSize: 12, marginTop: 4 }}>
          Sans engagement · Annulation en 1 clic
        </p>
      </div>

      {/* Bouton CTA */}
      <button
        onClick={() => alert('Paiement à intégrer (Stripe, etc.)')}
        style={{
          background: 'linear-gradient(135deg, #C9A96E, #e8c98a)',
          color: '#0d0820',
          border: 'none',
          borderRadius: 28,
          padding: '15px 0',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
          width: '100%',
          maxWidth: 340,
          boxShadow: '0 4px 24px rgba(201,169,110,0.4)',
          marginBottom: 24,
          fontFamily: 'Georgia, serif',
        }}
      >
        🔮 Débloquer mes secrets — 4,99€/mois
      </button>

      {/* Témoignage */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 20,
        maxWidth: 340,
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        <p style={{ color: '#b8aac8', fontSize: 14, fontStyle: 'italic', lineHeight: 1.7, marginBottom: 10 }}>
          "J'étais sceptique, mais la lecture de ma ligne de tête a décrit 
          exactement ma situation professionnelle. Complètement troublant."
        </p>
        <p style={{ color: '#C9A96E', fontSize: 13 }}>— Marie, 34 ans &nbsp;⭐⭐⭐⭐⭐</p>
      </div>

      <p style={{ color: '#6a5f7a', fontSize: 11, textAlign: 'center', maxWidth: 280 }}>
        🔒 Paiement sécurisé · Données confidentielles · Satisfait ou remboursé 7 jours
      </p>
    </div>
  );
}