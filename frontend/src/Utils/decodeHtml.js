export default function decodeHtmlEntitiesSafely(encodedString) {
  // Regular expressions to detect various JavaScript injections
  const scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const eventHandlerRegex = /\b(on\w+)\s*=\s*(['"]?[^'"]+['"]?)/gi;
  const javascriptUrlRegex = /\b(href|src)\s*=\s*(['"]?)javascript:[^'"]*/gi;

  // Check for script tags
  if (scriptTagRegex.test(encodedString)) {
    return null;
  }

  // Check for inline event handlers
  if (eventHandlerRegex.test(encodedString)) {
    return null;
  }

  // Check for JavaScript URLs
  if (javascriptUrlRegex.test(encodedString)) {
    return null;
  }

  // Decode HTML entities
  const textarea = document.createElement("textarea");
  textarea.innerHTML = encodedString;
  return textarea.value;
}
