export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mani Shekofteh',
    alternateName: 'مانی شکفته',
    url: 'https://manishek.ir',
    jobTitle: 'Backend Developer',
    knowsAbout: ['.NET', 'ASP.NET Core', 'C#', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Redis', 'REST API', 'Docker', 'Git'],
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
    description: 'وبسایت شخصی مانی شکفته — مهندس بک‌اند با تمرکز بر توسعه با .NET، ASP.NET Core و C# در کنار Node.js و NestJS.',
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
