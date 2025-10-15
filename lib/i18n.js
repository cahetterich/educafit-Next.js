"use client";
import { I18n } from "i18n-js";

const dict = {
  "pt-BR": {
    app: "EducaFit",
    tagline: "Movimento, jogo e aprendizado",
    nav: {
      home: "Home",
      login: "Login",
      signup: "Cadastro",
      recovery: "Recuperar",
    },
    home: {
      badge_beta: "Beta aberto",
      hero_login: "Entrar",
      hero_signup: "Criar conta",
      title: "Planos e preços",
      basic: "Básico • R$ 0,00",
      pro: "Pro • R$ 39,90/mês",
      schools: "Escolas • Sob consulta",
      bullets_basic: "• 1 turma • 3 desafios/mês • Relatórios simples",
      bullets_pro:
        "• Turmas ilimitadas • Desafios ilimitados • Rankings • Exportar CSV",
      bullets_schools: "• Dashboard institucional • Integração SIS • SLA",
      cta_basic: "Começar grátis",
      cta_pro: "Assinar Pro",
      cta_schools: "Falar com vendas",
      values: "Nossos valores",
      diffs: "Diferenciais",
      v1_t: "Aprendizagem ativa",
      v1_d: "Aprender fazendo: desafios curtos, feedback imediato e registro de progresso. O aluno observa, compara e toma decisões.",
      v2_t: "Inclusão e acessibilidade",
      v2_d: "Conteúdos adaptáveis a diferentes realidades, linguagem clara e navegação acessível. Todos participam, cada um no seu ritmo.",
      v3_t: "Saúde e bem-estar",
      v3_d: "Estimulamos hábitos sustentáveis e seguros. Valorizamos constância e consciência corporal, não recordes momentâneos.",
      v4_t: "Família e escola",
      v4_d: "Relatórios úteis e comunicação simples aproximam quem ensina, quem aprende e quem acompanha. Transparência gera confiança.",
      v5_t: "Simplicidade responsável",
      v5_d: "Menos ruído, mais valor. Interface direta, funciona como PWA e app, dados mínimos e práticas alinhadas à LGPD.",
      f_gamification_t: "Gamificação simples",
      f_gamification_d:
        "Desafios rápidos e pontos claros para engajar sem ruído.",
      f_tracking_t: "Acompanhamento por turma",
      f_tracking_d: "Evolução por turma e aluno, com metas semanais.",
      f_reports_t: "Relatórios claros",
      f_reports_d: "Indicadores essenciais, exportáveis para planilha.",
      f_onboarding_t: "Começo em minutos",
      f_onboarding_d: "Web e celular, sem instalação complexa.",
      f_pwa_t: "Multi-plataforma",
      f_pwa_d: "PWA para web + app nativo via Expo.",
      f_privacy_t: "Privacidade primeiro",
      f_privacy_d: "Dados mínimos, controle do professor e boas práticas LGPD.",
      most_popular: "Mais popular",
      subtitle_basic: "Ideal para testar a plataforma",
      subtitle_pro: "Para professores que querem escalar",
      subtitle_schools: "Gestão centralizada • SSO",
      learn_more: "Saiba mais",
      purpose_title: "Nosso propósito",
      purpose_text:
        "Democratizar experiências de movimento com significado pedagógico. Valorizamos pequenas vitórias diárias: atividades curtas, feedback claro e progresso visível. Queremos que cada turma — em qualquer contexto — sinta pertencimento e evolução, sem depender de infraestrutura complexa.",
    },
    footer: {
      tagline: "Movimento, jogo e aprendizado para escolas — web e mobile.",
      nav_title: "Navegação",
      contact_title: "Contato",
      email: "contato@educafit.app",
      social_website: "Site",
      social_instagram: "Instagram",
      social_github: "GitHub",
      copyright: "© %{year} EducaFit",
      made_in_br: "Feito com 💙 no Brasil",
    },
    login: {
      title: "Entrar",
      email: "E-mail",
      pass: "Senha",
      cta: "Entrar",
      forgot: "Esqueci a senha",
      hint: "Use e-mail e senha para fazer seu login."
    },
     signup: {
      title: "Criar conta",
      name: "Nome completo",
      email: "E-mail",
      pass: "Senha",
      pass_ph: "Mínimo 6 caracteres",          
      pass_confirm: "Confirmar senha",
      pass_mismatch: "As senhas não coincidem",
      profile: "Perfil",                         
      student: "Aluno",                          
      teacher: "Professor",                      
      cta: "Criar conta",
    },
    recovery: {
      title: "Recuperar acesso",
      email: "E-mail",
      send: "Enviar link",
      sent: "Enviamos um link.",
      back: "Voltar ao login",
    },

    manifesto: {
      title: "Nossos valores",
      intro:
        "Unimos movimento e aprendizado para formar hábitos saudáveis, autonomia e prazer em aprender. Este manifesto descreve os princípios que orientam decisões de produto, conteúdo e atendimento: o que privilegiamos, o que evitamos e como medimos valor. É nosso compromisso com alunos, professores e famílias.",
      back: "Voltar",
      commitments_title: "Compromissos com escolas e famílias",
      commitments_p:
        "Transparência sobre objetivos didáticos, comunicação simples entre professores, coordenação e responsáveis, e materiais práticos que funcionam no dia a dia. Priorizamos indicadores úteis (participação, constância, evolução) e um canal aberto para feedback contínuo — construindo confiança e corresponsabilidade.",
      privacy_title: "Privacidade & dados",
      privacy_b1: "Coletamos o mínimo necessário para operar o serviço.",
      privacy_b2:
        "Dados pertencem à escola/família; oferecemos exportação sob demanda.",
      privacy_b3: "Controles de acesso por perfil e práticas alinhadas à LGPD.",
      privacy_b4:
        "Criptografia em repouso e em trânsito; revisões regulares de segurança.",
      a11y_title: "Acessibilidade",
      a11y_b1: "Contraste e tipografia adequados ao modo claro/escuro.",
      a11y_b2: "Fluxos navegáveis por teclado e leitores de tela (web).",
      a11y_b3: "Textos objetivos, linguagem inclusiva e ícones de apoio.",
      a11y_b4: "Atividades adaptáveis a diferentes contextos e ritmos.",
      impact_title: "Como medimos impacto",
      impact_p:
        "Medimos progresso com indicadores simples que geram ação, não burocracia. O foco é evolução contínua por turma e aluno, com metas realistas e transparentes.",
      impact_b1: "Engajamento semanal (participação e constância).",
      impact_b2: "Evolução em objetivos definidos pelo professor.",
      tech_title: "Tecnologia & confiabilidade",
      tech_p:
        "PWA para web e app com Expo, priorizando leveza, velocidade e compatibilidade. Mantemos um design system consistente, suporte a redes instáveis e evolução gradual para modo offline nos registros essenciais.",
    },
  },

  en: {
    app: "EducaFit",
    tagline: "Movement, play and learning",
    nav: {
      home: "Home",
      login: "Login",
      signup: "Sign up",
      recovery: "Recover",
    },
    home: {
      badge_beta: "Open beta",
      hero_login: "Sign in",
      hero_signup: "Create account",
      title: "Plans & pricing",
      basic: "Basic • R$ 0.00",
      pro: "Pro • R$ 39.90/mo",
      schools: "Schools • Contact sales",
      bullets_basic: "• 1 class • 3 challenges/mo • Simple reports",
      bullets_pro:
        "• Unlimited classes • Unlimited challenges • Rankings • Export CSV",
      bullets_schools: "• Institutional dashboard • SIS integration • SLA",
      cta_basic: "Start free",
      cta_pro: "Go Pro",
      cta_schools: "Contact sales",
      values: "Our values",
      diffs: "Differentials",
      v1_t: "Active learning",
      v1_d: "Learning by doing: short challenges, instant feedback, and progress logs. Students observe, compare, and decide.",
      v2_t: "Inclusion & accessibility",
      v2_d: "Content adaptable to different realities, clear language, and accessible navigation. Everyone participates at their own pace.",
      v3_t: "Health & wellbeing",
      v3_d: "We encourage sustainable, safe habits. Consistency and body awareness matter more than one-off records.",
      v4_t: "Family & school",
      v4_d: "Useful reports and simple communication bring teachers, learners, and guardians closer. Transparency builds trust.",
      v5_t: "Responsible simplicity",
      v5_d: "Less noise, more value. Straightforward UI, works as PWA and app, minimal data and LGPD-aligned practices.",
      f_gamification_t: "Simple gamification",
      f_gamification_d:
        "Quick challenges and clear points to engage without noise.",
      f_tracking_t: "Per-class tracking",
      f_tracking_d: "Progress by class and student, with weekly goals.",
      f_reports_t: "Clear reports",
      f_reports_d: "Essential KPIs, exportable to spreadsheets.",
      f_onboarding_t: "Up and running in minutes",
      f_onboarding_d: "Web and mobile, no complex setup.",
      f_pwa_t: "Multi-platform",
      f_pwa_d: "PWA for web + native app via Expo.",
      f_privacy_t: "Privacy first",
      f_privacy_d: "Minimal data, teacher control and LGPD-friendly practices.",
      most_popular: "Most popular",
      subtitle_basic: "Great to try the platform",
      subtitle_pro: "For teachers who want to scale",
      subtitle_schools: "Centralized management • SSO",
      learn_more: "Learn more",
      purpose_title: "Our purpose",
      purpose_text:
        "Democratize meaningful movement experiences with pedagogical intent. We value small daily wins: short activities, clear feedback, and visible progress. We want every class — in any context — to feel belonging and steady growth without relying on complex infrastructure.",
    },
    footer: {
      tagline: "Movement, play and learning for schools — web and mobile.",
      nav_title: "Navigation",
      contact_title: "Contact",
      email: "contato@educafit.app",
      social_website: "Website",
      social_instagram: "Instagram",
      social_github: "GitHub",
      copyright: "© %{year} EducaFit",
      made_in_br: "Made with 💙 in Brazil",
    },
    login: {
      title: "Sign in",
      email: "Email",
      pass: "Password",
      cta: "Sign in",
      forgot: "Forgot password",
      hint: "Use your email and password to log in",
    },
    signup: {
      title: "Create account",
      name: "Full name",
      email: "Email",
      pass: "Password",
      pass_ph: "At least 6 chars",              
      pass_confirm: "Confirm password",
      pass_mismatch: "Passwords do not match",
      profile: "Role",                           
      student: "Student",                        
      teacher: "Teacher",                        
      cta: "Create account",
    },
    recovery: {
      title: "Recover access",
      email: "Email",
      send: "Send link",
      sent: "We emailed you a link.",
      back: "Back to login",
    },

    manifesto: {
      title: "Our values",
      intro:
        "We bring movement and learning together to build healthy habits, autonomy, and the joy of learning. This manifesto outlines the principles that guide our product, content, and support decisions: what we prioritize, what we avoid, and how we measure value. It is our commitment to students, teachers, and families.",
      back: "Back",
      commitments_title: "Commitments to schools and families",
      commitments_p:
        "Clear learning goals, simple communication among teachers, coordinators and guardians, and practical materials that work day to day. We prioritize useful indicators (participation, consistency, progress) and an open channel for continuous feedback—building trust and shared responsibility.",
      privacy_title: "Privacy & data",
      privacy_b1: "We collect the minimum required to run the service.",
      privacy_b2:
        "Data belongs to the school/family; we provide on-demand export.",
      privacy_b3: "Role-based access controls and practices aligned with LGPD.",
      privacy_b4:
        "Encryption at rest and in transit; periodic security reviews.",
      a11y_title: "Accessibility",
      a11y_b1: "Contrast and typography tuned for light/dark modes.",
      a11y_b2: "Keyboard- and screen-reader-friendly flows (web).",
      a11y_b3: "Concise copy, inclusive language, supportive icons.",
      a11y_b4: "Activities adaptable to different contexts and paces.",
      impact_title: "How we measure impact",
      impact_p:
        "We track progress with simple metrics that drive action, not bureaucracy. The focus is steady progress per class and student, with realistic, transparent goals.",
      impact_b1: "Weekly engagement (participation and consistency).",
      impact_b2: "Progress on goals defined by the teacher.",
      tech_title: "Technology & reliability",
      tech_p:
        "PWA for web and an Expo-powered app, prioritizing lightness, speed, and compatibility. We maintain a consistent design system, support unstable networks, and are moving toward offline for essential records.",
    },
  },
};

export const i18n = new I18n(dict);
i18n.enableFallback = true;

export function t(key, params){ return i18n.t(key, params); }
export function tx(key, params){ return i18n.t(key, params); }

export function setLocale(l){
  i18n.locale = l;
  try {
    localStorage.setItem('eduLocale', l);
    document.cookie = `eduLocale=${l}; path=/; max-age=31536000`;
  } catch {}
}
export function getLocale(){ return i18n.locale; }