const siteKey = process.argv[2];

export function generateSnippet(inputSiteKey) {
  if (!inputSiteKey || typeof inputSiteKey !== 'string') {
    throw new Error('Site Key is required.');
  }

  const trimmed = inputSiteKey.trim();
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(trimmed)) {
    throw new Error('Site Key must be 8-128 characters and contain only letters, numbers, underscores or hyphens.');
  }

  const safeSiteKey = JSON.stringify(trimmed);

  return `<!-- Lean Cookie Consent for Webflow -->
<script>
  (function () {
    var siteKey = ${safeSiteKey};

    if (!siteKey || siteKey === 'YOUR_SITE_KEY') {
      return;
    }

    window.LeanCookieConsentWebflow = {
      platform: 'webflow',
      siteKey: siteKey,
      hostname: window.location.hostname,
      pathname: window.location.pathname
    };

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://api.leancookieconsent.com/embed.js?site=' + encodeURIComponent(siteKey);
    document.head.appendChild(script);
  })();
</script>`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    process.stdout.write(generateSnippet(siteKey) + '\n');
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
