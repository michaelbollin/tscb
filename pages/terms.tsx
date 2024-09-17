import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import Container from '../components/container';

const TermsOfUse: React.FC = () => {
  return (
    <Layout preview={false}>
      <Head>
        <title>{`Terms of Use - Tiny Shiny Cook Book`}</title>
      </Head>
      <Container>
      <Head>
        <title>Terms of Use - Tiny Shiny Cook Book</title>
        <meta name="description" content="Terms of Use for Tiny Shiny Cook Book" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="mb-4">Effective Date: September 14, 2024</p>

        <p className="mb-4">
          Welcome to Tiny Shiny Cook Book! These terms and conditions outline the rules and regulations for the use of Tiny Shiny Cook Book's website, located at https://TinyShinyCookBook.com.
        </p>

        <p className="mb-4">
          By accessing this website, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, please do not use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. License</h2>
        <p className="mb-4">
          Unless otherwise stated, Tiny Shiny Cook Book and/or its licensors own the intellectual property rights for all material on Tiny Shiny Cook Book. All intellectual property rights are reserved. You may access this from Tiny Shiny Cook Book for your own personal use, subject to restrictions set in these terms and conditions.
        </p>

        <p className="mb-4">You must not:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Republish material from Tiny Shiny Cook Book without proper attribution.</li>
          <li>Sell, rent, or sub-license material from Tiny Shiny Cook Book.</li>
          <li>Reproduce, duplicate, or copy material from Tiny Shiny Cook Book.</li>
          <li>Redistribute content from Tiny Shiny Cook Book without permission.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. User-Submitted Content</h2>
        <p className="mb-4">
          By submitting content (including, but not limited to, text, images, and draft posts) to Tiny Shiny Cook Book, you grant us a non-exclusive license to use, publish, and distribute your content. However, all intellectual property rights to your submitted content remain with you, the user.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Publishing Process</h3>
        <ul className="list-disc pl-8 mb-4">
          <li>Submitted content, such as draft posts, may be edited, modified, or formatted before publication on our website.</li>
          <li>We reserve the right to publish or decline to publish any submitted content at our discretion.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">Removal of User Data</h3>
        <p className="mb-4">
          You retain the right to request the removal of any content you have submitted, including images, at any time. If you would like to have any of your submitted data or images removed, please contact us at michael@bollin.pl, and we will promptly comply with your request.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Use of Submitted Content in Newsletters and Social Media</h2>
        <p className="mb-4">
          By submitting content to Tiny Shiny Cook Book, you agree that we may also use your submitted content in our weekly newsletters and on our social media channels. This includes, but is not limited to, using text, images, and other materials you submit as part of our promotional efforts. If you wish for specific content not to be used for these purposes, please notify us via michael@bollin.pl, and we will respect your request.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Newsletters</h2>
        <p className="mb-4">
          We offer a newsletter that you can opt-in to receive. By subscribing to our newsletter, you consent to receive periodic emails from us. You can opt-out at any time by clicking the unsubscribe link at the bottom of any email or by contacting us at michael@bollin.pl.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Privacy of Submitted Content</h2>
        <p className="mb-4">
          All personal data submitted to our website, including names, email addresses, and draft posts, will be handled in accordance with our [Privacy Policy URL]. We are committed to protecting your data and ensuring compliance with the GDPR and other applicable privacy laws.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. User Conduct</h2>
        <p className="mb-4">
          You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict or inhibit their use and enjoyment of the site. Prohibited behavior includes, but is not limited to:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Harassing or causing distress or inconvenience to any other user.</li>
          <li>Transmitting obscene or offensive content.</li>
          <li>Disrupting the normal flow of dialogue within our website.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Use of Images</h2>
        <p className="mb-4">
          By submitting images to Tiny Shiny Cook Book, you grant us the right to use and publish these images. However, users may request the removal of their images from the website, newsletters, or social media channels at any time. If you would like your images to be removed, please contact us at michael@bollin.pl, and we will take appropriate action to remove them promptly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Limitation of Liability</h2>
        <p className="mb-4">
          Tiny Shiny Cook Book will not be held responsible or liable for any damages or losses that may arise from the use of our website or services. All content is provided on an "as-is" basis, and Tiny Shiny Cook Book makes no representations or warranties regarding the accuracy, completeness, or reliability of any content.
        </p>
        <p className="mb-4">
          To the maximum extent permitted by law, we exclude all warranties and representations related to our website and the use of this site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance with the laws of Poland. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Poland.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">10. Modifications to the Terms</h2>
        <p className="mb-4">
          We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website following any changes signifies your acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">11. Contact Information</h2>
        <p className="mb-4">
          If you have any questions or concerns about these Terms of Use, or would like to request the removal of content or images, please contact us at:
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

export default TermsOfUse;