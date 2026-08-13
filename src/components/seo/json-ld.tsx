export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mani Shekofteh',
    alternateName: 'مانی شکفته',
    url: 'https://manishek.ir',
    jobTitle: 'Backend Developer',
    knowsAbout: ['Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'REST API', 'Docker', 'Git'],
    sameAs: [
      'https://github.com/manishek14',
      'https://linkedin.com/in/mani-shekofteh',
      'https://t.me/dufdoat',
    ],
    image: 'https://manishek.ir/portrait.jpg',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'مانی شکفته (Mani Shekofteh) — توسعه‌دهنده بک‌اند',
    description: 'وبسایت شخصی مانی شکفته — توسعه‌دهنده بک‌اند تخصصی در Node.js، NestJS و TypeScript.',
    url: 'https://manishek.ir',
    mainEntity: {
      '@type': 'Person',
      name: 'Mani Shekofteh',
      alternateName: 'مانی شکفته',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
