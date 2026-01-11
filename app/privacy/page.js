export const metadata = {
  title: 'Privacy Policy - JKH Fitness',
  description:
    'Learn how JKH Fitness collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: January 11, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Introduction
              </h2>
              <p className="leading-relaxed">
                At JKH Fitness, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our website and services. Please
                read this policy carefully to understand our practices regarding
                your personal data.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3 mt-6">
                Personal Information
              </h3>
              <p className="leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Register for an account</li>
                <li>Purchase training packages or services</li>
                <li>Schedule training sessions</li>
                <li>Contact us for support or inquiries</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="leading-relaxed">
                This information may include your name, email address, phone
                number, payment information, fitness goals, health information,
                and any other details you choose to provide.
              </p>

              <h3 className="text-xl font-semibold text-black dark:text-white mb-3 mt-6">
                Automatically Collected Information
              </h3>
              <p className="leading-relaxed">
                When you access our website, we may automatically collect
                certain information about your device, including information
                about your web browser, IP address, time zone, and cookies
                installed on your device. We may also collect information about
                your browsing actions and patterns.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Process your transactions and manage your bookings</li>
                <li>
                  Send you confirmations, updates, and administrative messages
                </li>
                <li>
                  Respond to your comments, questions, and customer service
                  requests
                </li>
                <li>
                  Develop personalized training programs based on your fitness
                  goals
                </li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>
                  Prevent fraudulent transactions and protect against security
                  threats
                </li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Information Sharing and Disclosure
              </h2>
              <p className="leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-black dark:text-white">
                    With Your Consent:
                  </strong>{' '}
                  We may share your information when you give us permission to
                  do so.
                </li>
                <li>
                  <strong className="text-black dark:text-white">
                    Service Providers:
                  </strong>{' '}
                  We may share information with third-party service providers
                  who perform services on our behalf, such as payment
                  processing, email delivery, and analytics.
                </li>
                <li>
                  <strong className="text-black dark:text-white">
                    Trainers and Staff:
                  </strong>{' '}
                  We share relevant health and fitness information with your
                  assigned trainers to provide personalized services.
                </li>
                <li>
                  <strong className="text-black dark:text-white">
                    Legal Requirements:
                  </strong>{' '}
                  We may disclose your information if required to do so by law
                  or in response to valid requests by public authorities.
                </li>
                <li>
                  <strong className="text-black dark:text-white">
                    Business Transfers:
                  </strong>{' '}
                  In connection with any merger, sale of company assets,
                  financing, or acquisition of all or a portion of our business.
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Data Security
              </h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information. However, no
                method of transmission over the internet or electronic storage
                is 100% secure. While we strive to use commercially acceptable
                means to protect your data, we cannot guarantee its absolute
                security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Your Privacy Rights
              </h2>
              <p className="leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct or update inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Data portability</li>
              </ul>
              <p className="leading-relaxed mt-4">
                To exercise these rights, please contact us using the
                information provided below.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to track
                activity on our website and store certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our website.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Third-Party Websites
              </h2>
              <p className="leading-relaxed">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                external sites. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Children's Privacy
              </h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 transition-colors">
                <p className="mb-2">
                  <strong className="text-black dark:text-white">Email:</strong>{' '}
                  privacy@jkhfitness.com
                </p>
                <p className="mb-2">
                  <strong className="text-black dark:text-white">Phone:</strong>{' '}
                  (555) 123-4567
                </p>
                <p>
                  <strong className="text-black dark:text-white">
                    Address:
                  </strong>{' '}
                  123 Fitness Street, Wellness City, WC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
