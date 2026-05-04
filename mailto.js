/**
 * Simple mailto link handler for accessibility and SEO
 */
function createMailToLink(email) {
    return `<a href="mailto:${email}" class="mailto-link">Email: ${email}</a>`;
}

// Export for use in other scripts
window.createMailToLink = createMailToLink;
