import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import Container from '../components/container';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout preview={false}>
      <Head>
        <title>{`Privacy Policy - Tiny Shiny Cook Book`}</title>
      </Head>
      <Container>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-4">Effective Date: September 14, 2024</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Tiny Shiny Cook Book ("we," "our," "us"). This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website https://TinyShinyCookBook.com and interact with our services. By using our website, you consent to the practices described in this policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Personal Information</h3>
          <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Submit content, such as text, images, or draft posts.</li>
            <li>Subscribe to our newsletter.</li>
            <li>Contact us directly.</li>
          </ul>
          <p className="mb-4">The types of personal information we may collect include:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Your name</li>
            <li>Email address</li>
            <li>Content submissions (e.g., text, images)</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Usage Data</h3>
          <p className="mb-4">We may collect non-personal information about your interactions with our website, such as:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Pages visited</li>
            <li>Time spent on the site</li>
            <li>Referring website</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>To provide, maintain, and improve our website and services.</li>
            <li>To process and publish your submitted content.</li>
            <li>To send periodic newsletters and updates.</li>
            <li>To respond to your inquiries and requests.</li>
            <li>To ensure compliance with our Terms of Use and other policies.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. How We Share Your Information</h2>
          <p className="mb-4">We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>With Service Providers: We may share information with third-party service providers who assist us in operating our website, sending newsletters, or other functions.</li>
            <li>For Legal Reasons: We may disclose information if required by law or to protect our rights, privacy, safety, or property.</li>
            <li>With Your Consent: We may share information with your consent or as directed by you.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us remember your preferences and understand how you interact with our site. You can manage your cookie preferences through your browser settings.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Data Security</h2>
          <p className="mb-4">
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">7. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Access, correct, or delete your personal information.</li>
            <li>Withdraw your consent to our processing of your data.</li>
            <li>Opt-out of receiving our newsletters or promotional communications.</li>
          </ul>
          <p className="mb-4">To exercise these rights, please contact us at michael@bollin.pl.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">8. Children's Privacy</h2>
          <p className="mb-4">
            Our website is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such information, we will take steps to delete it.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">9. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our website after changes are made signifies your acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">10. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <address className="not-italic">
            Michal Bollin<br />
            Beżowa 21/4, Szczecin, Poland<br />
            VAT ID: PL9552136676<br />
            Email: michael@bollin.pl
          </address>
        </div>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;