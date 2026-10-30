# Nolio — Plateforme Internationale de Promotion par les Créateurs

Nolio est une marketplace SaaS qui connecte les fondateurs de produits, startups et annonceurs avec des créateurs de contenu qualifiés (YouTube, TikTok, Instagram, Facebook, X) pour concevoir et diffuser des campagnes de promotion basées sur la performance (CPM/vues éligibles, rémunération fixe ou modèle hybride).

### User Review & Critical Decisions

> [!IMPORTANT]
> Les trois arbitrages clés ont été validés pour garantir une mise en œuvre rapide, robuste et testable :
> - **Authentification & Session** : Intégration Supabase Auth complète (email/password) combinée avec un sélecteur rapide de comptes de test (Annonceur, Créateur, Administrateur) pour valider immédiatement les parcours utilisateur.
> - **Données de démarrage** : Injection d'un jeu de données initial cohérent et vérifié (entreprises SaaS réelles, créateurs qualifiés avec audiences multi-réseaux, campagnes actives à fort CPM, livrables et statistiques) pour rendre la marketplace immédiatement interactive.
> - **Sécurité Administrateur** : Création d'une table dédiée `admin_users` vérifiée côté serveur via des routes sécurisées (Server Actions / Route Handlers) avec Service Role, garantissant qu'aucune valeur client (`account_type`) ne peut élever de privilèges.

---

### 1. Overview & Core Concept

- **Ce que fait Nolio** :
  - **Pour l'Annonceur** : Enregistrer ses produits tech/SaaS, configurer des campagnes de visibilité avec budget plafonné, sélectionner des créateurs vérifiés, suivre les livrables (liens, captures vidéo), auditer les clics et les vues, et débloquer les paiements.
  - **Pour le Créateur** : Découvrir des campagnes ciblées selon ses niches (Tech, IA, Productivité, Gaming, Lifestyle) et plateformes, postuler avec un pitch et ses statistiques, obtenir un lien de tracking unique, soumettre sa publication et encaisser ses gains au CPM ou montant fixe.
  - **Pour l'Administrateur** : Piloter la plateforme, modérer les campagnes et livrables, auditer les flux financiers internes (réservations, commissions Nolio, portefeuilles), valider les demandes de retrait et surveiller la conformité.
- **Utilisateurs cibles** : Fondateurs de SaaS, agences marketing, indépendants du web, et créateurs de contenu vidéo & digital.
- **Valeur différentielle** : Interface éditoriale premium inspirée de Contra.com, transparence sur les métriques (clics trackés côté serveur, vues déclarées vs vérifiées), et séparation stricte des espaces de travail.

---

### 2. User Experience & Visual Design

#### Visual Identity & Direction Artistique (Contra-inspired)
- **Palette chromatique rigoureuse (60-30-10)** :
  - **Canvas neutre (60%)** : Blanc pur (`#FFFFFF`) et fond doux ultra-léger (`#F6F6F8`) créant une aération moderne.
  - **Surfaces structurelles (30%)** : Cartes plates avec bordures nettes 1px hairline (`border-neutral-200/80`), texte sombre profond (`#222126`), texte secondaire (`#6B6975`).
  - **Accentuation (10%)** : Violet identitaire Nolio (`#7257E8`) avec nuance douce (`#A99AEF`) pour les boutons d'action principale, états actifs et indicateurs de sélection.
- **Typographie & Règle Anti-Slop** :
  - Titres et navigation : `Plus Jakarta Sans` pour un rendu géométrique, net et contemporain.
  - Corps de texte et formulaires : `DM Sans` pour une lisibilité dense et fluide.
  - Métriques et données financières : Monospace avec chiffres tabulaires (`tabular-nums font-mono`).
  - *Discipline Zero-Pill* : Aucune accumulation de pilules décoratives ou de badges colorés surchargés. Les métadonnées (catégorie, pays, date) sont présentées en typographie sobre avec séparateurs typographiques (`·`, `/`).
- **Ergonomie Mobile & Petits Écrans** :
  - Format compact des cartes et des typographies (évitant les paddings excessifs sur smartphones Android et écrans modestes).
  - Navigation basse (bottom tab bar) sur mobile pour les dashboards et barre latérale escamotable.
  - Boutons tactiles minimum 44px avec retours immédiats (<150ms).

#### Parcours Utilisateurs Clés
1. **Public & Découverte** :
   - Landing page éditoriale avec deux CTA distincts ("Promouvoir mon produit" / "Monétiser mon audience").
   - Explorateur public de campagnes avec filtres instantanés (Réseaux, Langues, Rémunération, Niches).
   - Annuaire de créateurs avec profils publics, audiences certifiées et réseaux associés.
