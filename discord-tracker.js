// ============================================
// DISCORD TRACKER - Portfolio Ornel ZINSOU-PLY
// ============================================

// Configuration du webhook Discord
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1440611889598955643/3agl-NYwvU8IG1mVJENTco78DRYLjCqLamdWremrIHugzty2zvJqjArjtaBEA8HkvgcW';

// ============================================
// NOTIFICATION DE VISITE
// ============================================
async function notifyVisit() {
  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR');
    const timeStr = now.toLocaleTimeString('fr-FR');
    
    // Détecter le type d'appareil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const device = isMobile ? '📱 Mobile' : '💻 Desktop';
    
    // Détecter le navigateur
    let browser = '🌐 Navigateur inconnu';
    if (navigator.userAgent.includes('Chrome')) browser = '🔵 Chrome';
    else if (navigator.userAgent.includes('Firefox')) browser = '🦊 Firefox';
    else if (navigator.userAgent.includes('Safari')) browser = '🧭 Safari';
    else if (navigator.userAgent.includes('Edge')) browser = '🔷 Edge';
    
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '👤 Nouveau visiteur sur ton portfolio !',
          color: 0x667eea,
          fields: [
            { name: '📅 Date', value: dateStr, inline: true },
            { name: '🕐 Heure', value: timeStr, inline: true },
            { name: '📄 Page visitée', value: window.location.pathname, inline: false },
            { name: '🔗 Provenance', value: document.referrer || 'Accès direct', inline: false },
            { name: '📱 Appareil', value: device, inline: true },
            { name: '🌐 Navigateur', value: browser, inline: true }
          ],
          footer: { text: 'Portfolio Ornel ZINSOU-PLY' },
          timestamp: new Date().toISOString()
        }]
      })
    });
  } catch (error) {
    console.log('Notification de visite non envoyée');
  }
}

// ============================================
// NOTIFICATION CLIC SUR PROJET
// ============================================
async function notifyProjectClick(projectName) {
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '🎯 Projet consulté !',
          description: `Quelqu'un a ouvert : **${projectName}**`,
          color: 0x764ba2,
          timestamp: new Date().toISOString()
        }]
      })
    });
  } catch (error) {
    console.log('Erreur notification projet');
  }
}

// ============================================
// MAPPING DES PROJETS
// ============================================
const modalTitles = {
  'experience1': 'Stage Geophom',
  'project1': 'InfraLogiciel',
  'project2': 'Cloud Computing',
  'project3': 'Backup Gitea',
  'project4': 'Camouflage de m4lware',
  'project5': 'Examothèque',
  'project6': 'PFE Observabilité',
  'project7': 'Projet Hacker webcam'
};

// ============================================
// INTERCEPTER L'OUVERTURE DES MODALS
// ============================================
function initDiscordTracking() {
  // Attendre que le DOM soit chargé
  if (typeof openModal === 'undefined') {
    console.log('Fonction openModal non encore définie, on attend...');
    setTimeout(initDiscordTracking, 100);
    return;
  }

  // Sauvegarder la fonction originale
  const originalOpenModal = window.openModal;
  
  // Remplacer par notre version avec tracking
  window.openModal = function(modalId) {
    // Appeler la fonction originale
    originalOpenModal(modalId);
    
    // Envoyer notification Discord si c'est un projet connu
    if (modalTitles[modalId]) {
      notifyProjectClick(modalTitles[modalId]);
    }
  };
  
  console.log('Discord tracking initialisé ✅');
}

// ============================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================
window.addEventListener('DOMContentLoaded', function() {
  // Envoyer la notification de visite
  notifyVisit();
  
  // Initialiser le tracking des projets
  initDiscordTracking();
});
