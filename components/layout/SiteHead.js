import React from 'react';
import NextHead from 'next/head';

export default function SiteHead({ title, description, keywords, pathname }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      { pathname ? <link rel="canonical" href={pathname} /> : null }
    </NextHead>
  );
}