2. **Espace Annonceur** :
   - Dashboard synthétique (KPIs : Campagnes actives, créateurs engagés, vues validées, budget consommé).
   - Wizard de création de campagne en étapes simples (Informations produit, Brief & consignes, Critères d'éligibilité, Budget & Modèle de rémunération).
   - Gestionnaire des candidatures avec acceptation/refus direct et messagerie contextuelle.
   - Validation des livrables (approbation, demande de retouche ou rejet motivé).
3. **Espace Créateur** :
   - Dashboard de travail (Campagnes postulées, acceptées, livrables en attente, solde disponible).
   - Fiche campagne détaillée avec brief clair, lien de tracking généré et bouton de soumission.
   - Formulaire de soumission de livrable (URL publique de publication, captures d'écran de statistiques, vues déclarées).
   - Portefeuille créateur (historique des gains, statut des règlements, demande de retrait).
4. **Espace Administrateur** :
   - Console de supervision globale (utilisateurs, entreprises, campagnes, litiges, trésorerie).
   - Table de modération des campagnes et des livrables avec audit log.
   - Gestion des demandes de paiement et configuration du taux de commission Nolio.

---

### 3. Key Product Decisions & Trade-Offs

#### Décision 1 : Préservation stricte de `public.profiles` existant
- **État actuel audité** : La table `public.profiles` existe déjà dans Supabase avec les colonnes `id` (uuid, PK), `display_name` (text), `avatar_path` (text), `created_at` (timestamptz), `updated_at` (timestamptz), `account_type` (text, default 'creator').
- **Choix d'architecture** : La table existante est conservée intacte. Les attributs complémentaires nécessaires aux profils (bio, pays, langues, niches pour créateurs ; poste, entreprise pour annonceurs) seront gérés soit par extension de colonnes sans casser l'existant, soit par tables jointes spécialisées (`creator_profiles`, `companies`, `creator_social_accounts`).

#### Décision 2 : Sécurité des rôles & Étancheité Administrateur
- **Choix d'architecture** : `account_type` n'accorde strictement aucun droit administrateur. Une table `admin_users` (`id`, `user_id`, `role`, `created_at`) est interrogée exclusivement côté serveur avec le client Supabase privilégié (`service_role`).
- **Bénéfice** : Zéro risque d'escalade de privilèges via injection client ou altération de token JWT.

#### Décision 3 : Moteur de Tracking des Liens de Redirection
- **Choix d'architecture** : Route serveur Next.js `/t/[code]` enregistrant l'événement (`ip_hash`, `user_agent`, `referer`, `timestamp`) avant de rediriger en `302` vers l'URL du produit annonceur.
- **Déduplication** : Calcul d'un hash anonymisé pour distinguer les clics uniques des clics répétés (anti-spam).

#### Décision 4 : Architecture Paiements & Saspay.me
- **Choix d'architecture** : Grand livre interne auditable (`wallets`, `transactions`, `payout_requests`). Les interfaces comportent un adaptateur propre affichant un état transparent "Passerelle de paiement en cours de configuration" sans inventer de faux flux de confirmation bancaire.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT (Next.js)                              │
│                                                                                 │
│   ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐   │
│   │    Espace Public    │   │   Espace Annonceur  │   │   Espace Créateur   │   │
│   │  - Accueil          │   │  - Produits         │   │  - Marketplace      │   │
│   │  - Découvrir        │   │  - Campagnes        │   │  - Mes Candidatures │   │
│   │  - Tarifs / Auth    │   │  - Candidatures     │   │  - Livrables/Stats  │   │
│   │  - Profils publics  │   │  - Livrables/Budget │   │  - Portefeuille     │   │
│   └──────────┬──────────┘   └──────────┬──────────┘   └──────────┬──────────┘   │
└──────────────┼─────────────────────────┼─────────────────────────┼──────────────┘
               │                         │                         │
               ▼                         ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             NEXT.JS SERVER / APP ROUTER                         │
│                                                                                 │
│  - /api/auth/* (Sessions & sync)        - /t/[code] (Tracking redirection & log)│
│  - /api/campaigns (Validation serveur)   - /api/deliverables (Audit & review)    │
│  - /api/admin/* (Vérification stricte table admin_users avec Service Role)      │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             SUPABASE POSTGRESQL & AUTH                          │
│                                                                                 │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌──────────────────────┐ │
│  │   Auth & Identité     │  │   Produits & Campagnes│  │ Livrables & Tracking │ │
│  │  - auth.users         │  │  - companies          │  │ - deliverables       │ │
│  │  - public.profiles    │  │  - products           │  │ - tracking_events    │ │
│  │  - admin_users        │  │  - campaigns          │  │ - performance_reports│ │
│  │  - creator_profiles   │  │  - campaign_apps      │  │ - notifications      │ │
│  └───────────────────────┘  └───────────────────────┘  └──────────────────────┘ │
│                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │   Finance & Portefeuilles Internes                                         │ │
│  │  - wallets (créateurs & annonceurs)  - transactions (crédit/débit audité)  │ │
│  │  - payout_requests                   - audit_logs                          │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### Schéma Relationnel & Relations de Données
1. `profiles` *(existant conservé)* : `id` (FK `auth.users`), `display_name`, `avatar_path`, `account_type`, `created_at`, `updated_at`.
2. `creator_details` : `id` (PK, FK `profiles.id`), `bio`, `country`, `languages` (text[]), `niches` (text[]), `portfolio_urls` (text[]), `verified_status` (boolean).
3. `creator_social_accounts` : `id` (uuid), `creator_id` (FK `profiles.id`), `platform` (youtube, tiktok, instagram, facebook, twitter_x), `handle`, `followers_count`, `channel_url`, `is_verified`.
4. `companies` : `id` (uuid), `name`, `logo_url`, `website`, `description`, `owner_id` (FK `profiles.id`), `created_at`.
5. `products` : `id` (uuid), `company_id` (FK `companies.id`), `name`, `tagline`, `description`, `logo_url`, `website_url`, `category`, `created_at`.
6. `campaigns` : `id` (uuid), `product_id` (FK `products.id`), `company_id` (FK `companies.id`), `title`, `description`, `brief`, `instructions`, `deliverable_format`, `platforms` (text[]), `target_countries` (text[]), `target_languages` (text[]), `target_niches` (text[]), `min_followers`, `payout_model` (cpm, fixed, hybrid), `budget_total`, `budget_remaining`, `max_paid_views`, `cpm_rate`, `fixed_amount`, `status` (draft, active, paused, completed), `start_date`, `end_date`, `created_at`.
7. `campaign_applications` : `id` (uuid), `campaign_id` (FK `campaigns.id`), `creator_id` (FK `profiles.id`), `pitch`, `requested_rate`, `status` (pending, accepted, rejected, cancelled), `created_at`.
8. `campaign_deliverables` : `id` (uuid), `application_id` (FK `campaign_applications.id`), `campaign_id` (FK `campaigns.id`), `creator_id` (FK `profiles.id`), `post_url`, `proof_screenshot_url`, `claimed_views`, `verified_views`, `status` (submitted, approved, revision_requested, rejected), `revision_notes`, `submitted_at`, `reviewed_at`.
9. `tracking_links` & `tracking_events` : `id` (uuid), `code` (string unique), `campaign_id`, `creator_id`, `destination_url`, `click_count`, `unique_clicks`.
10. `admin_users` : `id` (uuid), `user_id` (FK `auth.users`), `role` ('superadmin', 'moderator'), `created_at`.
11. `wallets`, `transactions`, `payout_requests` : Gestion comptable interne avec calcul automatique de commission Nolio (15% standard).
12. `notifications` : Alertes en temps réel sur les candidatures, approbations de livrables et paiements.

---

### Phases d'Exécution Structurées

1. **Phase 1 : Audit & Fondations Techniques**
   - Inspection validée de la base Supabase (table `profiles` confirmée avec `account_type`).
   - Configuration du client Supabase (SSR & client) avec variables d'environnement sécurisées.
   - Préparation des scripts de migration SQL optimisés avec RLS et indexes.
2. **Phase 2 : Design System Éditorial & Composants Compacts**
   - Composants d'interface épurés : Boutons compacts, inputs avec validation, cartes à bordure fine 1px, badges de métadonnées sans pilules superflues, modales de soumission, toasts et sélecteur de compte de démonstration.
3. **Phase 3 : Espace Public & Authentification**
   - Navigation 3 zones conforme au contrat top bar.
   - Landing page éditoriale bilingue-ready, explorateur de campagnes et annuaire créateurs.
   - Pages de connexion, inscription (annonceur vs créateur) et sélecteur rapide de test.
4. **Phase 4 : Espace Annonceur (Produits & Campagnes)**
   - Dashboard KPIs compact, gestionnaire de produits et wizard de création de campagne.
   - Modération et suivi des candidatures et livrables.
5. **Phase 5 : Espace Créateur (Marketplace, Postulation & Livrables)**
   - Filtrage temps réel des campagnes éligibles, postulation en 1 clic.
   - Soumission des publications avec URLs réelles et captures d'écran analytiques.
6. **Phase 6 : Tracking Serveur, Finances & Administration**
   - Route de tracking de clics `/t/[code]`, portefeuilles et simulation transparente de retrait.
   - Panneau d'administration sécurisé côté serveur vérifiant `admin_users`.
